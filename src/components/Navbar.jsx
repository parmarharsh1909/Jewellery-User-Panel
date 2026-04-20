import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.handleCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Collections" },
    { to: "/about", label: "Our Story" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .nav-font-display { font-family: 'Cinzel', serif; }
        .nav-font-body { font-family: 'Cormorant Garamond', serif; }
        .nav-font-light { font-family: 'Lato', sans-serif; }
        .nav-link-fancy {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d3228;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.3s ease;
        }
        .nav-link-fancy::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #6d4e19, #c69e8f);
          transition: width 0.35s ease;
        }
        .nav-link-fancy:hover,
        .nav-link-fancy.active {
          color: #6d4e19;
        }
        .nav-link-fancy:hover::after,
        .nav-link-fancy.active::after {
          width: 100%;
        }
        .btn-gold-outline {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6d4e19;
          background: transparent;
          border: 1px solid #6d4e19;
          padding: 7px 18px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .btn-gold-outline:hover {
          background: #6d4e19;
          color: #f5f6f5;
        }
        .btn-gold-solid {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f5f6f5;
          background: linear-gradient(135deg, #6d4e19, #8b6520);
          border: none;
          padding: 7px 18px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-gold-solid:hover {
          background: linear-gradient(135deg, #5a3f14, #6d4e19);
          color: #f5f6f5;
          box-shadow: 0 4px 16px rgba(109,78,25,0.3);
        }
        .cart-badge {
          position: absolute; top: -7px; right: -7px;
          background: #c69e8f;
          color: #fff;
          font-size: 9px;
          font-family: 'Lato', sans-serif;
          width: 16px; height: 16px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: scrolled
            ? "rgba(245,246,245,0.97)"
            : "rgba(245,246,245,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(188,193,194,0.35)",
          boxShadow: scrolled ? "0 4px 24px rgba(116,135,139,0.1)" : "none",
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "box-shadow 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
          >
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#6d4e19",
                  letterSpacing: "0.15em",
                }}
              >
                HP JEWELS
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "10px",
                  color: "#74878b",
                  fontWeight: 600,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Fine Jewellery
              </span>
            </div>
          </NavLink>

          {/* Center nav links */}
          <div
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-fancy${isActive ? " active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="btn-gold-outline">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-gold-solid">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile" className="btn-gold-outline">
                  Profile
                </NavLink>
                <NavLink to="/orders" className="btn-gold-outline">
                  Orders
                </NavLink>
                <NavLink to="/order-history" className="btn-gold-outline">
                  History
                </NavLink>
                <button onClick={handleLogout} className="btn-gold-outline">
                  Logout
                </button>
                <NavLink
                  to="/cart"
                  style={{ position: "relative", textDecoration: "none" }}
                  className="btn-gold-outline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Thin gold accent line */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #6d4e19 30%, #c69e8f 50%, #6d4e19 70%, transparent)",
            opacity: 0.4,
          }}
        />
      </motion.nav>
    </>
  );
};

export default Navbar;