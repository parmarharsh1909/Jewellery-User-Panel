import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.9), rgba(10,10,10,0.95))",
          padding: "60px 20px 40px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(20, 20, 20, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "18px",
            padding: "28px 20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <p
            style={{
              marginBottom: "12px",
              color: "#CFCFCF",
              fontSize: "1.05rem",
              letterSpacing: "0.3px",
            }}
          >
            Crafted with ❤️ for the finest{" "}
            <a
              href="https://luxury-gems.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#D4AF37",
                textDecoration: "none",
                fontWeight: 600,
                marginLeft: "4px",
                textShadow: "0 0 12px rgba(212,175,55,0.5)",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              HP Jewels
            </a>
          </p>

          <div style={{ marginTop: "16px" }}>
            {[
              { icon: "fab fa-instagram", link: "#" },
              { icon: "fab fa-facebook", link: "#" },
              { icon: "fab fa-pinterest", link: "#" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  margin: "0 8px",
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.12)",
                  color: "#D4AF37",
                  fontSize: "1.3rem",
                  textDecoration: "none",
                  boxShadow: "0 0 12px rgba(212,175,55,0.35)",
                  transition: "0.2s ease",
                }}
              >
                <i className={item.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <p
          style={{
            marginTop: "24px",
            fontSize: "0.9rem",
            color: "#8f8f8f",
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} HP Jewels. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
