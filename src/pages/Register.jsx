import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { Navbar, Footer } from "../components";

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

  return (
    <>
      <Navbar />

      <div className="container my-4 py-4">
        {showSuccess && (
          <div className="alert alert-success d-flex align-items-center gap-2">
            <CheckCircle />
            <span>Registration Successful</span>
          </div>
        )}

        <h1 className="text-center text-charcoal">Join Our Exclusive Circle</h1>
        <hr className="border-gold-bottom w-25 mx-auto" />

        <div className="row my-4">
          <div className="col-md-4 mx-auto">
            <div className="card p-4">
              <input
                ref={nameRef}
                className="form-control form-control-luxury my-2"
                placeholder="Full Name *"
              />

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

              <input
                ref={phoneRef}
                type="number"
                className="form-control form-control-luxury my-2"
                placeholder="Phone *"
              />

              <input
                ref={addressRef}
                type="text"
                className="form-control form-control-luxury my-2"
                placeholder="Address *"
              />

              <button
                onClick={registerUser}
                disabled={loading}
                className="btn btn-gold w-100 mt-3"
              >
                {loading ? "Registering..." : "Join Our Circle"}
              </button>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-gold">
                  Access Vault
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

export default Register;
