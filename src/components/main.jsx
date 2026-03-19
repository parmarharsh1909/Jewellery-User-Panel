import React from "react";
import { motion } from "framer-motion";
import AnimatedElement from "./AnimatedElement";

const Home = () => {
  return (
    <>
      <div
        className="hero-luxury border-0 pb-3 d-flex align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.88), rgba(0,0,0,0.55)), url('./assets/main.png.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <motion.div
                className="card border-0 p-4 p-md-5 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: "rgba(20, 20, 20, 0.75)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "22px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
                }}
              >
                <AnimatedElement animationType="fadeIn" delay={0.2}>
                  <h1
                    className="fw-light display-5 mb-3"
                    style={{
                      color: "#F5E6C8",
                      textShadow: "0 0 15px rgba(212,175,55,0.25)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Crafted in Gold. <br /> Designed for Eternity.
                  </h1>
                </AnimatedElement>

                <AnimatedElement animationType="fadeIn" delay={0.4}>
                  <p
                    className="fs-5 d-none d-sm-block"
                    style={{
                      color: "#CFCFCF",
                      lineHeight: "1.7",
                    }}
                  >
                    Discover our handcrafted luxury jewelry pieces made with
                    the finest materials and exceptional artistry.
                  </p>
                </AnimatedElement>

                <AnimatedElement animationType="fadeIn" delay={0.6}>
                  <motion.button
                    className="btn mt-4 px-5 py-3 fs-5 fw-semibold"
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 28px rgba(212,175,55,0.9)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background:
                        "linear-gradient(135deg, #D4AF37, #F7E7A9)",
                      color: "#111111",
                      borderRadius: "50px",
                      border: "none",
                      letterSpacing: "1px",
                    }}
                  >
                    ✨ Explore Collection
                  </motion.button>
                </AnimatedElement>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
