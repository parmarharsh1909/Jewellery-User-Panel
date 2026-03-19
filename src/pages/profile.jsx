import React from "react";
import { Navbar, Footer } from "../components";

function Profile() {
  
  const userEmail = localStorage.getItem("email");
  const handleSendMail = () => {
    alert("Mail Sent to " + userEmail);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4 text-center">
              <h4 className="mb-2">User Profile</h4>
              <hr />

              

              <p>
                <strong>Email:</strong> {userEmail || "Not Available"}
              </p>
              <button className="btn btn-outline-gold" onClick={handleSendMail}>
                Send Mail
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
