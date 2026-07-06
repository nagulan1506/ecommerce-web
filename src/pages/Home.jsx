import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products, loading } = useContext(ShopContext);
  const navigate = useNavigate();

  const categories = [
    { name: 'Baby Toys',    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80&fit=crop',           desc: 'Shop Now', category: 'Baby Toys',       emoji: '🍼' },
    { name: 'Cars',         image: 'https://images.unsplash.com/photo-1594736797933-d0d38e236875?w=400&q=80&fit=crop',           desc: 'Shop Now', category: 'Cars',            emoji: '🚗' },
    { name: 'Bikes',        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop',             desc: 'Shop Now', category: 'Bikes',           emoji: '🚲' },
    { name: 'Soft Toys',    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80&fit=crop',             desc: 'Shop Now', category: 'Soft Toys',       emoji: '🧸' },
    { name: 'Brain Games',  image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&q=80&fit=crop',          desc: 'Shop Now', category: 'Brain Game Toys', emoji: '🧩' },
    { name: 'Cards',        image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=400&q=80&fit=crop',          desc: 'Shop Now', category: 'Cards',           emoji: '🃏' },
    { name: 'Fancy Purses', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80&fit=crop',          desc: 'Shop Now', category: 'Fancy Purses',    emoji: '👜' },
    { name: 'Key Chains',   image: 'https://images.unsplash.com/photo-1631982690223-8aa4949a90e5?w=400&q=80&fit=crop',          desc: 'Shop Now', category: 'Key Chains',      emoji: '🔑' },
  ];

  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div>
      <HeroBanner />

      <section className="categories-section container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>🎈 Find the perfect toy for every little adventurer!</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => handleCategoryClick(cat.category)}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <div className="category-image-wrapper">
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.desc} →</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '24px 0 60px 0' }}>
        <div className="section-header">
          <h2>⭐ Best Sellers</h2>
          <p>🏆 Our most loved toys — handpicked for the best play experience</p>
        </div>

        {loading ? (
          <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px',
              border: '5px solid #e8e0f5',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'spin-slow 0.8s linear infinite'
            }}></div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Loading amazing toys... 🧸</p>
          </div>
        ) : (
          <div>
            <div className="grid-products">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            <div className="flex-center" style={{ marginTop: '40px' }}>
              <button onClick={() => navigate('/shop')} className="btn-secondary">
                See All Products <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ─── Premium Mobile App Launch Section ──────────────── */}
      <section className="container" style={{ padding: '40px 0 90px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy-card) 100%)',
          border: '1px solid var(--border-glow)',
          borderRadius: '32px',
          padding: '56px 48px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card), var(--shadow-glow)'
        }}>
          {/* Decorative glowing background gradients */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(124,92,191,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>

          {/* Left Column: App Promo Text */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid var(--border-glow)',
              color: 'var(--gold-bright)',
              padding: '6px 16px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              🚀 Coming Soon to Android & iOS
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#f0ead6',
              marginBottom: '20px'
            }}>
              Shop Faster with the <br />
              <span className="gold-text">பொம்மைக் கடை App</span>
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--txt-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '480px'
            }}>
              Get instant access to limited edition toys, real-time delivery tracking, and ultra-secure one-tap UPI payments!
            </p>

            {/* App Features List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: '40px' }}>
              {[
                { icon: '⚡', text: 'One-Tap UPI Checkout' },
                { icon: '📦', text: 'Live Order Tracking' },
                { icon: '🎟️', text: 'App-Only Coupon Discounts' },
                { icon: '🔔', text: 'Restock Notifications' }
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>{feat.icon}</span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(240,234,214,0.8)', fontWeight: 500 }}>{feat.text}</span>
                </div>
              ))}
            </div>

            {/* App Download Buttons Mockups */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Google Play Store Badge */}
              <div style={{
                background: '#000',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
                padding: '8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: '1.6rem' }}>🤖</span>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.6rem', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>Get it on</div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>Google Play</div>
                </div>
              </div>

              {/* App Store Badge */}
              <div style={{
                background: '#000',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
                padding: '8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: '1.6rem' }}>🍎</span>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.6rem', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>Download on the</div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>App Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup + QR Code */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Phone Body Container */}
            <div style={{
              width: '240px',
              height: '460px',
              background: '#090d22',
              border: '6px solid #1a1e36',
              borderRadius: '36px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.1)',
              padding: '12px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 1
            }}>
              {/* Phone Camera Notch */}
              <div style={{ width: '90px', height: '18px', background: '#1a1e36', borderRadius: '0 0 12px 12px', margin: '0 auto', position: 'absolute', top: 0, left: 'calc(50% - 45px)', zIndex: 10 }}></div>

              {/* Phone Screen App Home */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <img src="/bommai-kadai-logo.jpg" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-bright)' }}>பொம்மைக் கடை</span>
                </div>

                {/* Simulated product */}
                <div style={{ background: '#111632', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px', margin: '12px 0' }}>
                  <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>🧸</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '8px', color: '#fff' }}>Teddy Bear</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold-bright)', fontWeight: 700 }}>₹499</span>
                    <span style={{ fontSize: '0.6rem', background: 'var(--gold)', color: '#000', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>One-Tap UPI</span>
                  </div>
                </div>

                {/* Scan & Pay Banner */}
                <div style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(124,92,191,0.15))', border: '1px solid var(--border-glow)', padding: '10px', borderRadius: '12px', textAlign: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--gold-bright)', letterSpacing: '0.05em', display: 'block' }}>⚡ SCAN & PAY ENABLED</span>
                  <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.7)' }}>Fast, secure direct payment</span>
                </div>
              </div>
            </div>

            {/* Scanning Target Glow effect surrounding phone */}
            <div style={{
              position: 'absolute',
              width: '270px',
              height: '490px',
              border: '2px dashed rgba(201,168,76,0.3)',
              borderRadius: '48px',
              pointerEvents: 'none',
              animation: 'float1 8s ease-in-out infinite'
            }}></div>

            {/* QR Code overlay card */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-10px',
              background: 'var(--navy-card)',
              border: '1.5px solid var(--border-glow)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              animation: 'float2 6s ease-in-out infinite'
            }}>
              <div style={{ background: 'white', padding: '6px', borderRadius: '10px' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent('https://play.google.com/store/apps')}`}
                  alt="Download App QR"
                  style={{ display: 'block', width: '70px', height: '70px' }}
                />
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--gold-bright)', fontWeight: 700, marginTop: '8px', letterSpacing: '0.05em' }}>SCAN TO DOWNLOAD</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
