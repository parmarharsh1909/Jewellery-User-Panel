import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";

const ContactPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    product_name: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("type", "inquiry");
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);
      form.append("product_name", formData.product_name);
      form.append("message", formData.message);

      const res = await fetch("http://localhost/Jewellerydb/sendmail.php", {
        method: "POST",
        body: form
      });

      const data = await res.json();

      if (data.Status === "Success") {
        alert("Inquiry sent successfully ✅");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          product_name: "",
          message: ""
        });
      } else {
        alert("Mail failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .ct-display { font-family: 'Cinzel', serif; font-weight: 600; }
        .ct-serif   { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        .ct-sans    { font-family: 'Lato', sans-serif; }
        .ct-divider {
          background: linear-gradient(90deg, transparent, #c69e8f 30%, #6d4e19 50%, #c69e8f 70%, transparent);
          height: 1px; border: none;
        }
        .ct-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d3228;
          display: block;
          margin-bottom: 8px;
        }
        .ct-input {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #3d3228;
          width: 100%;
          padding: 12px 16px;
          background: white;
          border: 1px solid rgba(188,193,194,0.5);
          outline: none;
        }
        .ct-btn {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          padding: 14px 52px;
          background: linear-gradient(135deg, #6d4e19, #8b6520);
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .ct-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <Navbar />

      <div style={{ background: "#f5f6f5", minHeight: "100vh" }}>

        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40
        }}>

          {/* LEFT */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="ct-display">HP Jewels</h2>
            <p className="ct-serif">
              Visit our atelier or write to us.
            </p>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handleSubmit}>

              <div>
                <label className="ct-label">Name</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <div>
                <label className="ct-label">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <div>
                <label className="ct-label">Mobile</label>
                <input
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <div>
                <label className="ct-label">Product</label>
                <input
                  id="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <div>
                <label className="ct-label">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <br />

              <button type="submit" className="ct-btn" disabled={loading}>
                {loading ? "Sending..." : "✦ Send Inquiry"}
              </button>

            </form>
          </motion.div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ContactPage;