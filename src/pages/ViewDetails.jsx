import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { motion } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .au-d{font-family:'Cinzel',serif;font-weight:600}
  .au-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .au-l{font-family:'Lato',sans-serif}
  .au-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .vd-badge{font-family:'Lato',sans-serif;font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:4px 12px;display:inline-block}
  .vd-row{display:flex;gap:12px;padding:14px 0;border-bottom:0.5px solid rgba(188,193,194,0.3);align-items:center}
  .vd-row:last-child{border-bottom:none}
  .vd-img-wrap{overflow:hidden;background:#faf8f4;border:1px solid rgba(188,193,194,0.35)}
  .vd-img-wrap img{transition:transform .6s cubic-bezier(.4,0,.2,1)}
  .vd-img-wrap:hover img{transform:scale(1.04)}
`;

const ViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fd = new FormData();
    fd.append("id", id);
    axios.post("http://localhost/Jewellerydb/viewDetailsProduct.php", fd)
      .then((res) => { if (res.data.status === "true") setProduct(res.data.data[0]); })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <><style>{S}</style><Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <p className="au-d" style={{ color:"#bdc1c2", fontSize:12, letterSpacing:".25em", textTransform:"uppercase" }}>Loading piece...</p>
      </div>
      <Footer /></>
  );

  if (!product) return (
    <><style>{S}</style><Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <p className="au-d" style={{ color:"#bdc1c2", fontSize:12, letterSpacing:".25em", textTransform:"uppercase" }}>Piece not found</p>
      </div>
      <Footer /></>
  );

  const folder = product.maincategory_name === "Men Jewellery" ? "Uploads/Mens" : "Uploads/Womens";
  const isWomen = product.maincategory_name !== "Men Jewellery";

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        {/* Breadcrumb */}
        <div style={{ background:"white", borderBottom:"1px solid rgba(188,193,194,0.3)", padding:"14px 32px" }}>
          <p className="au-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#bdc1c2" }}>
            <Link to="/" style={{ color:"#bdc1c2", textDecoration:"none" }}>Home</Link>
            <span style={{ margin:"0 8px" }}>›</span>
            <Link to="/product" style={{ color:"#bdc1c2", textDecoration:"none" }}>Collections</Link>
            <span style={{ margin:"0 8px" }}>›</span>
            <span style={{ color:"#6d4e19" }}>{product.product_name}</span>
          </p>
        </div>

        {/* Main */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"56px 24px 96px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40, alignItems:"start" }}>

          {/* Image */}
          <motion.div className="vd-img-wrap" initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}>
            <img
              src={`http://localhost/Jewellerydb/${folder}/${product.image}`}
              alt={product.product_name}
              style={{ width:"100%", maxHeight:480, objectFit:"contain", display:"block", padding:24 }}
            />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.15 }}
            style={{ background:"white", border:"1px solid rgba(188,193,194,0.35)", padding:"36px 32px" }}>

            {/* Gender tag + eyebrow */}
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:16 }}>
              <span className="vd-badge" style={{ background:"#c69e8f", color:"white" }}>{isWomen ? "Women" : "Men"}</span>
              <span className="vd-badge" style={{ color:"#6d4e19", background:"rgba(109,78,25,.08)", border:"1px solid rgba(109,78,25,.2)" }}>{product.purity}K Gold</span>
            </div>

            <h2 className="au-d" style={{ color:"#6d4e19", fontSize:"clamp(18px,2.5vw,28px)", fontWeight:700, marginBottom:10 }}>
              {product.product_name}
            </h2>
            <div className="au-div" style={{ width:60, marginBottom:16 }} />

            <p className="au-s" style={{ color:"#3d3228", fontSize:17, fontStyle:"italic", lineHeight:1.85, marginBottom:24 }}>
              {product.description}
            </p>

            {/* Price */}
            <p className="au-d" style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:700, color:"#6d4e19", marginBottom:24 }}>
              ₹ {product.price}
            </p>

            {/* Meta rows */}
            <div style={{ marginBottom:28 }}>
              {[
                { label:"Purity", value:`${product.purity}K` },
                { label:"Category", value:product.maincategory_name },
              ].map((r, i) => (
                <div key={i} className="vd-row">
                  <span className="au-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#c69e8f", width:80, flexShrink:0 }}>{r.label}</span>
                  <span className="au-s" style={{ fontSize:16, fontWeight:600, color:"#3d3228" }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Back link */}
            <Link to="/product"
              style={{ fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#74878b", textDecoration:"none", borderBottom:"1px solid rgba(116,135,139,0.3)", paddingBottom:1 }}>
              ← Back to Collections
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewDetails;