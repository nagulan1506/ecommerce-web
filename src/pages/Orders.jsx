import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ShoppingBag, ArrowRight, ShieldAlert } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ProductImage } from '../components/ProductImage';

export const Orders = () => {
  const { orders, token, fetchOrders } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }

    const load = async () => {
      setLoadingHistory(true);
      await fetchOrders();
      setLoadingHistory(false);
    };
    load();
  }, [token, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container orders-page">
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ClipboardList size={36} className="text-accent" /> Order History
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Review and track your previous handcrafted purchases.</p>
      </div>

      {loadingHistory ? (
        <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'pulse 1s infinite alternate' }}></div>
          <p className="text-muted">Retrieving your order records...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '16px', border: '1.5px dashed var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-white)', marginTop: '32px' }}>
          <ShoppingBag size={48} className="text-muted" strokeWidth={1} />
          <h3>No orders placed yet</h3>
          <p className="text-muted">You haven't purchased any premium toys under this account yet.</p>
          <button onClick={() => navigate('/shop')} className="btn-accent" style={{ marginTop: '8px' }}>
            Go to Shop <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-history-card" key={order._id}>
              {/* Order Header Panel */}
              <div className="order-history-header">
                <div className="order-header-cell">
                  <span>Order Placed</span>
                  <p>{formatDate(order.createdAt || order.paidAt)}</p>
                </div>
                <div className="order-header-cell">
                  <span>Total Cost</span>
                  <p style={{ color: 'var(--accent)' }}>₹{order.totalPrice.toLocaleString('en-IN')}</p>
                </div>
                <div className="order-header-cell">
                  <span>Ship To</span>
                  <p>{order.shippingAddress.fullName}</p>
                </div>
                <div className="order-header-cell" style={{ textAlign: 'right' }}>
                  <span>Order ID</span>
                  <p style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{order._id}</p>
                </div>
              </div>

              {/* Order items body */}
              <div className="order-history-body">
                <div className="order-history-items">
                  {order.items.map((item) => (
                    <div className="order-history-item" key={item.productId || item._id}>
                      {/* Product thumbnail */}
                      <div className="order-history-item-img">
                        <ProductImage name={item.image} size="35px" />
                      </div>
                      
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{item.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Quantity: {item.quantity} &bull; Unit Price: ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '0.95rem' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
