import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    fetch(`http://localhost/Jewellerydb/getUserProfile.php?email=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setUser(data.data);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Server error");
        setLoading(false);
      });
  }, []);

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : "HP";

  return (
    <>
      <Navbar />

      <div style={{
        background: "#f5f6f5",
        minHeight: "100vh",
        padding: "40px 20px"
      }}>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          My Profile
        </motion.h1>

        {/* LOADING */}
        {loading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}

        {/* ERROR */}
        {error && <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>}

        {/* PROFILE */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: 500,
              margin: "auto",
              background: "#fff",
              padding: 30,
              borderRadius: 10,
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
            }}
          >

            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#6d4e19,#c69e8f)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                fontSize: 24,
                fontWeight: "bold"
              }}>
                {initials}
              </div>
              <h2 style={{ marginTop: 10 }}>{user.name}</h2>
              <p style={{ color: "gray", fontSize: 14 }}>Active Member</p>
            </div>

            <hr />

            {/* Details */}
            <div style={{ lineHeight: "2" }}>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Address:</b> {user.address}</p>
            </div>

            <hr />

            {/* Button */}
            

          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Profile;