import React from 'react';
import { Link } from 'react-router-dom';

/* Inline SVG doodles for floating decorations */
const DoodleCar = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="20" width="90" height="30" rx="8" fill="white" stroke="white" strokeWidth="2"/>
    <rect x="20" y="8" width="55" height="24" rx="6" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="22" cy="52" r="9" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="78" cy="52" r="9" fill="white" stroke="white" strokeWidth="2"/>
    <rect x="30" y="12" width="16" height="14" rx="3" fill="white" opacity="0.4"/>
    <rect x="52" y="12" width="16" height="14" rx="3" fill="white" opacity="0.4"/>
    <rect x="82" y="28" width="10" height="6" rx="2" fill="white" opacity="0.6"/>
  </svg>
);

const DoodleStar = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="white" stroke="white" strokeWidth="1"/>
  </svg>
);

const DoodleBear = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="55" r="30" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="50" cy="40" r="18" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="28" cy="25" r="12" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="72" cy="25" r="12" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="43" cy="37" r="4" fill="white" opacity="0.4"/>
    <circle cx="57" cy="37" r="4" fill="white" opacity="0.4"/>
    <ellipse cx="50" cy="46" rx="5" ry="3" fill="white" opacity="0.4"/>
  </svg>
);

const DoodleRocket = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="20" ry="35" fill="white" stroke="white" strokeWidth="2"/>
    <polygon points="50,5 30,30 70,30" fill="white" opacity="0.7"/>
    <polygon points="30,72 10,90 30,85" fill="white" opacity="0.6"/>
    <polygon points="70,72 90,90 70,85" fill="white" opacity="0.6"/>
    <circle cx="50" cy="50" r="8" fill="white" opacity="0.3"/>
    <ellipse cx="50" cy="92" rx="10" ry="14" fill="white" opacity="0.3"/>
  </svg>
);

const DoodlePuzzle = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="35" height="35" rx="4" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="45" cy="27" r="7" fill="white"/>
    <rect x="55" y="10" width="35" height="35" rx="4" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="55" cy="27" r="7" fill="white" opacity="0.4"/>
    <rect x="10" y="55" width="35" height="35" rx="4" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="45" cy="72" r="7" fill="white"/>
    <rect x="55" y="55" width="35" height="35" rx="4" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="55" cy="72" r="7" fill="white" opacity="0.4"/>
  </svg>
);

const DoodleBike = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="55" r="20" fill="none" stroke="white" strokeWidth="5"/>
    <circle cx="95" cy="55" r="20" fill="none" stroke="white" strokeWidth="5"/>
    <circle cx="25" cy="55" r="5" fill="white"/>
    <circle cx="95" cy="55" r="5" fill="white"/>
    <polyline points="25,55 50,25 80,25 95,55" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="50,25 60,55" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <rect x="44" y="18" width="20" height="8" rx="3" fill="white"/>
  </svg>
);

const DoodleDiamond = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 95,40 50,95 5,40" fill="white" stroke="white" strokeWidth="2"/>
    <polygon points="50,5 95,40 50,50 5,40" fill="white" opacity="0.4"/>
  </svg>
);

export const HeroBanner = () => {
  return (
    <section className="hero">
      {/* Floating toy doodles */}
      <div className="hero-doodles">
        <div className="doodle doodle-1"><DoodleStar size={55} /></div>
        <div className="doodle doodle-2"><DoodleRocket size={80} /></div>
        <div className="doodle doodle-3"><DoodleBear size={90} /></div>
        <div className="doodle doodle-4"><DoodleCar size={85} /></div>
        <div className="doodle doodle-5"><DoodlePuzzle size={70} /></div>
        <div className="doodle doodle-6 doodle-spin"><DoodleStar size={40} /></div>
        <div className="doodle doodle-7"><DoodleBike size={85} /></div>
        <div className="doodle" style={{ bottom: '20%', left: '30%', animation: 'float2 8s ease-in-out infinite', opacity: 0.12 }}>
          <DoodleDiamond size={45} />
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content">
          <div className="hero-subtitle">🎉 Premium Toys for a Beautiful Childhood</div>

          <h1 className="hero-title">
            Welcome to<br />
            <span>பொம்மைக் கடை</span> 🌟
          </h1>

          <p className="hero-description">
            Discover the best toys for your little ones! Cars, bikes, soft plushies, educational brain games, and so much more...
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/shop" className="btn-accent" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
              🛒 Shop Now
            </Link>
            <Link to="/shop" className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              View All Toys
            </Link>
          </div>

          {/* Trust badges */}
          <div className="hero-badges">
            <span className="hero-badge">🚚 Free Delivery above ₹999</span>
            <span className="hero-badge">⭐ 1000+ Happy Kids</span>
            <span className="hero-badge">🛡️ Safe & Certified Toys</span>
            <span className="hero-badge">📍 Chennai</span>
          </div>
        </div>
      </div>
    </section>
  );
};
