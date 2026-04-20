import React from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";



const milestones = [
  { year: "1985", label: "Founded" },
  { year: "10K+", label: "Happy Clients" },
  { year: "38+", label: "Years of Craft" },
  { year: "100%", label: "Certified Gold" },
];

const AboutPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .ab-display { font-family: 'Cinzel', serif; font-weight: 600; }
        .ab-serif   { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        .ab-sans    { font-family: 'Lato', sans-serif; }
        .ab-divider {
          background: linear-gradient(90deg, transparent, #c69e8f 30%, #6d4e19 50%, #c69e8f 70%, transparent);
          height: 1px; border: none;
        }
        .ab-col-card {
          background: white;
          border: 1px solid rgba(188,193,194,0.4);
          overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .ab-col-card:hover {
          box-shadow: 0 16px 48px rgba(109,78,25,0.13);
          transform: translateY(-5px);
          border-color: rgba(198,158,143,0.5);
        }
        .ab-col-card:hover img { transform: scale(1.05); }
        .ab-col-card img { transition: transform 0.55s cubic-bezier(.4,0,.2,1); }
        .ab-stat-card {
          background: white;
          border: 1px solid rgba(188,193,194,0.35);
          padding: 28px 20px;
          text-align: center;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .ab-stat-card:hover {
          box-shadow: 0 8px 32px rgba(109,78,25,0.1);
          border-color: rgba(198,158,143,0.5);
        }
      `}</style>

      <Navbar />

      <div style={{ background: "#f5f6f5", minHeight: "100vh" }}>

        {/* ── HERO BANNER ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          style={{
            background: `linear-gradient(135deg, rgba(245,246,245,0.93) 0%, rgba(245,246,245,0.78) 60%, rgba(245,246,245,0.93) 100%),
              url('https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1400')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "96px 24px",
            textAlign: "center",
            borderBottom: "1px solid rgba(188,193,194,0.3)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="ab-sans"
            style={{ color: "#c69e8f", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 16 }}
          >
            ✦ Est. 1985 ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="ab-display"
            style={{ color: "#6d4e19", fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 600, marginBottom: 20 }}
          >
            Our Heritage
          </motion.h1>
          <div className="ab-divider" style={{ width: 100, margin: "0 auto 24px" }} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="ab-serif"
            style={{
              color: "#3d3228",
              fontSize: "clamp(15px, 2vw, 20px)",
              fontStyle: "italic",
              lineHeight: 1.9,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            At HP Jewels, we craft extraordinary jewellery pieces that embody timeless
            elegance and exceptional artistry. Since 1985, our master jewelers have been
            creating distinctive pieces that celebrate life's most precious moments. Each
            piece is meticulously crafted with the finest materials, ensuring heirloom
            quality that transcends trends. Our commitment to excellence and sustainable
            practices has earned us the trust of discerning clients worldwide.
          </motion.p>
        </motion.section>

        {/* ── STATS ROW ── */}
        <section style={{ background: "white", borderBottom: "1px solid rgba(188,193,194,0.3)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))" }}>
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="ab-stat-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ borderRadius: 0, borderTop: "none", borderBottom: "none",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(188,193,194,0.25)",
                  borderRight: "none" }}
              >
                <p className="ab-display"
                  style={{ color: "#6d4e19", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, marginBottom: 4 }}>
                  {m.year}
                </p>
                <div style={{ width: 24, height: 1, background: "#c69e8f", margin: "0 auto 8px" }} />
                <p className="ab-sans"
                  style={{ color: "#74878b", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── COLLECTIONS ── */}
     

      </div>

      <Footer />
    </>
  );
};

export default AboutPage;