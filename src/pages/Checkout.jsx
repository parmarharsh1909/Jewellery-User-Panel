import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .jp-input{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:#3d3228;width:100%;padding:13px 16px;background:#faf8f4;border:1px solid rgba(188,193,194,.5);border-radius:0;outline:none;transition:border-color .3s,box-shadow .3s,background .3s;display:block}
  .jp-input::placeholder{font-style:italic;color:#bdc1c2;font-weight:600}
  .jp-input:focus{border-color:#6d4e19;box-shadow:0 0 0 3px rgba(109,78,25,.08);background:white}
  .jp-lbl{font-family:'Lato',sans-serif;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#3d3228;display:block;margin-bottom:8px}
  .jp-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;width:100%;padding:14px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .jp-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3)}
  .jp-radio{display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid rgba(188,193,194,.4);background:white;cursor:pointer;margin-bottom:10px;transition:border-color .2s}
  .jp-radio:hover{border-color:rgba(109,78,25,.3)}
  .jp-radio.selected{border-color:#6d4e19;background:rgba(109,78,25,.04)}
  .jp-radio input[type=radio]{accent-color:#6d4e19}
`;

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [sameAddress, setSameAddress] = useState("yes");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname:"", phone:"", address:"" });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const form = new FormData();
    form.append("user_id", userId);
    axios.post("http://localhost/Jewellerydb/viewCartUserWise.php", form)
      .then((res) => {
        const men = res.data.men || [];
        const women = res.data.women || [];
        const combined = [...men, ...women].map((item) => ({ ...item, qty: Number(item.quantity || 0) }));
        setCartItems(combined.filter((i) => i.qty > 0));
      })
      .catch((err) => console.error("Cart Fetch Error:", err));
  }, []);

  const fetchRegisteredAddress = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const form = new FormData();
    form.append("user_id", userId);
    try {
      const res = await axios.post("http://localhost/Jewellerydb/Users.php", form);
      if (res.data.status) {
        setFormData({ fullname: res.data.data.name || "", phone: res.data.data.phone || "", address: res.data.data.address || "" });
      }
    } catch (err) { console.log("User Fetch Error:", err); }
  };

  useEffect(() => {
    if (sameAddress === "yes") { fetchRegisteredAddress(); }
    else { setFormData({ fullname:"", phone:"", address:"" }); }
  }, [sameAddress]);

  let subtotal = 0, totalDiscount = 0;
  cartItems.forEach((item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 0);
    const discount = Number(item.discount_value || 0);
    const itemTotal = price * qty;
    subtotal += itemTotal;
    totalDiscount += (itemTotal * discount) / 100;
  });
  const total = subtotal - totalDiscount;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone || !formData.address) { alert("Please fill all delivery details"); return; }
    if (cartItems.length === 0) { alert("Your cart is empty"); return; }
    navigate("/payment", { state: { formData, cartItems, subtotal, totalDiscount, total } });
  };

  const EmptyCart = () => (
    <div style={{ textAlign:"center", padding:"80px 24px" }}>
      <p className="jp-d" style={{ color:"#bdc1c2", fontSize:13, letterSpacing:".2em", textTransform:"uppercase" }}>No jewellery in your collection</p>
      <Link to="/" style={{ fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#6d4e19", textDecoration:"none", borderBottom:"1px solid rgba(109,78,25,.3)", marginTop:16, display:"inline-block" }}>Continue Shopping</Link>
    </div>
  );

  const SummaryCard = () => (
    <div style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"28px" }}>
      <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", marginBottom:14 }}>✦ Summary ✦</p>
      <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:17, fontWeight:700, marginBottom:8 }}>Order Summary</h3>
      <div className="jp-div" style={{ marginBottom:20 }} />
      {cartItems.map((item) => {
        const price = Number(item.price || 0);
        const qty = Number(item.qty || 0);
        const discount = Number(item.discount_value || 0);
        const itemTotal = price * qty;
        const discountAmt = (itemTotal * discount) / 100;
        const final = itemTotal - discountAmt;
        return (
          <div key={item.product_id} style={{ marginBottom:14, paddingBottom:14, borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>{item.product_name} × {qty}</span>
              <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>₹ {itemTotal.toLocaleString("en-IN")}</span>
            </div>
            {discount > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span className="jp-l" style={{ fontSize:11, fontWeight:700, color:"#c69e8f" }}>Discount ({discount}%)</span>
                <span className="jp-l" style={{ fontSize:11, fontWeight:700, color:"#c69e8f" }}>- ₹ {discountAmt.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
        <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#74878b" }}>Subtotal</span>
        <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>₹ {subtotal.toLocaleString("en-IN")}</span>
      </div>
      {totalDiscount > 0 && (
        <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
          <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#c69e8f" }}>Total Savings</span>
          <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#c69e8f" }}>- ₹ {totalDiscount.toLocaleString("en-IN")}</span>
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"16px 0 0" }}>
        <span className="jp-d" style={{ fontSize:14, fontWeight:700, color:"#3d3228" }}>Total</span>
        <span className="jp-d" style={{ fontSize:20, fontWeight:700, color:"#6d4e19" }}>₹ {total.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"52px 24px 44px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,.3)" }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Almost There ✦</p>
          <h1 className="jp-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,40px)", fontWeight:700, marginBottom:10 }}>Checkout</h1>
          <div className="jp-div" style={{ width:80, margin:"0 auto" }} />
        </motion.div>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px 96px" }}>
          {cartItems.length === 0 ? <EmptyCart /> : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:28, alignItems:"start" }}>

              {/* Delivery form */}
              <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.1 }}
                style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"32px 32px 36px" }}>
                <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", marginBottom:14 }}>✦ Delivery ✦</p>
                <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:17, fontWeight:700, marginBottom:8 }}>Delivery Details</h3>
                <div className="jp-div" style={{ marginBottom:24 }} />

                <p className="jp-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#3d3228", marginBottom:12 }}>Same as registered address?</p>
                <div style={{ marginBottom:20 }}>
                  <div className={`jp-radio${sameAddress==="yes"?" selected":""}`} onClick={() => setSameAddress("yes")}>
                    <input type="radio" readOnly checked={sameAddress === "yes"} onChange={() => setSameAddress("yes")} />
                    <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>Yes, use registered address</span>
                  </div>
                  <div className={`jp-radio${sameAddress==="no"?" selected":""}`} onClick={() => setSameAddress("no")}>
                    <input type="radio" readOnly checked={sameAddress === "no"} onChange={() => setSameAddress("no")} />
                    <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>No, enter a new address</span>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder}>
                  {[
                    { label:"Full Name", name:"fullname", type:"text", placeholder:"Your full name" },
                    { label:"Phone", name:"phone", type:"tel", placeholder:"Your phone number" },
                  ].map((f) => (
                    <div key={f.name} style={{ marginBottom:18 }}>
                      <label className="jp-lbl">{f.label}</label>
                      <input type={f.type} name={f.name} className="jp-input" placeholder={f.placeholder} value={formData[f.name]} onChange={handleChange} />
                    </div>
                  ))}
                  <div style={{ marginBottom:28 }}>
                    <label className="jp-lbl">Address</label>
                    <textarea name="address" className="jp-input" rows={3} placeholder="Delivery address" value={formData.address} onChange={handleChange} style={{ resize:"vertical" }} />
                  </div>
                  <button className="jp-btn" type="submit">✦ Place Order</button>
                </form>
              </motion.div>

              {/* Summary */}
              <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.2 }}>
                <SummaryCard />
              </motion.div>

            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;