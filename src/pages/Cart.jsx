import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // ================= FETCH CART =================
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);

    axios
      .post("http://localhost/Jewellerydb/viewCartUserWise.php", formData)
      .then((res) => {
        // assuming API returns { men:[], women:[] }
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

  // ================= LOCAL QTY CHANGE =================
  const changeLocalQty = (productId, diff) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              qty: Math.max(0, Number(item.qty || 0) + diff),
            }
          : item,
      ),
    );
  };

  // ================= UPDATE SERVER QTY =================
  const updateQuantity = (productId, newQty) => {
    if (newQty < 0) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("user_id", userId);
    formData.append("quantity", newQty);

    axios
      .post("http://localhost/Jewellerydb/updatecart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product_id === productId ? { ...item, qty: newQty } : item,
            ),
          );
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch((err) => console.error("Update Error:", err));
  };

  // ================= REMOVE ITEM =================
  // const removeFromCart = (productId) => {
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) return;

  //   const formData = new FormData();
  //   formData.append("product_id", productId);
  //   formData.append("user_id", userId);

  //   axios
  //     .post("http://localhost/Jewellerydb/removeCartUserWise.php", formData)
  //     .then((res) => {
  //       if (res.data.status === "true") {
  //         setCartItems((prev) =>
  //           prev.filter((item) => item.product_id !== productId),
  //         );
  //       } else {
  //         alert("Failed to remove item");
  //       }
  //     })
  //     .catch((err) => console.error("Remove Error:", err));
  // };

  // ================= EMPTY CART =================
  const EmptyCart = () => (
    <div className="container text-center py-5">
      <h3>Your Jewelry Collection is Empty</h3>
      <Link to="/" className="btn btn-outline-dark mt-3">
        Continue Shopping
      </Link>
    </div>
  );

  // ================= SHOW CART =================
  const ShowCart = () => {
    const getFolder = (maincatname) => {
      if (!maincatname) return "Mens";

      const cat = maincatname.toLowerCase().trim();

      if (cat === "men jewellery") return "Mens";
      if (cat === "women jewellery") return "Womens";

      return "Mens";
    };

    //

    const subtotal = cartItems.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.qty || 0);
      const discount = Number(item.discount_value || 0);

      const itemTotal = price * qty;
      const discountAmount = (itemTotal * discount) / 100;

      const finalPrice = itemTotal - discountAmount;

      return sum + finalPrice;
    }, 0);

    const total = subtotal;

    return (
      <div className="row">
        {/* CART ITEMS */}
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.product_id} className="card mb-3 p-3 shadow-sm">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={`http://localhost/Jewellerydb/Uploads/${getFolder(
                      item.maincatname,
                    )}/${item.image}`}
                    alt={item.product_name}
                    className="img-fluid"
                    style={{ maxHeight: "100px" }}
                  />
                </div>

                <div className="col-md-4">
                  <h6>{item.product_name}</h6>
                  <small>{item.purity} Caret</small>
                  <p className="text-muted small">{item.description}</p>
                  <p className="mb-1 fw-bold text-gold">
                    {item.offerdescription}
                  </p>
                  <p className="mb-1 fw-bold">Promo Code: {item.promocode}</p>
                </div>

                <div className="col-md-3 text-center">
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => changeLocalQty(item.product_id, -1)}
                    >
                      −
                    </button>

                    <span className="mx-3 fw-bold">{item.qty}</span>

                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => changeLocalQty(item.product_id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div>₹ {(item.price * item.qty).toLocaleString("en-IN")}</div>
                </div>

                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-success btn-sm mb-2"
                    onClick={() => updateQuantity(item.product_id, item.qty)}
                  >
                    Update
                  </button>

                  {/* <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        {/* <div className="col-lg-4">
          <div className="card p-4 shadow-sm">
            <h5>Order Summary</h5>
            <hr />
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="d-flex justify-content-between small"
              >
                <span>
                  {item.product_name} × {item.qty}
                </span>
                <span>₹ {(item.price * item.qty).toLocaleString("en-IN")}</span>
                <span className="text-muted small">Discount:  {item.discount_value.toLocaleString("en-IN")}%</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹ {total.toLocaleString("en-IN")}</span>
            </div>

            <Link to="/checkout" className="btn btn-dark w-100 mt-3">
              Proceed to Checkout
            </Link>
          </div>
        </div> */}

        {/* ORDER SUMMARY */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm"
            style={{ padding: "20px", borderRadius: "10px" }}
          >
            <h5 style={{ fontWeight: "600", marginBottom: "15px" }}>
              Order Summary
            </h5>

            {(() => {
              let subtotal = 0;
              let totalDiscount = 0;

              return (
                <>
                  {/* ITEMS */}
                  {cartItems.map((item) => {
                    const price = Number(item.price || 0);
                    const qty = Number(item.qty || 0);
                    const discount = Number(item.discount_value || 0);

                    const itemTotal = price * qty;
                    const discountAmount = (itemTotal * discount) / 100;
                    const finalPrice = itemTotal - discountAmount;

                    subtotal += itemTotal;
                    totalDiscount += discountAmount;

                    return (
                      <div
                        key={item.product_id}
                        style={{ marginBottom: "12px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "14px",
                          }}
                        >
                          <span>
                            {item.product_name} × {qty}
                          </span>
                          <span>₹ {itemTotal.toLocaleString("en-IN")}</span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                            color: "green",
                          }}
                        >
                          <span>Discount ({discount}%)</span>
                          <span>
                            - ₹ {discountAmount.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          <span>Final</span>
                          <span>₹ {finalPrice.toLocaleString("en-IN")}</span>
                        </div>

                        <hr style={{ margin: "8px 0" }} />
                      </div>
                    );
                  })}

                  {/* SUMMARY */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      color: "green",
                    }}
                  >
                    <span>Total Discount</span>
                    <span>- ₹ {totalDiscount.toLocaleString("en-IN")}</span>
                  </div>

                  <hr />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Total</span>
                    <span>
                      ₹ {(subtotal - totalDiscount).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn btn-dark w-100 mt-3"
                    style={{ borderRadius: "6px" }}
                  >
                    Proceed to Checkout
                  </Link>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">My Cart</h2>
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
