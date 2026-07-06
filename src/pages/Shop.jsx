import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const Shop = ({ searchQuery, onSearchChange }) => {
  const { products, loading } = useContext(ShopContext);
  const location = useLocation();

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync Category from URL query parameters (e.g. when clicking footer links or home categories)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  // Categories list
  const categoriesList = [
    'Baby Toys',
    'Cars',
    'Bikes',
    'Soft Toys',
    'Brain Game Toys',
    'Cards',
    'Fancy Purses',
    'Key Chains'
  ];

  // Age ranges list
  const ageRangesList = [
    { value: 'all', label: 'All Ages' },
    { value: 'baby', label: 'Newborns & Toddlers' },
    { value: 'preschool', label: '3 - 6 Years' },
    { value: 'kids', label: '8 Years +' },
    { value: 'teens', label: '10 Years +' }
  ];

  const handleCategoryCheckbox = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange('all');
    setSelectedAgeRange('all');
    setSortBy('featured');
    onSearchChange('');
  };

  // Filter Products
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 2. Category Filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // 3. Price Filter (INR)
    if (selectedPriceRange !== 'all') {
      const price = product.price;
      if (selectedPriceRange === '100to500' && (price < 100 || price > 500)) return false;
      if (selectedPriceRange === '500to2000' && (price < 500 || price > 2000)) return false;
      if (selectedPriceRange === '2000to5000' && (price < 2000 || price > 5000)) return false;
      if (selectedPriceRange === 'over5000' && price <= 5000) return false;
    }

    // 4. Age Range Filter
    if (selectedAgeRange !== 'all') {
      const ageStr = product.specs.ageRange.toLowerCase();
      if (selectedAgeRange === 'baby' && !ageStr.includes('all') && !ageStr.includes('newborn') && !ageStr.includes('1') && !ageStr.includes('2') && !ageStr.includes('3') && !ageStr.includes('all ages')) return false;
      if (selectedAgeRange === 'preschool' && !ageStr.includes('3') && !ageStr.includes('4') && !ageStr.includes('5') && !ageStr.includes('6') && !ageStr.includes('all ages')) return false;
      if (selectedAgeRange === 'kids' && !ageStr.includes('8') && !ageStr.includes('5') && !ageStr.includes('all ages')) return false;
      if (selectedAgeRange === 'teens' && !ageStr.includes('10') && !ageStr.includes('12') && !ageStr.includes('all ages')) return false;
    }

    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // 'featured' defaults to order in seed data
    return 0;
  });

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border-color)', padding: '40px 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Boutique Shop</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse and filter our custom premium products.</p>
      </div>

      <div className="shop-layout">
        {/* Mobile Filters Toggle Button */}
        <button
          className="lg-hidden btn-outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          style={{ display: 'none', marginBottom: '20px', gap: '8px', width: '100%', justifyContent: 'center' }}
        >
          <SlidersHorizontal size={18} />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showMobileFilters ? 'mobile-show' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} className="text-accent" /> Filters
            </h2>
            <button onClick={handleResetFilters} className="flex-center" style={{ gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              {categoriesList.map((category) => (
                <label className="filter-checkbox" key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryCheckbox(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter (INR) */}
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="filter-options">
              <label className="filter-checkbox">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === 'all'}
                  onChange={() => setSelectedPriceRange('all')}
                />
                <span>All Prices</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === '100to500'}
                  onChange={() => setSelectedPriceRange('100to500')}
                />
                <span>&#8377;100 – ₹500</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === '500to2000'}
                  onChange={() => setSelectedPriceRange('500to2000')}
                />
                <span>&#8377;500 – ₹2,000</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === '2000to5000'}
                  onChange={() => setSelectedPriceRange('2000to5000')}
                />
                <span>&#8377;2,000 – ₹5,000</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === 'over5000'}
                  onChange={() => setSelectedPriceRange('over5000')}
                />
                <span>Over ₹5,000</span>
              </label>
            </div>
          </div>

          {/* Age Suitability Filter */}
          <div className="filter-group" style={{ marginBottom: 0 }}>
            <h3>Age Group</h3>
            <div className="filter-options">
              {ageRangesList.map((age) => (
                <label className="filter-checkbox" key={age.value}>
                  <input
                    type="radio"
                    name="ageRange"
                    checked={selectedAgeRange === age.value}
                    onChange={() => setSelectedAgeRange(age.value)}
                  />
                  <span>{age.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Main Panel */}
        <main>
          {/* Controls Bar */}
          <div className="shop-content-header">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing {sortedProducts.length} of {products.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'inline-block' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Loading/Listing */}
          {loading ? (
            <div className="flex-center" style={{ height: '400px', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'pulse 1s infinite alternate' }}></div>
              <p className="text-muted">Filtering catalog...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="flex-center" style={{ height: '400px', flexDirection: 'column', gap: '16px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-white)' }}>
              <SlidersHorizontal size={48} className="text-muted" strokeWidth={1} />
              <h3>No products found</h3>
              <p className="text-muted">Try resetting your filters or modifying your search query.</p>
              <button onClick={handleResetFilters} className="btn-accent" style={{ marginTop: '8px' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid-products" style={{ margin: 0 }}>
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
