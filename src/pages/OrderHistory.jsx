import { useEffect, useState } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");
const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((response) => {
        if (response.data.status) {
          const completedOrders = response.data.data.filter(
            (order) => order.order_status === "Delivered"
          );
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

      axios
        .post("http://localhost/Jewellerydb/cancleorder.php", formData)
        .then((response) => {
          if (response.data.status) {
            alert("Order cancelled successfully");

            setOrders((prevOrders) =>
              prevOrders.filter((order) => order.order_id !== order_id)
            );
          } else {
            alert("Failed to cancel order.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error cancelling order");
        });
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4 fw-bold">Order History</h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <h5>No completed orders found</h5>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="card mb-4 shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              {/* HEADER */}
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

              {/* BODY */}
              <div className="card-body">
                <div className="row align-items-center">

                  {/* IMAGE + CANCEL */}
                  <div className="col-md-2 text-center">
                    <button
                      onClick={() =>
                        handleCancelOrder(
                          order.order_id,
                          order.product_id,
                          order.user_id
                        )
                      }
                      className="btn btn-danger mb-2"
                    >
                      Cancel Order
                    </button>

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

                  {/* INFO */}
                  <div className="col-md-6">
                    <h5 className="mb-1">
                      {order.product_name || "Jewellery Product"}
                    </h5>

                    <p className="text-muted mb-2">
                      Status: <span className="badge bg-success">
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

                  {/* BUTTONS */}
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    

                    <button
                      className="btn btn-outline-dark mb-2"
                      onClick={() =>
                       navigate(`/invoice/${order.order_id}`)
                      }
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4" style={{ borderRadius: "15px" }}>

              <div className="text-end">
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>

              <div className="d-flex align-items-center mb-4">
                <img
                  src={`http://localhost/Jewellerydb/${selectedOrder.product_image}`}
                  alt=""
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

              <div className="alert alert-success">
                This order has been successfully delivered.
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default OrderHistory;