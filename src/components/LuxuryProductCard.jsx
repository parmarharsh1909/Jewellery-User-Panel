import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import AnimatedElement from './AnimatedElement';

const LuxuryProductCard = memo(({ product, index = 0 }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const addProduct = useCallback((product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  }, [dispatch]);

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  // Extract jewelry-related info from product
  const getCategoryLabel = (category) => {
    const categoryLabels = {
      'jewelery': 'Fine Jewelry',
      'men\'s clothing': 'Men\'s Rings',
      'women\'s clothing': 'Women\'s Necklaces',
      'electronics': 'Earrings & Studs'
    };
    return categoryLabels[category] || category;
  };

  return (
    <AnimatedElement animationType="slideInUp" delay={index * 0.1} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <motion.div
        className="card card-luxury text-center h-100 hover-lift position-relative"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="position-relative overflow-hidden">
          <motion.img
            className="card-img-top p-3 w-100"
            src={product.image}
            alt={product.title}
            height={300}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="position-absolute top-0 start-0 badge bg-gold text-dark m-2 px-3 py-2"
            initial={{ opacity: 0, y: -20 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {getCategoryLabel(product.category)}
          </motion.div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <motion.h5 
            className="card-title product-title mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.title.substring(0, 20)}...
          </motion.h5>
          
          <motion.p 
            className="card-text product-description flex-grow-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.description.substring(0, 60)}...
          </motion.p>
          
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="price-display fs-5">{formatPrice(product.price)}</span>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < Math.floor(product.rating?.rate || 0) ? 'text-gold' : 'text-muted'}`}
                  ></i>
                ))}
              </div>
            </div>
            
            <div className="card-body p-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-gold w-100 mb-2"
                >
                  View Details
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className="btn btn-gold w-100"
                  onClick={() => addProduct(product)}
                >
                  Add to Cart
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedElement>
  );
});

export default LuxuryProductCard;