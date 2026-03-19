import { Navbar, Main, Footer } from "../components";
import FeaturedCollections from "../components/FeaturedCollections";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
  useEffect(() => {
    // alert("Welcome to HP Jewels! Explore our exquisite collection of fine jewelry.");
  }, []);

  const features = [
    {
      icon: "fas fa-certificate",
      title: "BIS Hallmark Certified",
      desc: "Authentic purity guaranteed",
    },
    {
      icon: "fas fa-shield-alt",
      title: "100% Certified Gold",
      desc: "Premium quality assurance",
    },
    {
      icon: "fas fa-gem",
      title: "Diamond Quality",
      desc: "Exceptional clarity & brilliance",
    },
    {
      icon: "fas fa-heart",
      title: "Craftsmanship",
      desc: "Generations of expertise",
    },
  ];

  return (
    <>
      <Navbar />
      <Main />
      <FeaturedCollections />

      {/* Why Choose Our Jewelry */}
      <div
        style={{
          padding: "80px 20px",
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.9), rgba(10,10,10,0.95))",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <h3
              style={{
                color: "#F5E6C8",
                marginBottom: "12px",
                fontWeight: 400,
                letterSpacing: "0.5px",
                textShadow: "0 0 12px rgba(212,175,55,0.25)",
              }}
            >
              Why Choose Our Jewelry
            </h3>
            <p style={{ color: "#8f8f8f", maxWidth: "600px", margin: "0 auto" }}>
              We combine timeless design with certified quality and master
              craftsmanship.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 0 30px rgba(212,175,55,0.25)",
                }}
                style={{
                  background: "rgba(20, 20, 20, 0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "18px",
                  padding: "28px 20px",
                  textAlign: "center",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                  transition: "0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 16px rgba(212,175,55,0.4)",
                  }}
                >
                  <i
                    className={item.icon}
                    style={{
                      color: "#D4AF37",
                      fontSize: "1.5rem",
                      textShadow: "0 0 12px rgba(212,175,55,0.6)",
                    }}
                  ></i>
                </div>

                <h5
                  style={{
                    color: "#F5E6C8",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h5>

                <p style={{ color: "#CFCFCF", fontSize: "0.95rem", opacity: 0.9 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
