import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { Navbar, Footer } from "../components";
import { motion, AnimatePresence } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .au-d{font-family:'Cinzel',serif;font-weight:600}
  .au-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .au-l{font-family:'Lato',sans-serif}
  .au-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .au-input{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:#3d3228;width:100%;padding:13px 16px;background:#faf8f4;border:1px solid rgba(188,193,194,0.5);border-radius:0;outline:none;transition:border-color .3s,box-shadow .3s,background .3s;display:block}
  .au-input::placeholder{font-style:italic;color:#bdc1c2;font-weight:600}
  .au-input:focus{border-color:#6d4e19;box-shadow:0 0 0 3px rgba(109,78,25,.08);background:white}
  .au-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;width:100%;padding:14px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .au-btn:hover:not(:disabled){background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3)}
  .au-btn:disabled{opacity:.55;cursor:not-allowed}
  .au-lnk{font-family:'Cinzel',serif;font-size:11px;font-weight:700;color:#6d4e19;text-decoration:none;letter-spacing:.1em;border-bottom:1px solid rgba(109,78,25,.3);transition:border-color .2s}
  .au-lnk:hover{border-color:#6d4e19}
  .au-ok{display:flex;align-items:center;gap:10px;background:rgba(109,78,25,.07);border:1px solid rgba(109,78,25,.2);padding:14px 20px;margin-bottom:24px}
  .lbl{font-family:'Lato',sans-serif;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#3d3228;display:block;margin-bottom:8px}
`;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  const registerUser = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const address = addressRef.current.value.trim();
    if (!name || !email || !phone || !password) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    axios
      .post("http://localhost/Jewellerydb/signup.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          const maildata = new FormData();
          maildata.append("email", email);
          maildata.append("type", "register");
          axios
            .post("http://localhost/Jewellerydb/sendmail.php", maildata)
            .then(() => console.log("Mail Sent"))
            .catch(() => console.log("Mail server error"));
          setShowSuccess(true);
          setTimeout(() => navigate("/login"), 1500);
        } else {
          alert("Registration failed");
        }
      })
      .catch(() => alert("Server error"))
      .finally(() => setLoading(false));
  };

  const fields = [
    {
      label: "Full Name",
      ref: nameRef,
      type: "text",
      placeholder: "Your full name *",
    },
    {
      label: "Email",
      ref: emailRef,
      type: "email",
      placeholder: "name@example.com *",
    },
    {
      label: "Password",
      ref: passwordRef,
      type: "password",
      placeholder: "Create a password *",
    },
    {
      label: "Phone",
      ref: phoneRef,
      type: "number",
      placeholder: "Your phone number *",
    },
    {
      label: "Address",
      ref: addressRef,
      type: "text",
      placeholder: "Your delivery address",
    },
  ];

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
            padding: "64px 24px 52px",
            textAlign: "center",
            borderBottom: "1px solid rgba(188,193,194,0.3)",
          }}
        >
          <p
            className="au-l"
            style={{
              color: "#c69e8f",
              fontSize: 10,
              letterSpacing: ".45em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            ✦ Become a Member ✦
          </p>
          <h1
            className="au-d"
            style={{
              color: "#6d4e19",
              fontSize: "clamp(24px,4vw,44px)",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Join Our Exclusive Circle
          </h1>
          <div
            className="au-div"
            style={{ width: 90, margin: "0 auto 18px" }}
          />
          <p
            className="au-s"
            style={{
              color: "#3d3228",
              fontSize: "clamp(14px,1.8vw,18px)",
              fontStyle: "italic",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.85,
            }}
          >
            Create your account to access bespoke recommendations, order
            history, and members-only offers.
          </p>
        </motion.div>

        <div
          style={{ maxWidth: 500, margin: "0 auto", padding: "52px 24px 96px" }}
        >
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="au-ok"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle size={18} color="#6d4e19" />
                <span
                  className="au-d"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".15em",
                    color: "#6d4e19",
                    textTransform: "uppercase",
                  }}
                >
                  Registration Successful
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "white",
              border: "1px solid rgba(188,193,194,0.35)",
              padding: "40px 36px",
            }}
          >
            <p
              className="au-l"
              style={{
                color: "#c69e8f",
                fontSize: 10,
                letterSpacing: ".4em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              ✦ Create Account ✦
            </p>
            <h2
              className="au-d"
              style={{
                color: "#6d4e19",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Your Details
            </h2>
            <div className="au-div" style={{ width: 50, marginBottom: 28 }} />

            {fields.map((f, i) => (
              <div
                key={i}
                style={{ marginBottom: i === fields.length - 1 ? 28 : 18 }}
              >
                <label className="lbl">{f.label}</label>
                <input
                  ref={f.ref}
                  type={f.type}
                  className="au-input"
                  placeholder={f.placeholder}
                />
              </div>
            ))}

            <button
              className="au-btn"
              onClick={registerUser}
              disabled={loading}
            >
              {loading ? "Registering..." : "✦ Join Our Circle"}
            </button>
            <p
              className="au-l"
              style={{
                textAlign: "center",
                marginTop: 22,
                fontSize: 12,
                color: "#74878b",
                fontWeight: 700,
              }}
            >
              Already a member?{" "}
              <Link to="/login" className="au-lnk">
                Access Vault
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
