import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Star } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-about">
          <div style={{ marginBottom: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '12px' }}>
              <img
                src="/bommai-kadai-logo.jpg"
                alt="பொம்மைக் கடை"
                style={{ height: '60px', width: 'auto', objectFit: 'contain', borderRadius: '8px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'Fredoka One, cursive', color: 'var(--accent)', letterSpacing: '0.02em' }}>பொம்மைக் கடை</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premium Toy Shop · Chennai</span>
              </div>
            </Link>
          </div>
          <p>
            Lugan is a premium kids' toy boutique dedicated to providing heirloom-quality toys crafted from sustainable hardwoods, organic cotton plushies, brain games, and fancy accessories.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} className="text-accent" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} className="text-accent" />
              <a href="tel:+918084004747" style={{ color: 'inherit', textDecoration: 'none' }}>+91 80840 04747</a>
            </div>
          </div>
        </div>

        {/* Categories Link Column */}
        <div className="footer-column">
          <h3>Shop Collections</h3>
          <ul className="footer-links">
            <li><Link to="/shop?category=Baby+Toys">Baby Toys</Link></li>
            <li><Link to="/shop?category=Cars">Cars</Link></li>
            <li><Link to="/shop?category=Bikes">Bikes</Link></li>
            <li><Link to="/shop?category=Soft+Toys">Soft Toys</Link></li>
            <li><Link to="/shop?category=Brain+Game+Toys">Brain Game Toys</Link></li>
            <li><Link to="/shop?category=Cards">Cards</Link></li>
            <li><Link to="/shop?category=Fancy+Purses">Fancy Purses</Link></li>
            <li><Link to="/shop?category=Key+Chains">Key Chains</Link></li>
          </ul>
        </div>

        {/* Customer Support Column */}
        <div className="footer-column">
          <h3>Customer Support</h3>
          <ul className="footer-links">
            <li><a href="#shipping">Shipping & Return Policy</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
            <li><a href="#care">Toy Safety & Care Guide</a></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="footer-column footer-newsletter">
          <h3>Newsletter</h3>
          {subscribed ? (
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: 'var(--radius-sm)', color: '#fff' }}>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Thank you for subscribing!</p>
              <p style={{ fontSize: '0.85rem' }}>You'll receive exclusive collection updates and sales.</p>
            </div>
          ) : (
            <div>
              <p>Subscribe to receive news about new products, boutique store events, and safety updates.</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="flex-center">
                  <Mail size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Toy doodle row */}
      <div className="footer-doodles">
        <span>🧸</span>
        <span>🚗</span>
        <span>🧩</span>
        <span>🚲</span>
        <span>🃏</span>
        <span>🔑</span>
        <span>👜</span>
        <span>🍼</span>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} பொம்மைக் கடை. All rights reserved. | சென்னை 📍 | 📞 +91 80840 04747</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} fill="#ef4444" className="text-red-500" /> for joyful childhood memories.
        </p>
      </div>
    </footer>
  );
};
