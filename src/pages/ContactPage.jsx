import React from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";

const ContactPage = () => {
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
          border-radius: 0;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          display: block;
        }
        .ct-input::placeholder {
          font-style: italic;
          color: #bdc1c2;
          font-weight: 600;
        }
        .ct-input:focus {
          border-color: #6d4e19;
          box-shadow: 0 0 0 3px rgba(109,78,25,0.08);
        }
        .ct-btn {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 52px;
          background: linear-gradient(135deg, #6d4e19, #8b6520);
          color: #f5f6f5;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ct-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a3f14, #6d4e19);
          box-shadow: 0 8px 28px rgba(109,78,25,0.3);
        }
        .ct-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .ct-info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 0.5px solid rgba(188,193,194,0.35);
        }
        .ct-info-item:last-child { border-bottom: none; }
        .ct-icon-wrap {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(109,78,25,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(198,158,143,0.1);
          flex-shrink: 0;
          font-size: 16px;
        }
      `}</style>

      <Navbar />

      <div style={{ background: "#f5f6f5", minHeight: "100vh" }}>

        {/* Page header */}
     

        {/* Main content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 96px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="ct-sans" style={{ color: "#c69e8f", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
              ✦ Get in Touch ✦
            </p>
            <h2 className="ct-display" style={{ color: "#6d4e19", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 700, marginBottom: 12 }}>
              HP Jewels
            </h2>
            <div className="ct-divider" style={{ width: 60, marginBottom: 28 }} />
            <p className="ct-serif" style={{ color: "#3d3228", fontSize: 16, fontStyle: "italic", lineHeight: 1.85, marginBottom: 32 }}>
              Visit our atelier or write to us — we respond to every inquiry with the care it deserves.
            </p>

            {[
              { icon: "📍", label: "Our Atelier", value: "HP Jewels, Ring Road, Surat, Gujarat — 395002" },
              { icon: "📞", label: "Phone", value: "+91 98765 43210" },
              { icon: "✉️", label: "Email", value: "concierge@hpjewels.in" },
              { icon: "🕐", label: "Hours", value: "Mon – Sat, 10am – 7pm IST" },
            ].map((item, i) => (
              <div key={i} className="ct-info-item">
                <div className="ct-icon-wrap">{item.icon}</div>
                <div>
                  <p className="ct-display" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6d4e19", marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p className="ct-serif" style={{ fontSize: 16, fontWeight: 600, color: "#3d3228", lineHeight: 1.55 }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              {["Instagram", "Facebook", "Pinterest"].map((s, i) => (
                <span key={i} className="ct-display" style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#6d4e19", border: "1px solid rgba(109,78,25,0.3)", padding: "7px 14px",
                  cursor: "pointer",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ background: "white", border: "1px solid rgba(188,193,194,0.35)", padding: "40px 36px" }}
          >
            <p className="ct-sans" style={{ color: "#c69e8f", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
              ✦ Send a Message ✦
            </p>
            <h3 className="ct-display" style={{ color: "#6d4e19", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Write to Us
            </h3>
            <div className="ct-divider" style={{ width: 50, marginBottom: 28 }} />

            <form>
              <div style={{ marginBottom: 22 }}>
                <label className="ct-label" htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="ct-input"
                  id="Name"
                  placeholder="Enter your name"
                />
              </div>

              <div style={{ marginBottom: 22 }}>
                <label className="ct-label" htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="ct-input"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>

              <div style={{ marginBottom: 22 }}>
                <label className="ct-label" htmlFor="Subject">Subject</label>
                <input
                  type="text"
                  className="ct-input"
                  id="Subject"
                  placeholder="e.g. Bespoke ring enquiry"
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label className="ct-label" htmlFor="Message">Message</label>
                <textarea
                  rows={5}
                  className="ct-input"
                  id="Message"
                  placeholder="How can we assist you with your jewellery selection?"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button className="ct-btn" type="submit" disabled>
                  ✦ Send Inquiry
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;