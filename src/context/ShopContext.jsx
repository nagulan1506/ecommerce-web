import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('wonderland_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [token, setToken] = useState(localStorage.getItem('wonderland_token') || null);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          // Token is invalid
          logout();
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        logout();
      }
    };
    fetchUser();
  }, [token]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('wonderland_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth operations
  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('wonderland_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.msg || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, error: 'Server connection error' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('wonderland_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.msg || 'Invalid credentials' };
      }
    } catch (err) {
      return { success: false, error: 'Server connection error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('wonderland_token');
    setToken(null);
    setUser(null);
    setOrders([]);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.productId === product._id);
      if (existing) {
        return prevCart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity
          }
        ];
      }
    });
    // Open cart drawer when adding item
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Order operations
  const placeOrder = async (shippingAddress, paymentId = '') => {
    if (!token) return { success: false, error: 'Please log in to checkout' };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          shippingAddress,
          paymentId,
          totalPrice: parseFloat((getCartTotal() + 150).toFixed(2)) // ₹150 flat shipping
        })
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        return { success: true, order: data };
      } else {
        return { success: false, error: data.msg || 'Checkout failed' };
      }
    } catch (err) {
      return { success: false, error: 'Server connection error' };
    }
  };

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        cart,
        token,
        user,
        selectedProduct,
        isCartOpen,
        orders,
        register,
        login,
        logout,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        placeOrder,
        fetchOrders,
        setSelectedProduct,
        setIsCartOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
