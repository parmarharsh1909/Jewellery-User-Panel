import React, { useState } from "react";
import { Navbar, Footer } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [method, setMethod] = useState("cod");

  const styles = {
    gold: { color: "#C9A227" },
    charcoal: { color: "#2C2C2C" },
    totalText: {
      color: "#B8860B",
      fontSize: "18px",
      fontWeight: "600",
    },
    label: {
      color: "#2C2C2C",
      fontWeight: "600",
    },
  };

  const clearCart = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.toLowerCase().includes("cart")) {
        localStorage.removeItem(key);
      }
    });
    window.dispatchEvent(new Event("CartUpdated"));
  };

  if (!state) {
    return (
      <div className="container py-5 text-center">
        <h4>No order data found</h4>
      </div>
    );
  }

  const { formData, cartItems, total } = state;

  // ================= ONLINE PAYMENT =================
  const handleOnlinePayment = async () => {
    try {
      const res = await axios.get(
        "http://localhost/Jewellerydb/payment/createorder.php?amount=" + total
      );

      const data = res.data;

      const options = {
        key: "rzp_test_aro7DmNCYha043",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "Jewellery Store",
        description: "Jewellery Purchase",

        handler: function (response) {
          saveOrder("Paid", response.razorpay_payment_id);
        },

        prefill: {
          name: formData.fullname,
          contact: formData.phone,
        },

        theme: {
          color: "#C9A227",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment Failed ❌");
      console.error(error);
    }
  };

  // ================= SAVE ORDER =================
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

      alert("Order Placed Successfully ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = () => {
    if (method === "cod") {
      saveOrder("Pending", "");
    } else {
      handleOnlinePayment();
    }
  };

  // ⚠️ MAIL API (UNCHANGED)
  const orderData = new FormData();
  orderData.append("email", localStorage.getItem("email"));
  orderData.append("type", "order");

  axios.post("http://localhost/Jewellerydb/sendmail.php", orderData)
    .then(() => console.log("Order Confirmation Mail Sent"))
    .catch(() => console.log("Mail server error"));

  return (
    <>
      <Navbar />

      <div className="container my-4 py-4">
        <h1 className="text-center fw-bold" style={styles.gold}>
          Payment
        </h1>
        <hr />

        <div className="row g-4">
          {/* ORDER SUMMARY */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card shadow border-0">
              <div className="card-header bg-dark text-white">
                <h5 style={styles.gold}>Order Summary</h5>
              </div>

              <div className="card-body">
                {(() => {
                  let subtotal = 0;
                  let totalDiscount = 0;

                  return (
                    <>
                      {cartItems.map((item, index) => {
                        const price = Number(item.price || 0);
                        const qty = Number(item.qty || 0);
                        const discount = Number(item.discount_value || 0);

                        const itemTotal = price * qty;
                        const discountAmount =
                          (itemTotal * discount) / 100;
                        const finalPrice = itemTotal - discountAmount;

                        subtotal += itemTotal;
                        totalDiscount += discountAmount;

                        return (
                          <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between small">
                              <span>
                                {item.product_name} × {qty}
                              </span>
                              <span>
                                ₹ {itemTotal.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div className="d-flex justify-content-between text-success small">
                              <span>Discount ({discount}%)</span>
                              <span>
                                - ₹{" "}
                                {discountAmount.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div className="d-flex justify-content-between fw-bold small">
                              <span>Final</span>
                              <span>
                                ₹ {finalPrice.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <hr />
                          </div>
                        );
                      })}

                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="d-flex justify-content-between text-success">
                        <span>Total Discount</span>
                        <span>
                          - ₹ {totalDiscount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span style={styles.totalText}>
                          ₹ {(subtotal - totalDiscount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* DELIVERY + PAYMENT */}
          <div className="col-md-7 col-lg-8">
            <div className="card shadow border-0">
              <div className="card-body">
                <h5 style={styles.charcoal}>Delivery Details</h5>

                <p><b>Full Name:</b> {formData.fullname}</p>
                <p><b>Phone:</b> {formData.phone}</p>
                <p><b>Address:</b> {formData.address}</p>

                <hr />

                <h5 className="mb-3">Select Payment Method</h5>

                <div className="form-check mb-2">
                  <input
                    type="radio"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    Cash on Delivery
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="radio"
                    checked={method === "online"}
                    onChange={() => setMethod("online")}
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    UPI / Card / Net Banking
                  </label>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-100 py-2 border-0"
                  style={{
                    backgroundColor: "#C9A227",
                    fontWeight: "600",
                    borderRadius: "6px",
                  }}
                >
                  Pay & Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;