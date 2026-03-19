import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { CheckCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost/Jewellerydb/signin.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setShowSuccess(true);

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", email);
          localStorage.setItem("userId", res.data.userId);
          const mailData = new FormData();
          mailData.append("email", email);
          mailData.append("type", "login");
          axios
            .post("http://localhost/Jewellerydb/sendmail.php", mailData)
            .then(() => console.log("Mail Sent"))
            .catch(() => console.log("Mail server error"));
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          alert("Invalid Email or Password");
        }
      })

      .catch(() => alert("Server error"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />

      <div className="container my-4 py-4">
        {showSuccess && (
          <div className="alert alert-success d-flex align-items-center gap-2">
            <CheckCircle />
            <span>Login Successful</span>
          </div>
        )}

        <h1 className="text-center text-charcoal">Access Your Vault</h1>
        <hr className="border-gold-bottom w-25 mx-auto" />

        <div className="row my-4">
          <div className="col-md-4 mx-auto">
            <div className="card p-4">
              <input
                ref={emailRef}
                type="email"
                className="form-control form-control-luxury my-2"
                placeholder="Email *"
              />

              <input
                ref={passwordRef}
                type="password"
                className="form-control form-control-luxury my-2"
                placeholder="Password *"
              />

              <button
                onClick={loginUser}
                disabled={loading}
                className="btn btn-gold w-100 mt-3"
              >
                {loading ? "Accessing..." : "Access Vault"}
              </button>

              <p className="text-center mt-3">
                New Here?{" "}
                <Link to="/register" className="text-gold">
                  Join Our Exclusive Circle
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
