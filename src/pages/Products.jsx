import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Products = () => {
  const userId = localStorage.getItem("userId");
  const [productsMen, setProductsMen] = useState([]);
  const [productsWomen, setProductsWomen] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchProducts = () => {
    const formdata = new FormData();
    formdata.append("user_id", userId);

    axios
      .post("http://localhost/Jewellerydb/allProducts.php", formdata)
      .then((response) => {
        if (response.status === 200) {
          setProductsMen(response.data.men || []);
          setProductsWomen(response.data.women || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addCart = (product) => {
    if (!userId) {
      alert("Please login to add products to cart");
      navigate("/login");
      return;
    }

    const formdata = new FormData();
    formdata.append("product_id", product.id);
    formdata.append("user_id", userId);

    axios
      .post("http://localhost/Jewellerydb/addCartUserwise.php", formdata)
      .then((response) => {
        if (response.data.status === "true") {
          alert("Product added to cart!");
          fetchProducts();
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  };

  const handleCartClick = (product) => {
    if (Number(product.cartStatus) === 1) {
      navigate("/cart");
    } else {
      addCart(product);
    }
  };

  const allProducts = [
    ...(filter === "all" || filter === "men"
      ? productsMen.map((p) => ({ ...p, gender: "men" }))
      : []),
    ...(filter === "all" || filter === "women"
      ? productsWomen.map((p) => ({ ...p, gender: "women" }))
      : []),
  ];

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "men", label: "Men" },
    { key: "women", label: "Women" },
  ];

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');

        body { background: #f5f6f5 !important; }

        .pr-display { font-family: 'Cinzel', serif; font-weight: 600; }
        .pr-serif   { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        .pr-sans    { font-family: 'Lato', sans-serif; }

        .pr-divider {
          background: linear-gradient(90deg, transparent, #c69e8f 30%, #6d4e19 50%, #c69e8f 70%, transparent);
          height: 1px; border: none;
        }

        .pr-filter-btn {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 28px;
          border: 1px solid rgba(109,78,25,0.35);
          background: transparent;
          color: #5a4a3a;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pr-filter-btn:hover {
          background: rgba(109,78,25,0.07);
          border-color: #6d4e19;
          color: #6d4e19;
        }
        .pr-filter-btn.active {
          background: #6d4e19;
          border-color: #6d4e19;
          color: #f5f6f5;
        }

        .pr-card {
          background: white;
          border: 1px solid rgba(188,193,194,0.4);
          overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .pr-card:hover {
          box-shadow: 0 16px 48px rgba(109,78,25,0.13);
          transform: translateY(-5px);
          border-color: rgba(198,158,143,0.5);
        }
        .pr-card:hover .pr-card-img {
          transform: scale(1.05);
        }
        .pr-card-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(.4,0,.2,1);
          display: block;
        }

        .pr-badge-purity {
          font-family: 'Lato', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6d4e19;
          background: rgba(109,78,25,0.08);
          border: 1px solid rgba(109,78,25,0.2);
          padding: 3px 10px;
          display: inline-block;
        }
        .pr-badge-offer {
          font-family: 'Lato', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          background: #c69e8f;
          padding: 3px 10px;
          display: inline-block;
        }

        .pr-btn-primary {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #6d4e19, #8b6520);
          color: #f5f6f5;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pr-btn-primary:hover {
          background: linear-gradient(135deg, #5a3f14, #6d4e19);
          box-shadow: 0 6px 20px rgba(109,78,25,0.3);
        }
        .pr-btn-secondary {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          width: 100%;
          padding: 10px;
          background: transparent;
          color: #6d4e19;
          border: 1px solid rgba(109,78,25,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pr-btn-secondary:hover {
          background: #6d4e19;
          color: #f5f6f5;
          border-color: #6d4e19;
        }

        .pr-gender-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: 'Lato', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: #c69e8f;
          color: white;
          padding: 4px 10px;
        }
      `}</style>

      <Navbar />

      <div
        style={{
          background: "#f5f6f5",
          minHeight: "100vh",
          padding: "72px 24px 96px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 52 }}
          >
            <p
              className="pr-sans"
              style={{
                color: "#c69e8f",
                fontSize: 10,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              ✦ Handcrafted with Devotion ✦
            </p>
            <h2
              className="pr-display"
              style={{
                color: "#6d4e19",
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              Our Premium Collection
            </h2>
            <div
              className="pr-divider"
              style={{ width: 100, margin: "0 auto 18px" }}
            />
            <p
              className="pr-serif"
              style={{
                color: "#3d3228",
                fontSize: "clamp(14px,1.8vw,18px)",
                fontStyle: "italic",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Discover jewellery crafted for life's most precious moments.
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 0,
              marginBottom: 52,
            }}
          >
            {filterOptions.map((f) => (
              <button
                key={f.key}
                className={`pr-filter-btn${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
                style={{ marginLeft: f.key !== "all" ? "-1px" : 0 }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Products grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {allProducts.map((product, index) => (
              <motion.div
                key={`${product.gender}-${product.id}-${index}`}
                className="pr-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={`http://localhost/Jewellerydb/Uploads/${product.gender === "men" ? "Mens" : "Womens"}/${product.image}`}
                    alt={product.product_name}
                    className="pr-card-img"
                  />
                  <span className="pr-gender-tag">
                    {product.gender === "men" ? "Men" : "Women"}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "20px 20px 24px" }}>
                  {/* Title */}
                  <h5
                    className="pr-display"
                    style={{
                      color: "#6d4e19",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      marginBottom: 7,
                    }}
                  >
                    {product.product_name}
                  </h5>

                  {/* Thin rose pip */}
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: "#c69e8f",
                      marginBottom: 10,
                    }}
                  />
                  {Number(product.total_reviews) > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{  
                          color: "#c69e8f",
                          fontSize: 16,
                        }}
                      >
                        {renderStars(Number(product.average_rating))}
                      </span>

                      <span
                        className="pr-serif"
                        style={{ color: "#5a4a3a", fontSize: 14 }}
                      >
                        ({Number(product.total_reviews)} reviews)
                      </span>
                    </div>
                  ) : (
                    <span
                      className="pr-serif"
                      style={{
                        color: "#5a4a3a",
                        fontSize: 14,
                        fontStyle: "italic",
                      }}
                    >
                      No reviews yet
                    </span>
                  )}
                  {/* Description */}
                  <p
                    className="pr-serif"
                    style={{
                      color: "#5a4a3a",
                      fontSize: 14,
                      fontStyle: "italic",
                      lineHeight: 1.65,
                      marginBottom: 14,
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Price */}
                  <p
                    className="pr-display"
                    style={{
                      color: "#6d4e19",
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    ₹ {product.price}
                  </p>

                  {/* Badges */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginBottom: 16,
                    }}
                  >
                    <span className="pr-badge-purity">
                      {product.purity} Purity
                    </span>
                    {product.offerdescription !== null && product.offerdescription !== "" && (
                      <span className="pr-badge-offer">
                        {product.offerdescription} Offer
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <button
                      className="pr-btn-primary"
                      onClick={() => handleCartClick(product)}
                    >
                      {Number(product.cartStatus) === 1
                        ? "Go to Cart →"
                        : "+ Add to Cart"}
                    </button>
                    <button
                      className="pr-btn-secondary"
                      onClick={() => navigate(`/viewDetails/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {allProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "80px 0" }}
            >
              <p
                className="pr-display"
                style={{
                  color: "#bdc1c2",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                No products found
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
