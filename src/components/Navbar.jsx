import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, ClipboardList, Menu, X, Star } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export const Navbar = ({ onSearchChange, searchQuery }) => {
  const { getCartCount, user, logout, setIsCartOpen } = useContext(ShopContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
    if (window.location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const handleLogoutClick = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/bommai-kadai-logo.jpg"
            alt="பொம்மைக் கடை"
            style={{ height: '56px', width: 'auto', objectFit: 'contain', borderRadius: '8px' }}
          />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '0.02em' }}>பொம்மைக் கடை</span>
            <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premium Toy Shop</span>
          </span>
        </Link>

        <form onSubmit={handleSearchSubmit} className="search-box">
          <input
            type="text"
            placeholder="Search toys"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button type="submit" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        <div className="nav-actions">
          <div className="user-menu-container" style={{ position: 'relative' }}>
            {user ? (
              <div>
                <button
                  className="flex-center"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{ gap: '6px', fontWeight: '600', color: 'white', fontSize: '14px', padding: '8px 12px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <User size={20} />
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <small style={{ fontSize: '12px', opacity: '0.9' }}>Hello,</small>
                    <span style={{ fontWeight: '800' }}>{user.name.split(' ')[0]}</span>
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      padding: '8px 0',
                      minWidth: '200px',
                      zIndex: 110,
                      marginTop: '8px'
                    }}
                  >
                    <Link
                      to="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        padding: '10px 16px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#0f1111',
                        textDecoration: 'none'
                      }}
                    >
                      <ClipboardList size={16} />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      style={{
                        padding: '10px 16px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#0f1111',
                        textAlign: 'left',
                        width: '100%',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', padding: '8px 12px', borderRadius: '4px', color: 'white', textDecoration: 'none' }}>
                <User size={20} />
                <small style={{ fontSize: '12px', opacity: '0.9' }}>Hello, Sign in</small>
                <span style={{ fontWeight: '800' }}>Account</span>
              </Link>
            )}
          </div>

          <button className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <small style={{ fontSize: '12px', opacity: '0.9' }}>Cart</small>
            </div>
          </button>
        </div>
      </div>

      <div className="navbar-bottom">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop All</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};
