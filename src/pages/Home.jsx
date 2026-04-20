import { Navbar, Main, Footer } from "../components";
import FeaturedCollections from "../components/FeaturedCollections";
import { useEffect } from "react";
import { motion } from "framer-motion";

function WhyChooseUs() {
  return (
    <div
      style={{
        padding: "96px 24px",
        background: "#f5f6f5",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .wc-display { font-family: 'Cinzel', serif; font-weight: 600; }
        .wc-serif   { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        .wc-sans    { font-family: 'Lato', sans-serif; font-weight: 400; }
        .wc-divider {
          background: linear-gradient(90deg, transparent, #c69e8f 30%, #6d4e19 50%, #c69e8f 70%, transparent);
          height: 1px;
          border: none;
        }
        .wc-card {
          background: white;
          border: 1px solid rgba(188,193,194,0.35);
          padding: 36px 24px;
          text-align: center;
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
          cursor: default;
        }
        .wc-card:hover {
          box-shadow: 0 16px 48px rgba(109,78,25,0.13);
          transform: translateY(-6px);
          border-color: rgba(198,158,143,0.5);
        }
        .wc-icon-ring {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          border: 1px solid rgba(109,78,25,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(198,158,143,0.12), rgba(109,78,25,0.08));
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .wc-card:hover .wc-icon-ring {
          background: linear-gradient(135deg, rgba(198,158,143,0.22), rgba(109,78,25,0.15));
          border-color: rgba(109,78,25,0.5);
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p
            className="wc-sans"
            style={{
              color: "#c69e8f",
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ Our Commitment ✦
          </p>
          <h3
            className="wc-display"
            style={{
              color: "#6d4e19",
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 600,
              marginBottom: 16,
              letterSpacing: "0.05em",
            }}
          >
            Why Choose Our Jewellery
          </h3>
          <div className="wc-divider" style={{ width: 100, margin: "0 auto 20px" }} />
          <p
            className="wc-serif"
            style={{
              color: "#3d3228",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              fontStyle: "italic",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            We combine timeless design with certified quality and master craftsmanship.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
        
        </div>
      </div>
    </div>
  );
}

function Home() {
  useEffect(() => {
    // alert("Welcome to HP Jewels! Explore our exquisite collection of fine jewelry.");
  }, []);

  return (
    <>
      <Navbar />
      <Main />
      {/* <FeaturedCollections /> */}

      {/* Why Choose Our Jewelry */}
      <WhyChooseUs />

      <Footer />
    </>
  );
}

export default Home;
