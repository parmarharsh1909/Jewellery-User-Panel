import React, { useState } from "react";
import { Navbar, Footer } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .jp-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;width:100%;padding:14px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .jp-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3)}
  .jp-method{display:flex;align-items:center;gap:14px;padding:16px 20px;border:1px solid rgba(188,193,194,.4);background:white;cursor:pointer;margin-bottom:12px;transition:all .25s}
  .jp-method:hover{border-color:rgba(109,78,25,.35)}
  .jp-method.active{border-color:#6d4e19;background:rgba(109,78,25,.04)}
  .jp-method input[type=radio]{accent-color:#6d4e19;width:16px;height:16px}
  .info-row{display:flex;gap:12px;padding:12px 0;border-bottom:0.5px solid rgba(188,193,194,.3)}
  .info-row:last-child{border-bottom:none}
`;

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [method, setMethod] = useState("cod");

  const clearCart = () => {
    Object.keys(localStorage).forEach((key) => { if (key.toLowerCase().includes("cart")) localStorage.removeItem(key); });
    window.dispatchEvent(new Event("CartUpdated"));
  };

  if (!state) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
      <p className="jp-d" style={{ color:"#bdc1c2", fontSize:13, letterSpacing:".2em", textTransform:"uppercase" }}>No order data found</p>
    </div>
  );

  const { formData, cartItems, total } = state;

  const handleOnlinePayment = async () => {
    try {
      const res = await axios.get("http://localhost/Jewellerydb/payment/createorder.php?amount=" + total);
      const data = res.data;
      const options = {
        key: "rzp_test_aro7DmNCYha043",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "HP Jewels",
        description: "Jewellery Purchase",
        handler: function (response) { saveOrder("Paid", response.razorpay_payment_id); },
        prefill: { name: formData.fullname, contact: formData.phone },
        theme: { color: "#6d4e19" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) { alert("Payment Failed"); console.error(error); }
  };

  const saveOrder = async (paymentStatus, paymentId = "") => {
    const form = new FormData();
    form.append("user_id", userId);
    form.append("payment_method", method);
    form.append("payment_status", paymentStatus);
    form.append("payment_id", paymentId);
    form.append("shipping_address", formData.address);
    form.append("items", JSON.stringify(cartItems));
    try {
      await axios.post("http://localhost/Jewellerydb/orders.php", form);
      const clearForm = new FormData();
      clearForm.append("user_id", userId);
      await axios.post("http://localhost/Jewellerydb/clearcart.php", clearForm);
      clearCart();
      alert("Order Placed Successfully");
      navigate("/");
    } catch (err) { console.error(err); }
  };

  const handlePayment = () => { method === "cod" ? saveOrder("Pending", "") : handleOnlinePayment(); };

  // mail (unchanged)
  const orderData = new FormData();
  orderData.append("email", localStorage.getItem("email"));
  orderData.append("type", "order");
  axios.post("http://localhost/Jewellerydb/sendmail.php", orderData)
    .then(() => console.log("Order Confirmation Mail Sent")).catch(() => console.log("Mail server error"));

  let subtotal = 0, totalDiscount = 0;
  cartItems.forEach((item) => {
    const p = Number(item.price||0), q = Number(item.qty||0), d = Number(item.discount_value||0);
    const it = p*q; subtotal += it; totalDiscount += (it*d)/100;
  });

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"52px 24px 44px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,.3)" }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Final Step ✦</p>
          <h1 className="jp-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,40px)", fontWeight:700, marginBottom:10 }}>Payment</h1>
          <div className="jp-div" style={{ width:80, margin:"0 auto" }} />
        </motion.div>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px 96px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:28, alignItems:"start" }}>

          {/* Delivery + payment method */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.1 }}
            style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"32px 32px 36px" }}>

            <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", marginBottom:14 }}>✦ Delivery ✦</p>
            <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:17, fontWeight:700, marginBottom:8 }}>Delivery Details</h3>
            <div className="jp-div" style={{ marginBottom:20 }} />

            {[
              { label:"Name", value:formData.fullname },
              { label:"Phone", value:formData.phone },
              { label:"Address", value:formData.address },
            ].map((r) => (
              <div key={r.label} className="info-row">
                <span className="jp-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#c69e8f", width:70, flexShrink:0 }}>{r.label}</span>
                <span className="jp-s" style={{ fontSize:15, fontWeight:600, color:"#3d3228", lineHeight:1.5 }}>{r.value}</span>
              </div>
            ))}

            <div className="jp-div" style={{ margin:"24px 0 20px" }} />

            <p className="jp-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#3d3228", marginBottom:14 }}>Payment Method</p>

            <div className={`jp-method${method==="cod"?" active":""}`} onClick={() => setMethod("cod")}>
              <input type="radio" readOnly checked={method === "cod"} onChange={() => setMethod("cod")} />
              <div>
                <p className="jp-d" style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#6d4e19", marginBottom:2 }}>Cash on Delivery</p>
                <p className="jp-l" style={{ fontSize:11, fontWeight:700, color:"#74878b" }}>Pay when your jewellery arrives</p>
              </div>
            </div>

            <div className={`jp-method${method==="online"?" active":""}`} onClick={() => setMethod("online")}>
              <input type="radio" readOnly checked={method === "online"} onChange={() => setMethod("online")} />
              <div>
                <p className="jp-d" style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#6d4e19", marginBottom:2 }}>UPI / Card / Net Banking</p>
                <p className="jp-l" style={{ fontSize:11, fontWeight:700, color:"#74878b" }}>Secure payment via Razorpay</p>
              </div>
            </div>

            <div style={{ marginTop:24 }}>
              <button className="jp-btn" onClick={handlePayment}>✦ Pay & Place Order</button>
            </div>
          </motion.div>

          {/* Order summary */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.2 }}
            style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"28px" }}>
            <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", marginBottom:14 }}>✦ Summary ✦</p>
            <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:17, fontWeight:700, marginBottom:8 }}>Order Summary</h3>
            <div className="jp-div" style={{ marginBottom:20 }} />

            {cartItems.map((item, i) => {
              const price = Number(item.price||0), qty = Number(item.qty||0), discount = Number(item.discount_value||0);
              const itemTotal = price*qty, discountAmt = (itemTotal*discount)/100;
              return (
                <div key={i} style={{ marginBottom:14, paddingBottom:14, borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
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
              <span className="jp-d" style={{ fontSize:22, fontWeight:700, color:"#6d4e19" }}>₹ {(subtotal-totalDiscount).toLocaleString("en-IN")}</span>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;