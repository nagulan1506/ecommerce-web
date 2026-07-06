import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    getCartTotal
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 150.00 : 0;
  const total = subtotal + shipping;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleExploreClick = () => {
    setIsCartOpen(false);
    navigate('/shop');
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="flex-center" style={{ gap: '8px' }}>
            <ShoppingCart size={22} className="text-accent" />
            Shopping Cart
          </h2>
          <button className="cart-close-btn flex-center" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={64} strokeWidth={1} className="text-muted" style={{ marginBottom: '16px' }} />
              <h3>Your cart is empty</h3>
              <p>Explore our premium heirloom toy collection and add items to your cart.</p>
              <button onClick={handleExploreClick} className="btn-accent" style={{ marginTop: '16px' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.productId}>
                {/* Product Icon */}
                <div className="cart-item-image">
                  <ProductImage name={item.image} size="45px" />
                </div>
                
                {/* Product Detail */}
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                  
                  {/* Quantity Adjustment */}
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.productId)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping (Flat Rate)</span>
              <span>₹{shipping.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Order Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="btn-primary cart-checkout-btn"
            >
              Checkout <CreditCard size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
