import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Auth } from './pages/Auth';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { About } from './pages/About';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './pages/ProductDetailModal';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Page Area */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Shopping Cart Drawer overlay */}
      <CartDrawer />

      {/* Product Detail Modal overlay */}
      <ProductDetailModal />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
