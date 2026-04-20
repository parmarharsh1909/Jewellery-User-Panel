import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Chatai from "../pages/Chatai";

// Floating particle — soft dusty rose / ice tones for light theme
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
    transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut", delay: style.delay }}
  />
);

const particles = Array.from({ length: 16 }, (_, i) => ({
  width: `${Math.random() * 5 + 2}px`,
  height: `${Math.random() * 5 + 2}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  background: i % 3 === 0 ? "#c69e8f" : i % 3 === 1 ? "#6d4e19" : "#bdc1c2",
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

const features = [
  { icon: "💎", label: "Certified Diamonds", sub: "GIA & IGI Certified" },
  { icon: "🏅", label: "Hallmarked Gold", sub: "BIS 916 & 22K" },
  { icon: "🚚", label: "Free Shipping", sub: "On orders above ₹5,000" },
  { icon: "↩️", label: "Easy Returns", sub: "30-day hassle-free" },
];

const collections = [
  {
    title: "Bridal Sets",
    desc: "Timeless pieces for your most cherished moments",
    tag: "New Arrivals",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    title: "Diamond Rings",
    desc: "Solitaires & eternity bands crafted to perfection",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
  },
  {
    title: "Gold Necklaces",
    desc: "Heritage craftsmanship for modern elegance",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div style={{ background: "#f5f6f5", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
        .hf-display  { font-family: 'Cinzel', serif; font-weight: 600; }
        .hf-serif    { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        .hf-sans     { font-family: 'Lato', sans-serif; font-weight: 400; }

        .shimmer-dark {
          background: linear-gradient(90deg, #6d4e19 0%, #a87c3a 40%, #6d4e19 60%, #4a3310 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3.5s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        .divider-rose {
          background: linear-gradient(90deg, transparent, #c69e8f 30%, #6d4e19 50%, #c69e8f 70%, transparent);
          height: 1px;
        }
        .col-card { transition: box-shadow 0.4s ease, transform 0.4s ease; }
        .col-card:hover {
          box-shadow: 0 16px 48px rgba(109,78,25,0.15);
          transform: translateY(-4px);
        }
        .col-card:hover img { transform: scale(1.06); }
        img { transition: transform 0.6s cubic-bezier(.4,0,.2,1); }

        .btn-primary-gold {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f5f6f5;
          background: linear-gradient(135deg, #6d4e19, #8b6520);
          border: none;
          padding: 14px 40px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-primary-gold:hover {
          background: linear-gradient(135deg, #5a3f14, #6d4e19);
          box-shadow: 0 8px 28px rgba(109,78,25,0.35);
        }
        .btn-secondary-gold {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6d4e19;
          background: transparent;
          border: 1px solid #6d4e19;
          padding: 14px 40px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .btn-secondary-gold:hover {
          background: #6d4e19;
          color: #f5f6f5;
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `
            linear-gradient(135deg,
              rgba(245,246,245,0.92) 0%,
              rgba(245,246,245,0.72) 55%,
              rgba(245,246,245,0.88) 100%
            ),
            url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {particles.map((p, i) => <Particle key={i} style={p} />)}
        </div>

        {[
          { top: 32, left: 32, borderTop: "1px solid", borderLeft: "1px solid" },
          { top: 32, right: 32, borderTop: "1px solid", borderRight: "1px solid" },
          { bottom: 32, left: 32, borderBottom: "1px solid", borderLeft: "1px solid" },
          { bottom: 32, right: 32, borderBottom: "1px solid", borderRight: "1px solid" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 56, height: 56, borderColor: "rgba(109,78,25,0.25)", pointerEvents: "none", ...s }} />
        ))}

        <motion.div
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 720, margin: "0 auto" }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="hf-sans"
            style={{ letterSpacing: "0.45em", color: "#4a3a2a", fontSize: 10, textTransform: "uppercase", marginBottom: 20 }}>
            ✦ Exclusive Fine Jewellery ✦
          </motion.p>

          <motion.h1 variants={fadeUp} style={{ marginBottom: 20, lineHeight: 1.1 }}>
            <span className="shimmer-dark hf-display"
              style={{ display: "block", fontSize: "clamp(38px, 7vw, 72px)", fontWeight: 400 }}>
              Crafted in Gold.
            </span>
            <span className="hf-serif"
              style={{ display: "block", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(26px, 5vw, 52px)", color: "#3d3228", marginTop: 8 }}>
              Designed for Eternity.
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="divider-rose" style={{ width: 160, margin: "20px auto" }} />

          <motion.p variants={fadeUp} className="hf-serif"
            style={{ color: "#3d3228", fontSize: "clamp(15px,2.2vw,21px)", lineHeight: 1.8, fontStyle: "italic", fontWeight: 600, marginBottom: 8 }}>
            Handcrafted luxury jewellery — from heritage solitaires to bespoke bridal collections.
          </motion.p>

          <motion.p variants={fadeUp} className="hf-sans"
            style={{ color: "#5a4a3a", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 40 }}>
            BIS Hallmarked · GIA Certified · Free Insured Shipping
          </motion.p>

          <motion.div variants={fadeUp}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <Link to="/product">
            <motion.button  className="btn-primary-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              ✦ Explore Collection
            </motion.button> </Link>
            {/* <motion.button className="btn-secondary-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Book Consultation
            </motion.button> */}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="hf-sans" style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#74878b" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #6d4e19, transparent)" }} />
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "white", borderTop: "1px solid rgba(188,193,194,0.3)", borderBottom: "1px solid rgba(188,193,194,0.3)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))" }}>
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                padding: "22px 16px", borderRight: i < features.length - 1 ? "1px solid rgba(188,193,194,0.25)" : "none", gap: 4 }}>
              <span style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</span>
              <span className="hf-display" style={{ color: "#6d4e19", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>{f.label}</span>
              <span className="hf-sans" style={{ color: "#5a4a3a", fontSize: 10 }}>{f.sub}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px" }}>
        <motion.div style={{ textAlign: "center", marginBottom: 56 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="hf-sans" style={{ color: "#c69e8f", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 14 }}>
            ✦ Curated For You ✦
          </p>
          <h2 className="hf-display" style={{ color: "#6d4e19", fontSize: "clamp(26px,4vw,42px)", fontWeight: 400, marginBottom: 16 }}>
            Our Collections
          </h2>
          <div className="divider-rose" style={{ width: 100, margin: "0 auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
          {collections.map((col, i) => (
            <motion.div key={i} className="col-card"
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ background: "white", border: "1px solid rgba(188,193,194,0.3)", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
                <img src={col.img} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span className="hf-sans"
                  style={{ position: "absolute", top: 14, left: 14, background: "#c69e8f", color: "white",
                    fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 12px" }}>
                  {col.tag}
                </span>
              </div>
              <div style={{ padding: "22px 24px 26px" }}>
                <h3 className="hf-display" style={{ color: "#6d4e19", fontSize: 17, fontWeight: 400, letterSpacing: "0.08em", marginBottom: 8 }}>
                  {col.title}
                </h3>
                <p className="hf-serif" style={{ fontStyle: "italic", color: "#3d3228", fontSize: 15, fontWeight: 600, lineHeight: 1.7, marginBottom: 16 }}>
                  {col.desc}
                </p>
                <Link to="/product">
                  <span className="hf-sans" style={{ color: "#6d4e19", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                    Shop Now →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(188,193,194,0.3)", borderBottom: "1px solid rgba(188,193,194,0.3)", background: "white", padding: "14px 0" }}>
        <motion.div style={{ display: "flex", gap: 56, whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
          {Array(2).fill(null).map((_, j) =>
            ["✦ Bridal Collection","✦ Diamond Solitaires","✦ Gold Bangles","✦ Kundan Jewellery","✦ Platinum Rings","✦ Temple Jewellery","✦ Emerald Sets"].map((txt, i) => (
              <span key={`${j}-${i}`} className="hf-display"
                style={{ color: "#74878b", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {txt}
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* BESPOKE CTA */}
      <section style={{
        position: "relative", padding: "112px 24px", textAlign: "center",
        backgroundImage: `linear-gradient(135deg, rgba(245,246,245,0.94), rgba(245,246,245,0.85)),
          url('https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1400&q=80')`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div className="divider-rose" style={{ position: "absolute", top: 48, left: "50%", transform: "translateX(-50%)", width: 200 }} />
        <div className="divider-rose" style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", width: 200 }} />

        <motion.div style={{ maxWidth: 640, margin: "0 auto" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="hf-sans" style={{ color: "#c69e8f", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 18 }}>
            ✦ Bespoke Services ✦
          </p>
          <h2 className="hf-display" style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 400, marginBottom: 16, lineHeight: 1.2, color: "#6d4e19" }}>
            Design Your <span className="shimmer-dark">Dream Piece</span>
          </h2>
          <p className="hf-serif" style={{ fontStyle: "italic", color: "#3d3228", fontSize: "clamp(15px,2vw,20px)", fontWeight: 600, lineHeight: 1.8, marginBottom: 36 }}>
            Work with our master craftsmen to create a one-of-a-kind jewel — made entirely to your vision.
          </p>
          <motion.button className="btn-primary-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            ✦ Start Your Journey
          </motion.button>
        </motion.div>
      </section>
      <Chatai />
    </div>
  );
}