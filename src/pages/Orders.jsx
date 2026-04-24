import { useEffect, useState } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import { motion, AnimatePresence } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .jp-order-card{background:white;border:1px solid rgba(188,193,194,.35);margin-bottom:20px;transition:box-shadow .3s}
  .jp-order-card:hover{box-shadow:0 8px 32px rgba(109,78,25,.1)}
  .jp-track-btn{font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:10px 24px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .jp-track-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 4px 16px rgba(109,78,25,.3)}
  .jp-status{font-family:'Lato',sans-serif;font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:4px 12px;display:inline-block}
  .modal-bg{position:fixed;inset:0;background:rgba(61,50,40,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:24px}
  .modal-inner{background:white;border:1px solid rgba(188,193,194,.35);padding:36px;max-width:560px;width:100%;max-height:85vh;overflow-y:auto;position:relative}
  .modal-close{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;background:transparent;border:1px solid rgba(109,78,25,.3);color:#6d4e19;padding:7px 14px;cursor:pointer;transition:all .2s}
  .modal-close:hover{background:#6d4e19;color:#f5f6f5}
`;

const statusColor = (s) => {
  if (s === "Completed" || s === "Delivered")
    return {
      bg: "rgba(109,78,25,.08)",
      color: "#6d4e19",
      border: "rgba(109,78,25,.2)",
    };
  if (s === "Processing")
    return {
      bg: "rgba(198,158,143,.12)",
      color: "#8b5e3c",
      border: "rgba(198,158,143,.4)",
    };
  if (s === "Cancelled")
    return {
      bg: "rgba(180,60,60,.08)",
      color: "#a03030",
      border: "rgba(180,60,60,.2)",
    };
  return {
    bg: "rgba(188,193,194,.15)",
    color: "#74878b",
    border: "rgba(188,193,194,.4)",
  };
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((response) => {
        if (response.data.status) setOrders(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const steps = [
    { label: "Order Received", key: "Pending" },
    { label: "Order Processed", key: "Processing" },
    { label: "Order Dispatched", key: "Dispatched" },
    { label: "Order Delivered", key: "Delivered" },
  ];

  const isActive = (stepKey, status) => {
    if (status === "Cancelled") return false;

    const orderFlow = ["Pending", "Processing", "Dispatched", "Delivered"];

    const currentIndex = orderFlow.indexOf(status);
    const stepIndex = orderFlow.indexOf(stepKey);

    return stepIndex <= currentIndex;
  };

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background: "#f5f6f5", minHeight: "100vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            background:
              "linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)",
            padding: "52px 24px 44px",
            textAlign: "center",
            borderBottom: "1px solid rgba(188,193,194,.3)",
          }}
        >
          <p
            className="jp-l"
            style={{
              color: "#c69e8f",
              fontSize: 10,
              letterSpacing: ".45em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            ✦ Your Orders ✦
          </p>
          <h1
            className="jp-d"
            style={{
              color: "#6d4e19",
              fontSize: "clamp(24px,4vw,40px)",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Order Tracking
          </h1>
          <div className="jp-div" style={{ width: 80, margin: "0 auto" }} />
        </motion.div>

        <div
          style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 96px" }}
        >
          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p
                className="jp-d"
                style={{
                  color: "#bdc1c2",
                  fontSize: 13,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}
              >
                No orders found
              </p>
            </div>
          ) : (
            orders.map((order, idx) => {
              const sc = statusColor(order.order_status);
              return (
                <motion.div
                  key={order.id || idx}
                  className="jp-order-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      background: "#faf8f4",
                      borderBottom: "1px solid rgba(188,193,194,.3)",
                      padding: "16px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    {[
                      { label: "Order Placed", value: order.order_date },
                      { label: "Order ID", value: `#${order.order_id}` },
                      { label: "Total", value: `₹ ${order.final_price}` },
                    ].map((h) => (
                      <div key={h.label}>
                        <p
                          className="jp-l"
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "#c69e8f",
                            marginBottom: 3,
                          }}
                        >
                          {h.label}
                        </p>
                        <p
                          className="jp-d"
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#3d3228",
                          }}
                        >
                          {h.value}
                        </p>
                      </div>
                    ))}
                    {order.discount_amount > 0 && (
                      <div>
                        <p
                          className="jp-l"
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "#c69e8f",
                            marginBottom: 3,
                          }}
                        >
                          Saved
                        </p>
                        <p
                          className="jp-d"
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#6d4e19",
                          }}
                        >
                          ₹ {order.discount_amount}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "24px 24px" }}>

  {order.products?.map((item, i) => (
    <div
      key={i}
      style={{
        borderBottom: "1px solid rgba(188,193,194,.3)",
        paddingBottom: 16,
        marginBottom: 16,
      }}
    >
      {/* Product Name */}
      <p
        className="jp-d"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#6d4e19",
          marginBottom: 6,
        }}
      >
        {item.product_name}
      </p>

      {/* Qty + Price Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          className="jp-l"
          style={{
            fontSize: 13,
            color: "#74878b",
            fontWeight: 600,
          }}
        >
          Qty: {item.quantity}
        </p>

        <p
          className="jp-d"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#3d3228",
          }}
        >
          ₹ {Number(item.item_final_price).toFixed(2)}
        </p>
      </div>

      {/* Discount */}
      {item.item_discount > 0 && (
        <p
          style={{
            fontSize: 12,
            color: "#6d4e19",
            marginTop: 4,
            fontWeight: 600,
          }}
        >
          Saved ₹ {Number(item.item_discount).toFixed(2)}
        </p>
      )}
    </div>
  ))}

  {/* Bottom Section */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    {/* Status */}
    <span
      className="jp-status"
      style={{
        background: sc.bg,
        color: sc.color,
        border: `1px solid ${sc.border}`,
        fontSize: 10,
        padding: "6px 14px",
      }}
    >
      {order.order_status}
    </span>

    {/* Track Button */}
    <button
      className="jp-track-btn"
      onClick={() => setSelectedOrder(order)}
      style={{ fontSize: 11, padding: "12px 26px" }}
    >
      Track Order
    </button>
  </div>
</div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Track modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedOrder(null);
            }}
          >
            <motion.div
              className="modal-inner"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 24,
                }}
              >
                <div>
                  <p
                    className="jp-l"
                    style={{
                      color: "#c69e8f",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".4em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    ✦ Tracking ✦
                  </p>
                  <p
                    className="jp-d"
                    style={{ fontSize: 16, fontWeight: 700, color: "#6d4e19" }}
                  >
                    {selectedOrder.product_name}
                  </p>
                  <p
                    className="jp-d"
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#3d3228",
                      marginTop: 4,
                    }}
                  >
                    ₹ {selectedOrder.final_price}
                  </p>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
              <div className="jp-div" style={{ marginBottom: 28 }} />

              {/* Timeline */}
              {(() => {
                const orderDate = new Date(selectedOrder.order_date);
                const deliveryDate = new Date(orderDate);
                deliveryDate.setDate(orderDate.getDate() + 7);
                return (
                  <div style={{ position: "relative", paddingLeft: 20 }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 14,
                        top: 8,
                        bottom: 8,
                        width: 2,
                        background: "rgba(188,193,194,.5)",
                      }}
                    />
                    {steps.map((step, i) => {
                      const active = isActive(
                        step.key,
                        selectedOrder.order_status,
                      );
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 16,
                            marginBottom: i < steps.length - 1 ? 24 : 0,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: active ? "#6d4e19" : "white",
                              border: `2px solid ${active ? "#6d4e19" : "rgba(188,193,194,.5)"}`,
                              flexShrink: 0,
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {active && (
                              <div
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  background: "#f5efe6",
                                }}
                              />
                            )}
                          </div>
                          <div style={{ paddingTop: 4 }}>
                            <p
                              className="jp-d"
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: ".08em",
                                color: active ? "#6d4e19" : "#bdc1c2",
                              }}
                            >
                              {step.label}
                            </p>
                            <p
                              className="jp-l"
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#bdc1c2",
                                marginTop: 2,
                              }}
                            >
                              {step.label === "Order Delivered"
                                ? deliveryDate.toDateString()
                                : orderDate.toDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Orders;
