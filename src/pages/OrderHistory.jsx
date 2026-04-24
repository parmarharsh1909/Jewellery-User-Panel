import { useEffect, useState } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .jp-order-card{background:white;border:1px solid rgba(188,193,194,.35);margin-bottom:20px;transition:box-shadow .3s}
  .jp-order-card:hover{box-shadow:0 8px 32px rgba(109,78,25,.1)}
  .jp-invoice-btn{font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:10px 20px;background:transparent;color:#6d4e19;border:1px solid rgba(109,78,25,.4);cursor:pointer;transition:all .3s;text-decoration:none;display:inline-block}
  .jp-invoice-btn:hover{background:#6d4e19;color:#f5f6f5;border-color:#6d4e19}
  .jp-cancel-btn{font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:10px 20px;background:transparent;color:#a03030;border:1px solid rgba(160,48,48,.35);cursor:pointer;transition:all .3s}
  .jp-cancel-btn:hover{background:#a03030;color:white;border-color:#a03030}
  .modal-bg{position:fixed;inset:0;background:rgba(61,50,40,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:24px}
  .modal-inner{background:white;border:1px solid rgba(188,193,194,.35);padding:36px;max-width:520px;width:100%;position:relative}
  .modal-close{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;background:transparent;border:1px solid rgba(109,78,25,.3);color:#6d4e19;padding:7px 14px;cursor:pointer;transition:all .2s}
  .modal-close:hover{background:#6d4e19;color:#f5f6f5}
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((response) => {
        if (response.data.status) {
          const completedOrders = response.data.data.filter((order) => order.order_status === "Delivered");
          setOrders(completedOrders);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const handleCancelOrder = (order_id, product_id, user_id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("product_id", product_id);
      formData.append("user_id", user_id);
      axios.post("http://localhost/Jewellerydb/cancleorder.php", formData)
        .then((response) => {
          if (response.data.status) {
            alert("Order cancelled successfully");
            setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== order_id));
          } else { alert("Failed to cancel order."); }
        })
        .catch((err) => { console.log(err); alert("Error cancelling order"); });
    }
  };

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"52px 24px 44px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,.3)" }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Delivered Orders ✦</p>
          <h1 className="jp-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,40px)", fontWeight:700, marginBottom:10 }}>Order History</h1>
          <div className="jp-div" style={{ width:80, margin:"0 auto" }} />
        </motion.div>

        <div style={{ maxWidth:900, margin:"0 auto", padding:"48px 24px 96px" }}>
          {orders.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <p className="jp-d" style={{ color:"#bdc1c2", fontSize:13, letterSpacing:".2em", textTransform:"uppercase" }}>No completed orders found</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <motion.div key={order.id || idx} className="jp-order-card"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:idx*.07 }}>

                {/* Header */}
                <div style={{ background:"#faf8f4", borderBottom:"1px solid rgba(188,193,194,.3)", padding:"16px 24px", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                  {[
                    { label:"Order Placed", value:order.order_date },
                    { label:"Order ID", value:`#${order.order_id}` },
                    { label:"Final Total", value:`₹ ${order.final_price}` },
                  ].map((h) => (
                    <div key={h.label}>
                      <p className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#c69e8f", marginBottom:3 }}>{h.label}</p>
                      <p className="jp-d" style={{ fontSize:13, fontWeight:700, color:"#3d3228" }}>{h.value}</p>
                    </div>
                  ))}
                  {order.discount_amount > 0 && (
                    <div>
                      <p className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#c69e8f", marginBottom:3 }}>You Saved</p>
                      <p className="jp-d" style={{ fontSize:13, fontWeight:700, color:"#6d4e19" }}>₹ {order.discount_amount}</p>
                    </div>
                  )}
                </div>

                {/* Body */}
                {/* Body */}
<div style={{ padding:"24px 28px" }}>

  {order.products.map((p, i) => (
    <div key={i} style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      borderBottom: i !== order.products.length - 1 ? "1px solid rgba(188,193,194,.3)" : "none",
      padding:"14px 0"
    }}>

      {/* LEFT SIDE */}
      <div>
        <p className="jp-d" style={{
          fontSize:16,
          fontWeight:700,
          color:"#6d4e19"
        }}>
          {p.product_name}
        </p>

        <p className="jp-l" style={{
          fontSize:13,
          color:"#74878b",
          marginTop:4
        }}>
          Qty: {p.quantity}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ textAlign:"right" }}>
        <p className="jp-d" style={{
          fontSize:16,
          fontWeight:700,
          color:"#3d3228"
        }}>
          ₹ {p.item_final_price}
        </p>

        {p.item_discount > 0 && (
          <p className="jp-l" style={{
            fontSize:12,
            color:"#c69e8f",
            marginTop:2
          }}>
            Saved ₹ {p.item_discount}
          </p>
        )}
      </div>

    </div>
  ))}

  {/* 🔥 BUTTONS (same as before) */}
  <div style={{
    display:"flex",
    flexDirection:"column",
    gap:10,
    alignItems:"flex-end",
    marginTop:16
  }}>
    <button
      className="jp-cancel-btn"
      onClick={() =>
        handleCancelOrder(order.order_id, order.products[0].product_id, order.user_id)
      }
    >
      Cancel
    </button>

    <button
      className="jp-invoice-btn"
      onClick={() => navigate(`/invoice/${order.order_id}`)}
    >
      View Invoice
    </button>

    
  </div>

</div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Detail modal (selectedOrder) */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div className="modal-bg" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedOrder(null); }}>
            <motion.div className="modal-inner" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                <p className="jp-d" style={{ fontSize:16, fontWeight:700, color:"#6d4e19" }}>{selectedOrder.product_name}</p>
                <button className="modal-close" onClick={() => setSelectedOrder(null)}>Close</button>
              </div>
              <div className="jp-div" style={{ marginBottom:20 }} />
              <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
                <img src={`http://localhost/Jewellerydb/${selectedOrder.product_image}`} alt="" width={80} style={{ objectFit:"cover", border:"1px solid rgba(188,193,194,.3)" }} />
                <div>
                  <p className="jp-d" style={{ fontSize:18, fontWeight:700, color:"#6d4e19" }}>₹ {selectedOrder.final_price}</p>
                  {selectedOrder.discount_amount > 0 && (
                    <p className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#c69e8f" }}>Saved ₹ {selectedOrder.discount_amount}</p>
                  )}
                </div>
              </div>
              <div style={{ background:"rgba(109,78,25,.06)", border:"1px solid rgba(109,78,25,.15)", padding:"14px 18px" }}>
                <p className="jp-d" style={{ fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:"#6d4e19" }}>This order has been successfully delivered.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default OrderHistory;