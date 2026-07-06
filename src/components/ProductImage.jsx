import React, { useState } from 'react';

// ── Per-product image map (image key → URL) ──────────────────────────────────
const IMAGE_MAP = {
  // Baby Toys
  'rocking-horse':   '/products/baby-toys.png',
  'baby-walker':     '/products/baby-toys.png',
  'baby-rattle':     '/products/baby-toys.png',
  'baby-mobile':     '/products/baby-toys.png',

  // Cars
  'race-car':        '/products/toy-car.png',
  'retro-roadster':  '/products/toy-car.png',
  'monster-truck':   '/products/toy-car.png',
  'fire-truck':      '/products/toy-car.png',

  // Bikes
  'balance-bike':    '/products/toy-bike.png',
  'tricycle':        '/products/toy-bike.png',
  'scooter-toy':     '/products/toy-bike.png',
  'mini-bicycle':    '/products/toy-bike.png',

  // Soft Toys
  'plush-bear':      '/products/soft-toys.png',
  'plush-bunny':     '/products/soft-toys.png',
  'plush-elephant':  '/products/soft-toys.png',
  'plush-fox':       '/products/soft-toys.png',

  // Brain Game Toys
  '3d-puzzle':       '/products/brain-game.png',
  'tangram-puzzle':  '/products/brain-game.png',
  'sudoku-blocks':   '/products/brain-game.png',
  'abacus-toy':      '/products/brain-game.png',

  // Cards
  'trivia-cards':    '/products/toy-cards.png',
  'memory-cards':    '/products/toy-cards.png',
  'alphabet-cards':  '/products/toy-cards.png',
  'animal-cards':    '/products/toy-cards.png',

  // Fancy Purses — curated Unsplash shots
  'velvet-purse':
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop&auto=format',
  'rattan-purse':
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&auto=format',
  'glitter-purse':
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&auto=format',
  'butterfly-bag':
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&auto=format',

  // Key Chains — curated Unsplash shots
  'keychain-unicorn':
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&auto=format',
  'keychain-animals':
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&auto=format',
  'keychain-star':
    'https://images.unsplash.com/photo-1535268244832-6e7c9a40b5d8?w=400&h=400&fit=crop&auto=format',
  'keychain-rainbow':
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format',
};

// ── Category-level fallbacks ──────────────────────────────────────────────────
const CATEGORY_FALLBACK = {
  'baby toys':       '/products/baby-toys.png',
  'cars':            '/products/toy-car.png',
  'bikes':           '/products/toy-bike.png',
  'soft toys':       '/products/soft-toys.png',
  'brain game toys': '/products/brain-game.png',
  'cards':           '/products/toy-cards.png',
  'fancy purses':
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop&auto=format',
  'key chains':
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&auto=format',
};

// ── Component ─────────────────────────────────────────────────────────────────
export const ProductImage = ({ name, category, size = '100%' }) => {
  const [errored, setErrored] = useState(false);

  const style = {
    width: size,
    height: size,
    maxWidth: '300px',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  };

  const key  = (name || '').toLowerCase().trim();
  const cat  = (category || '').toLowerCase().trim();

  const primarySrc  = IMAGE_MAP[key] || CATEGORY_FALLBACK[cat] || '/products/baby-toys.png';
  const fallbackSrc = CATEGORY_FALLBACK[cat] || '/products/baby-toys.png';

  return (
    <img
      src={errored ? fallbackSrc : primarySrc}
      alt={name}
      style={style}
      onError={() => setErrored(true)}
    />
  );
};
