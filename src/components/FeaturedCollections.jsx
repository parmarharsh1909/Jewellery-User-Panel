import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const FeaturedCollections = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const collections = [
    {
      id: 1,
      title: "Diamond Collections",
      subtitle: "Exceptional Brilliance",
      image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwa7b67c7b/images/hi-res/51F1KPFPQAA00_1.jpg?sw=480&sh=480",
      description: "Timeless diamonds set in exquisite designs"
    },
    {
      id: 2,
      title: "Gold Heritage",
      subtitle: "Pure Excellence",  
      image: "https://img.freepik.com/free-vector/bracelet-vintage-illustration-vector-remixed-from-artwork-by-walter-g-capuozzo_53876-116248.jpg?t=st=1769756091~exp=1769759691~hmac=a4c1dc4fed636ebbc06ffe11bf83706d6bebd1500a6e01191708341b33f2ede3&w=1480",
      description: "Traditional craftsmanship meets modern elegance"
    },
    {
      id: 3,
      title: "Platinum Dreams",
      subtitle: "Sophisticated Luxury",
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Premium platinum settings for lasting beauty"
    },
    {
      id: 4,
      title: "Bridal Sets",
      subtitle: "Eternal Bonds",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Complete sets for your most precious moments"
    },
    {
      id: 5,
      title: "Bridal Sets",
      subtitle: "Eternal Bonds",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Complete sets for your most precious moments"
    },
    {
      id: 6,
      title: "Bridal Sets",
      subtitle: "Eternal Bonds",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Complete sets for your most precious moments"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="py-5 my-5"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <div className="text-center mb-5">
          <motion.h2 
            className="display-5 text-charcoal mb-3"
            variants={itemVariants}
          >
            Featured Collections
          </motion.h2>
          <motion.div 
            className="border-gold-bottom w-25 mx-auto mb-4"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="lead product-description"
            variants={itemVariants}
          >
            Discover our most cherished jewelry collections, each piece telling a story of timeless elegance.
          </motion.p>
        </div>

        <div className="row g-4">
          {collections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              className="col-md-4 col-sm-6"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card card-luxury text-center h-100 hover-lift position-relative overflow-hidden">
                <div className="position-relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="card-img-top p-3"
                    style={{height: '250px', objectFit: 'contain'}}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)'
                  }}></div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title product-title mb-1">{collection.title}</h5>
                  <small className="text-gold mb-2">{collection.subtitle}</small>
                  <p className="card-text product-description flex-grow-1">{collection.description}</p>
                  <Link 
                    to="/product" 
                    className="btn btn-outline-gold mt-auto"
                    style={{width: 'fit-content', margin: '10px auto 0'}}
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedCollections;