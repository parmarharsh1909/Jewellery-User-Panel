import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .jp-card{background:white;border:1px solid rgba(188,193,194,0.35);margin-bottom:16px;transition:box-shadow .3s}
  .jp-card:hover{box-shadow:0 8px 32px rgba(109,78,25,.1)}
  .jp-qty-btn{font-family:'Cinzel',serif;font-size:14px;font-weight:700;width:32px;height:32px;background:transparent;border:1px solid rgba(109,78,25,.35);color:#6d4e19;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
  .jp-qty-btn:hover{background:#6d4e19;color:#f5f6f5;border-color:#6d4e19}
  .jp-update-btn{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:8px 18px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s;white-space:nowrap}
  .jp-update-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 4px 16px rgba(109,78,25,.3)}
  .jp-checkout-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;width:100%;padding:14px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s;text-decoration:none;display:block;text-align:center}
  .jp-checkout-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3);color:#f5f6f5}
  .jp-sum-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:0.5px solid rgba(188,193,194,.3)}
  .jp-sum-row:last-of-type{border-bottom:none}
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const formData = new FormData();
    formData.append("user_id", userId);
    axios.post("http://localhost/Jewellerydb/viewCartUserWise.php", formData)
      .then((res) => {
        const men = res.data.men || [];
        const women = res.data.women || [];
        const combined = [...men, ...women].map((item) => ({
          ...item,
          product_id: String(item.product_id),
          qty: Number(item.quantity),
        }));
        setCartItems(combined);
      })
      .catch((err) => console.error("Cart Fetch Error:", err));
  }, []);

  const changeLocalQty = (productId, diff) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, qty: Math.max(0, Number(item.qty || 0) + diff) }
          : item,
      ),
    );
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 0) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("user_id", userId);
    formData.append("quantity", newQty);
    axios.post("http://localhost/Jewellerydb/updatecart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product_id === productId ? { ...item, qty: newQty } : item,
            ),
          );
        } else { alert(res.data.message || "Update failed"); }
      })
      .catch((err) => console.error("Update Error:", err));
  };

  const getFolder = (maincatname) => {
    if (!maincatname) return "Mens";
    const cat = maincatname.toLowerCase().trim();
    if (cat === "women jewellery") return "Womens";
    return "Mens";
  };

  const EmptyCart = () => (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      style={{ textAlign:"center", padding:"80px 24px" }}>
      <p style={{ fontSize:48, marginBottom:16 }}>🛍️</p>
      <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:20, fontWeight:700, marginBottom:12 }}>
        Your Collection is Empty
      </h3>
      <div className="jp-div" style={{ width:80, margin:"0 auto 20px" }} />
      <p className="jp-s" style={{ color:"#74878b", fontSize:16, fontStyle:"italic", marginBottom:28 }}>
        Discover our handcrafted pieces and add them to your collection.
      </p>
      <Link to="/" className="jp-checkout-btn" style={{ display:"inline-block", width:"auto", padding:"13px 40px" }}>
        Continue Shopping
      </Link>
    </motion.div>
  );

  const ShowCart = () => {
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

    return (
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:28, alignItems:"start" }}>

        {/* Cart items */}
        <div style={{ gridColumn:"span 2" }}>
          <AnimatePresence>
            {cartItems.map((item, idx) => {
              const itemTotal = Number(item.price || 0) * Number(item.qty || 0);
              return (
                <motion.div key={item.product_id} className="jp-card"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*.08 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto auto", gap:20, alignItems:"center", padding:"20px 24px" }}>

                    {/* Image */}
                    <div style={{ width:90, height:90, background:"#faf8f4", border:"1px solid rgba(188,193,194,.3)", overflow:"hidden", flexShrink:0 }}>
                      <img src={`http://localhost/Jewellerydb/Uploads/${getFolder(item.maincatname)}/${item.image}`}
                        alt={item.product_name}
                        style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    </div>

                    {/* Details */}
                    <div>
                      <p className="jp-d" style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", color:"#6d4e19", marginBottom:4 }}>
                        {item.product_name}
                      </p>
                      <p className="jp-s" style={{ fontSize:13, fontStyle:"italic", color:"#74878b", marginBottom:4 }}>
                        {item.purity} Carat · {item.description}
                      </p>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {item.offerdescription && (
                          <span className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", background:"#c69e8f", color:"white", padding:"3px 8px" }}>
                            {item.offerdescription}
                          </span>
                        )}
                        {item.promocode && (
                          <span className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#6d4e19", background:"rgba(109,78,25,.08)", border:"1px solid rgba(109,78,25,.2)", padding:"3px 8px" }}>
                            {item.promocode}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Qty control */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <button className="jp-qty-btn" onClick={() => changeLocalQty(item.product_id, -1)}>−</button>
                        <span className="jp-d" style={{ fontSize:15, fontWeight:700, color:"#3d3228", minWidth:24, textAlign:"center" }}>{item.qty}</span>
                        <button className="jp-qty-btn" onClick={() => changeLocalQty(item.product_id, 1)}>+</button>
                      </div>
                      <button className="jp-update-btn" onClick={() => updateQuantity(item.product_id, item.qty)}>
                        Update
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign:"right" }}>
                      <p className="jp-d" style={{ fontSize:16, fontWeight:700, color:"#6d4e19" }}>
                        ₹ {itemTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.15 }}
          style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"28px 28px 32px", position:"sticky", top:90 }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", marginBottom:14 }}>✦ Summary ✦</p>
          <h3 className="jp-d" style={{ color:"#6d4e19", fontSize:18, fontWeight:700, marginBottom:8 }}>Order Summary</h3>
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

          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
            <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#74878b" }}>Subtotal</span>
            <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#3d3228" }}>₹ {subtotal.toLocaleString("en-IN")}</span>
          </div>
          {totalDiscount > 0 && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"0.5px solid rgba(188,193,194,.3)" }}>
              <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#c69e8f" }}>Total Savings</span>
              <span className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#c69e8f" }}>- ₹ {totalDiscount.toLocaleString("en-IN")}</span>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", padding:"16px 0 20px" }}>
            <span className="jp-d" style={{ fontSize:14, fontWeight:700, color:"#3d3228" }}>Total</span>
            <span className="jp-d" style={{ fontSize:20, fontWeight:700, color:"#6d4e19" }}>₹ {total.toLocaleString("en-IN")}</span>
          </div>

          <Link to="/checkout" className="jp-checkout-btn">✦ Proceed to Checkout</Link>
        </motion.div>

      </div>
    );
  };

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"52px 24px 44px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,0.3)" }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Your Selection ✦</p>
          <h1 className="jp-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,40px)", fontWeight:700, marginBottom:10 }}>My Cart</h1>
          <div className="jp-div" style={{ width:80, margin:"0 auto" }} />
        </motion.div>

        <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 24px 96px" }}>
          {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;