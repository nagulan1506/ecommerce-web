import React, { useContext, useState } from 'react';
import { X, Star, ShoppingBag, ShieldAlert, Heart, Plus, Minus } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ProductImage } from '../components/ProductImage';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useContext(ShopContext);
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, qty);
    setQty(1); // Reset local quantity
    setSelectedProduct(null); // Close modal
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < fullStars ? 'currentColor' : 'none'}
          className={i < fullStars ? 'text-amber-500' : 'text-slate-300'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close flex-center" onClick={() => setSelectedProduct(null)}>
          <X size={24} />
        </button>

        {/* Modal Grid content */}
        <div className="modal-content">
          {/* Left panel image */}
          <div className="modal-image-panel">
            <ProductImage name={selectedProduct.image} size="240px" />
          </div>

          {/* Right panel details */}
          <div className="modal-details-panel">
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  backgroundColor: 'var(--accent-light)',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                {selectedProduct.category}
              </span>
              <h2 style={{ marginTop: '12px' }}>{selectedProduct.name}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <div style={{ display: 'flex', color: '#fbbf24' }}>
                  {renderStars(selectedProduct.rating)}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {selectedProduct.rating} / 5.0 ({selectedProduct.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              {selectedProduct.description}
            </p>

            {/* Spec details grid */}
            <div className="modal-specs">
              <div>
                <span>Age Suitability:</span> {selectedProduct.specs.ageRange}
              </div>
              <div>
                <span>Materials:</span> {selectedProduct.specs.material}
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span>Dimensions:</span> {selectedProduct.specs.dimensions}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <span className="modal-price">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '0.85rem', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <ShieldAlert size={14} /> In Stock & Ready to Ship
              </span>
            </div>

            {/* Actions panel */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '16px' }}>
              {/* Quantity selectors */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}
              >
                <button
                  className="qty-btn"
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  style={{ width: '40px', height: '40px', border: 'none' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQty(prev => prev + 1)}
                  style={{ width: '40px', height: '40px', border: 'none' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="btn-accent"
                style={{ flexGrow: 1, height: '42px', justifyContent: 'center' }}
              >
                Add to Cart <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
