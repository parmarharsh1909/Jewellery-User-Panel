import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { label: "Collections", to: "/product" },
    { label: "Our Story", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  const socials = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      label: "Pinterest",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.09-2.36 3.09-5.15 0-2.12-1.43-3.71-3.99-3.71-2.9 0-4.71 2.17-4.71 4.58 0 .83.24 1.41.62 1.86.17.21.2.29.13.53-.04.17-.15.59-.19.75-.06.24-.25.33-.46.24-1.32-.54-1.94-2-1.94-3.63 0-2.7 2.27-5.93 6.79-5.93 3.63 0 6.01 2.64 6.01 5.47 0 3.74-2.07 6.54-5.12 6.54-1.02 0-1.98-.55-2.31-1.18l-.65 2.48c-.2.74-.61 1.48-.99 2.06.88.26 1.8.4 2.76.4 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .footer-link {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d3228;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover { color: #6d4e19; }
        .footer-divider {
          background: linear-gradient(90deg, transparent, #bdc1c2 30%, #c69e8f 50%, #bdc1c2 70%, transparent);
          height: 1px;
          border: none;
        }
      `}</style>

      <footer
        style={{
          background: "#f5f6f5",
          borderTop: "1px solid rgba(188,193,194,0.4)",
          padding: "64px 24px 32px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Top grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "48px",
              marginBottom: "56px",
            }}
          >
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#6d4e19",
                    letterSpacing: "0.15em",
                    display: "block",
                  }}
                >
                  HP JEWELS
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "10px",
                    color: "#bdc1c2",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  Fine Jewellery
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#3d3228",
                  fontWeight: 600,
                  lineHeight: "1.8",
                  marginTop: "12px",
                  maxWidth: "220px",
                }}
              >
                Crafted with devotion — each piece a story worn close to the heart.
              </p>

              {/* Socials */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(188,193,194,0.6)",
                      color: "#74878b",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      background: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#6d4e19";
                      e.currentTarget.style.color = "#6d4e19";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(188,193,194,0.6)";
                      e.currentTarget.style.color = "#74878b";
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#6d4e19",
                  marginBottom: "20px",
                }}
              >
                Navigate
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {footerLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className="footer-link">
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#6d4e19",
                  marginBottom: "20px",
                }}
              >
                Services
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {["Bespoke Design", "Ring Resizing", "Jewellery Cleaning", "Certification"].map((s) => (
                  <span key={s} className="footer-link" style={{ cursor: "default" }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div> */}

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#6d4e19",
                  marginBottom: "20px",
                }}
              >
                Our Promise
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { icon: "✦", text: "BIS Hallmarked Gold" },
                  { icon: "✦", text: "GIA Certified Diamonds" },
                  { icon: "✦", text: "30-Day Easy Returns" },
                  { icon: "✦", text: "Free Insured Shipping" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#c69e8f", fontSize: "10px" }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "#3d3228",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <hr className="footer-divider" style={{ margin: "0 0 28px" }} />

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#5a4a3a",
                letterSpacing: "0.1em",
              }}
            >
              © {new Date().getFullYear()} HP Jewels. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "13px",
                color: "#74878b",
              }}
            >
              Crafted with ❤️ for the finest moments
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;