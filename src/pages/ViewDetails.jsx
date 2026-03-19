import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "../components";

const ViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fd = new FormData();
    fd.append("id", id);

    axios
      .post("http://localhost/Jewellerydb/viewDetailsProduct.php", fd)
      .then((res) => {
        if (res.data.status === "true") {
          setProduct(res.data.data[0]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h3 className="text-center my-5">Loading product...</h3>;
  }

  if (!product) {
    return <h3 className="text-center my-5">Product not found</h3>;
  }

  const folder =
    product.maincategory_name === "Men Jewellery"
      ? "Uploads/Mens"
      : "Uploads/Womens";

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row g-4 align-items-center">
          {/* Image */}
          <div className="col-md-6">
            <div className="border rounded-4 p-3 shadow-sm bg-white">
              <img
                src={`http://localhost/Jewellerydb/${folder}/${product.image}`}
                alt={product.product_name}
                className="img-fluid w-100 rounded-3"
                style={{ maxHeight: "420px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-md-6">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h2 className="fw-bold mb-2">{product.product_name}</h2>

              <h4 className="text-success mb-3">₹ {product.price}</h4>

              <p className="mb-2">
                <strong>Purity:</strong> {product.purity}K
              </p>

              <p className="mb-2">
                <strong>Category:</strong> {product.maincategory_name}
              </p>

              <p className="mb-3 text-muted">{product.description}</p>

              {/* <div className="d-flex gap-3 mt-4">
                <button className="btn btn-dark px-4">
                  Add to Cart
                </button>

                <Link to="/cart" className="btn btn-outline-dark px-4">
                  Go to Cart
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewDetails;
