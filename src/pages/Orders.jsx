import { useEffect, useState } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((response) => {
        if (response.data.status) {
          setOrders(response.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4 fw-bold">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <h5>No orders found</h5>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="card mb-4 shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              {/* Top Bar */}
              <div
                className="card-header bg-light d-flex justify-content-between flex-wrap"
                style={{ borderRadius: "12px 12px 0 0" }}
              >
                <div>
                  <small className="text-muted">ORDER PLACED</small>
                  <div>{order.order_date}</div>
                </div>

                <div>
                  <small className="text-muted">TOTAL</small>

                  <div className="fw-semibold">
                    ₹ {order.final_price}
                  </div>

                  {order.discount_amount > 0 && (
                    <>
                      <small className="text-muted text-decoration-line-through">
                        ₹ {order.total_price}
                      </small>
                      <div className="text-success small">
                        You saved ₹ {order.discount_amount}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <small className="text-muted">ORDER ID</small>
                  <div className="fw-semibold">#{order.order_id}</div>
                </div>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="row align-items-center">

                  {/* Image */}
                  <div className="col-md-2 text-center">
                    <img
                      src={
                        order.product_image
                          ? `http://localhost/Jewellerydb/${order.product_image}`
                          : "https://via.placeholder.com/120"
                      }
                      alt="product"
                      className="img-fluid rounded"
                    />
                  </div>

                  {/* Info */}
                  <div className="col-md-6">
                    <h5 className="mb-1">
                      {order.product_name || "Jewellery Product"}
                    </h5>

                    <p className="text-muted mb-2">
                      Status:{" "}
                      <span
                        className={`badge ${
                          order.order_status === "Completed"
                            ? "bg-success"
                            : order.order_status === "Processing"
                            ? "bg-warning text-dark"
                            : order.order_status === "Cancelled"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </p>

                    {/* PRICE SECTION */}
                    <div>
                      <p className="mb-0 fw-semibold">
                        ₹ {order.final_price}
                      </p>

                      {order.discount_amount > 0 && (
                        <>
                          <small className="text-muted text-decoration-line-through">
                            ₹ {order.total_price}
                          </small>

                          <div className="text-success small">
                            Saved ₹ {order.discount_amount}
                          </div>

                          {order.promocode && (
                            <div className="badge bg-success mt-1">
                              {order.promocode}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <button
                      className="btn btn-primary me-2 mb-2"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Track Order
                    </button>

                    
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* TRACK ORDER MODAL */}
      {selectedOrder && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4" style={{ borderRadius: "15px" }}>
              
              {/* Close */}
              <div className="text-end">
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>

              {/* Product Info */}
              <div className="d-flex align-items-center mb-4">
                <img
                  src={`http://localhost/Jewellerydb/${selectedOrder.product_image}`}
                  alt="product"
                  width="120"
                  className="rounded me-4"
                />
                <div>
                  <h4>{selectedOrder.product_name}</h4>

                  <h5 className="fw-bold">
                    ₹ {selectedOrder.final_price}
                  </h5>

                  {selectedOrder.discount_amount > 0 && (
                    <>
                      <small className="text-muted text-decoration-line-through">
                        ₹ {selectedOrder.total_price}
                      </small>

                      <div className="text-success">
                        You saved ₹ {selectedOrder.discount_amount}
                      </div>

                      {selectedOrder.promocode && (
                        <div className="badge bg-success mt-1">
                          {selectedOrder.promocode}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <hr />

              {/* Timeline */}
              {(() => {
                const orderDate = new Date(selectedOrder.order_date);
                const deliveryDate = new Date(orderDate);
                deliveryDate.setDate(orderDate.getDate() + 7);

                const steps = [
                  { label: "Order Received", key: "Pending" },
                  { label: "Order Processed", key: "Processing" },
                  { label: "Manufacturing In Progress", key: "Processing" },
                  { label: "Order Dispatched", key: "Completed" },
                  { label: "Order Delivered", key: "Completed" },
                ];

                const isActive = (stepKey) => {
                  if (selectedOrder.order_status === "Cancelled") return false;
                  if (selectedOrder.order_status === "Completed") return true;

                  if (
                    selectedOrder.order_status === "Processing" &&
                    stepKey !== "Completed"
                  )
                    return true;

                  if (
                    selectedOrder.order_status === "Pending" &&
                    stepKey === "Pending"
                  )
                    return true;

                  return false;
                };

                return (
                  <div className="position-relative mt-4">
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "0",
                        bottom: "0",
                        width: "4px",
                        background:
                          selectedOrder.order_status === "Cancelled"
                            ? "red"
                            : "#ff6600",
                      }}
                    ></div>

                    {steps.map((step, index) => (
                      <div key={index} className="d-flex mb-4 position-relative">

                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: isActive(step.key)
                              ? selectedOrder.order_status === "Cancelled"
                                ? "red"
                                : "#ff6600"
                              : "#ddd",
                            marginRight: "20px",
                            zIndex: 1,
                          }}
                        ></div>

                        <div>
                          <h6 className="mb-1">{step.label}</h6>
                          <small className="text-muted">
                            {step.label === "Order Delivered"
                              ? deliveryDate.toDateString()
                              : orderDate.toDateString()}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Orders;