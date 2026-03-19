import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.handleCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-luxury py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          HP Jewels
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Collections
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Our Story
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center d-flex align-items-center">
            {/* SHOW ONLY WHEN NOT LOGGED IN */}
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className="btn btn-outline-gold m-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-gold m-2">
                  Register
                </NavLink>
              </>
            )}

            {/* SHOW ONLY WHEN LOGGED IN */}
            {isLoggedIn && (
              <>
                <NavLink to="/profile" className="btn btn-outline-gold m-2">
                  Profile
                </NavLink>
                <NavLink to="/orders" className="btn btn-outline-gold m-2">
                  Orders
                </NavLink>
                <NavLink to="/order-history" className="btn btn-outline-gold m-2">
                  Order History
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-gold m-2"
                >
                  Logout
                </button>

                <NavLink
                  to="/cart"
                  className="btn btn-outline-gold m-2 position-relative"
                >
                  <i className="fa fa-cart-shopping"></i>
                  {cartItems.length > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
