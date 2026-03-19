import React from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";

const PaymentCheck = () => {

  const displayRazorpay = async () => {
    try {
      // 1️⃣ Create order from backend
      const res = await axios.get(
        "http://localhost/Jewellerydb/payment/createorder.php"
      );

      const data = res.data;

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_aro7DmNCYha043",
        amount: data.amount, // amount in paise
        currency: "INR",
        order_id: data.id,

        name: "Demo Company",
        description: "Test Payment",

        handler: function (response) {
          alert(
            "Payment Successful\nPayment ID: " +
              response.razorpay_payment_id
          );
        },

        prefill: {
          name: "Test User",
          email: "test@mail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 3️⃣ Open Razorpay
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container text-center my-5">
        <h1 className="display-4 fw-bold" style={{ color: "#bfa46f" }}>
          Make Payment
        </h1>

        <button
          className="btn btn-success mt-3"
          onClick={displayRazorpay}
        >
          Confirm Payment
        </button>
      </div>

      <Footer />
    </>
  );
};

export default PaymentCheck;