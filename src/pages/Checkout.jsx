import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [sameAddress, setSameAddress] = useState("yes");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  // 🎨 Theme
  const styles = {
    gold: { color: "#C9A227" },
    charcoal: { color: "#2C2C2C" },
    label: {
      color: "#2C2C2C",
      fontWeight: "600",
    },
  };

  // ================= FETCH CART =================
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const form = new FormData();
    form.append("user_id", userId);

    axios
      .post("http://localhost/Jewellerydb/viewCartUserWise.php", form)
      .then((res) => {
        const men = res.data.men || [];
        const women = res.data.women || [];

        const combined = [...men, ...women].map((item) => ({
          ...item,
          qty: Number(item.quantity || 0),
        }));

        setCartItems(combined.filter((i) => i.qty > 0));
      })
      .catch((err) => console.error("Cart Fetch Error:", err));
  }, []);

  // ================= FETCH USER =================
  const fetchRegisteredAddress = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const form = new FormData();
    form.append("user_id", userId);

    try {
      const res = await axios.post(
        "http://localhost/Jewellerydb/Users.php",
        form
      );

      if (res.data.status) {
        setFormData({
          fullname: res.data.data.name || "",
          phone: res.data.data.phone || "",
          address: res.data.data.address || "",
        });
      }
    } catch (err) {
      console.log("User Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (sameAddress === "yes") {
      fetchRegisteredAddress();
    } else {
      setFormData({
        fullname: "",
        phone: "",
        address: "",
      });
    }
  }, [sameAddress]);

  // ================= CALCULATIONS =================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const totalDiscount = cartItems.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 0);
    const discount = Number(item.discount_value || 0);

    return sum + (price * qty * discount) / 100;
  }, 0);

  const total = subtotal - totalDiscount;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.phone || !formData.address) {
      alert("Please fill all delivery details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate("/payment", {
      state: {
        formData,
        cartItems,
        subtotal,
        totalDiscount,
        total,
      },
    });
  };

  // ================= EMPTY =================
  const EmptyCart = () => (
    <div className="container text-center py-5">
      <h4>No Jewelry in Your Collection</h4>
      <Link to="/" className="btn btn-outline-dark mt-3">
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="container my-4 py-4">
        <h1 className="text-center fw-bold" style={styles.gold}>
          Checkout
        </h1>
        <hr />

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="row my-4 g-4">
            {/* ORDER SUMMARY */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card shadow border-0">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0" style={styles.gold}>
                    Order Summary
                  </h5>
                </div>

                <div className="card-body">
                  {(() => {
                    let subtotal = 0;
                    let totalDiscount = 0;

                    return (
                      <>
                        {cartItems.map((item) => {
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
                            <div key={item.product_id} className="mb-3">
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
                          <span>
                            ₹ {(subtotal - totalDiscount).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* DELIVERY FORM */}
            <div className="col-md-7 col-lg-8">
              <div className="card shadow border-0">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0" style={styles.gold}>
                    Delivery Details
                  </h5>
                </div>

                <div className="card-body">
                  <h6 className="mb-3">Same as registered address?</h6>

                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      checked={sameAddress === "yes"}
                      onChange={() => setSameAddress("yes")}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Yes</label>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      type="radio"
                      checked={sameAddress === "no"}
                      onChange={() => setSameAddress("no")}
                      className="form-check-input"
                    />
                    <label className="form-check-label">No</label>
                  </div>

                  <form onSubmit={handlePlaceOrder}>
                    <div className="mb-3">
                      <label style={styles.label}>Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label style={styles.label}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label style={styles.label}>Address</label>
                      <textarea
                        name="address"
                        className="form-control"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <button className="btn btn-dark w-100">
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;