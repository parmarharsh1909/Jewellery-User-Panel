import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <style>{`
  body {
    background-color: #F5F6F8 !important;
  }

  .container {
    background-color: transparent !important;
  }

  .card {
    background-color: #ffffff !important;
  }
`}</style>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4 text-charcoal">
          Our Premium Collection
        </h2>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className={`btn ${
              filter === "all" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`btn ${
              filter === "men" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setFilter("men")}
          >
            Men
          </button>

          <button
            className={`btn ${
              filter === "women" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setFilter("women")}
          >
            Women
          </button>
        </div>

        <div className="row g-4">
          {(filter === "all" || filter === "men") &&
            productsMen.map((product, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={`men-${index}`}>
                <div className="card h-100 shadow-sm border-0 product-card">
                  <img
                    src={`http://localhost/Jewellerydb/Uploads/Mens/${product.image}`}
                    alt={product.product_name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold">
                      {product.product_name}
                    </h5>

                    <p className="card-text text-muted small">
                      {product.description}
                    </p>

                    <p className="mb-1 fw-bold text-gold">₹ {product.price}</p>

                    <span className="badge bg-dark">
                      {product.purity} Purity
                      <br></br>
                    </span>

                    <span className="badge bg-danger text-white mt-1">
                      {product.offerdescription} Offer
                      <br></br>
                    </span>
                    
                    <button
                      className="btn btn-outline-dark mt-2 w-100"
                      onClick={() => handleCartClick(product)}
                    >
                      {Number(product.cartStatus) === 1
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </button>

                    <button
                      className="btn btn-outline-dark mt-2 w-100"
                      onClick={() => navigate(`/viewDetails/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {(filter === "all" || filter === "women") &&
            productsWomen.map((product, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6"
                key={`women-${index}`}
              >
                <div className="card h-100 shadow-sm border-0 product-card">
                  <img
                    src={`http://localhost/Jewellerydb/Uploads/Womens/${product.image}`}
                    alt={product.product_name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold">
                      {product.product_name}
                    </h5>

                    <p className="card-text text-muted small">
                      {product.description}
                    </p>

                    <p className="mb-1 fw-bold text-gold">₹ {product.price}</p>

                    <span className="badge bg-dark">
                      {product.purity} Purity
                      <br></br>
                    </span>

                     <span className="badge bg-danger text-white mt-1">
                      {product.offerdescription} Offer
                      <br></br>
                    </span>

                    <button
                      className="btn btn-outline-dark mt-2 w-100"
                      onClick={() => handleCartClick(product)}
                    >
                      {Number(product.cartStatus) === 1
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </button>

                    <button
                      className="btn btn-outline-dark mt-2 w-100"
                      onClick={() => navigate(`/viewDetails/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
