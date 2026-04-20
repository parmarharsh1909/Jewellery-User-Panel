import React from "react";
import { Navbar, Footer } from "../components";
import { motion } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .au-d{font-family:'Cinzel',serif;font-weight:600}
  .au-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .au-l{font-family:'Lato',sans-serif}
  .au-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .au-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:13px 36px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .au-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3)}
  .pr-row{display:flex;align-items:center;padding:16px 0;border-bottom:0.5px solid rgba(188,193,194,0.35)}
  .pr-row:last-child{border-bottom:none}
`;

function Profile() {
  const userEmail = localStorage.getItem("email");

  const handleSendMail = () => {
    alert("Mail Sent to " + userEmail);
  };

  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "HP";

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"64px 24px 52px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,0.3)" }}>
          <p className="au-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Your Account ✦</p>
          <h1 className="au-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,44px)", fontWeight:700, marginBottom:14 }}>My Profile</h1>
          <div className="au-div" style={{ width:90, margin:"0 auto 18px" }} />
          <p className="au-s" style={{ color:"#3d3228", fontSize:"clamp(14px,1.8vw,18px)", fontStyle:"italic", maxWidth:400, margin:"0 auto", lineHeight:1.85 }}>
            Manage your details and preferences here.
          </p>
        </motion.div>

        {/* Profile card */}
        <div style={{ maxWidth:480, margin:"0 auto", padding:"52px 24px 96px" }}>
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.2 }}
            style={{ background:"white", border:"1px solid rgba(188,193,194,0.35)", padding:"40px 36px" }}>

            {/* Avatar */}
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,rgba(198,158,143,.2),rgba(109,78,25,.12))", border:"1px solid rgba(109,78,25,.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                <span className="au-d" style={{ fontSize:22, fontWeight:700, color:"#6d4e19" }}>{initials}</span>
              </div>
              <p className="au-d" style={{ fontSize:12, letterSpacing:".18em", textTransform:"uppercase", color:"#6d4e19" }}>Member</p>
            </div>

            <div className="au-div" style={{ marginBottom:24 }} />

            {/* Info rows */}
            <div>
              <div className="pr-row">
                <span className="au-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#c69e8f", width:80, flexShrink:0 }}>Email</span>
                <span className="au-s" style={{ fontSize:16, fontWeight:600, color:"#3d3228" }}>{userEmail || "Not Available"}</span>
              </div>
              <div className="pr-row">
                <span className="au-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#c69e8f", width:80, flexShrink:0 }}>Status</span>
                <span className="au-s" style={{ fontSize:16, fontWeight:600, color:"#3d3228" }}>Active Member</span>
              </div>
            </div>

            <div className="au-div" style={{ margin:"24px 0" }} />

            <div style={{ textAlign:"center" }}>
              <button className="au-btn" onClick={handleSendMail}>✦ Send Mail</button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;