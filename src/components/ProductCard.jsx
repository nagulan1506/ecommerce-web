import React, { useContext } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct } = useContext(ShopContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? '#FFD700' : 'none'}
          color={i < fullStars ? '#FFD700' : '#ccc'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={() => setSelectedProduct(product)}>
      <div className="product-image-container">
        <span className="product-category-tag">{product.category}</span>
        <ProductImage name={product.image} size="160px" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.reviewsCount})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            title="Add to Cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
