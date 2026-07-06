import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle, CreditCard, ArrowRight, ShieldAlert, ArrowLeft, Smartphone, Zap } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export const Checkout = () => {
  const { cart, token, placeOrder, getCartTotal } = useContext(ShopContext);
  const navigate = useNavigate();

  // Route protection
  useEffect(() => {
    if (!token) {
      navigate('/auth?redirect=/checkout');
    }
  }, [token, navigate]);

  // Steps: 1 = Shipping, 2 = Payment, 3 = Complete
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // default to 'upi' for Indian premium flavor
  const [upiId, setUpiId] = useState('');
  const [upiSubMethod, setUpiSubMethod] = useState('qr'); // 'qr' or 'id'
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [isVerifying, setIsVerifying] = useState(false);

  // UPI Countdown Timer
  useEffect(() => {
    if (step === 2 && paymentMethod === 'upi' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, paymentMethod, timeLeft]);

  // Shipping Form Fields
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  // Payment Form Fields (Mock)
  const [payment, setPayment] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleShippingChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    let { name, value } = e.target;
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substr(0, 19);
    }
    // Format expiry date
    if (name === 'expiry') {
      value = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().substr(0, 5);
      if (value.endsWith('/')) value = value.slice(0, -1);
    }
    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substr(0, 3);
    }

    setPayment({
      ...payment,
      [name]: value
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (paymentMethod === 'razorpay') {
      // Razorpay Integration
      const options = {
        key: "rzp_test_1234567890abcdef", // Replace with your actual Razorpay Key ID
        amount: Math.round(orderTotal * 100), // Amount in paise
        currency: "INR",
        name: "Lugan Toys",
        description: "Purchase Order",
        image: "https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=gold%20premium%20logo%20with%20text%20'LUGAN'%20and%20rocking%20horse%20on%20black%20background&image_size=square",
        handler: async function (response) {
          const result = await placeOrder(shippingAddress, response.razorpay_payment_id);
          setSubmitting(false);
          if (result.success) {
            setPlacedOrder(result.order);
            setStep(3);
          } else {
            setError(result.error);
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: "customer@lugan.com",
          contact: "9999999999"
        },
        notes: {
          address: `${shippingAddress.addressLine1}, ${shippingAddress.city}, ${shippingAddress.state}`
        },
        theme: {
          color: "#FFD700" // Gold color
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        setError("Payment failed: " + response.error.description);
        setSubmitting(false);
      });
      rzp1.open();
    } else if (paymentMethod === 'upi') {
      if (upiSubMethod === 'id' && !upiId) {
        setError("Please enter a valid UPI ID");
        setSubmitting(false);
        return;
      }
      setIsVerifying(true);
      setSubmitting(true);
      setTimeout(async () => {
        const payId = upiSubMethod === 'qr' ? `upi_qr_${Math.floor(100000 + Math.random() * 900000)}` : `upi_id_${upiId}`;
        const result = await placeOrder(shippingAddress, payId);
        setSubmitting(false);
        setIsVerifying(false);
        if (result.success) {
          setPlacedOrder(result.order);
          setStep(3);
        } else {
          setError(result.error);
        }
      }, 2500);
    }
  };

  const subtotal = getCartTotal();
  const shippingCost = 150.00;
  const orderTotal = subtotal + shippingCost;

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="flex-center" style={{ flexDirection: 'column', gap: '16px' }}>
          <ShoppingCart size={64} className="text-muted" strokeWidth={1} />
          <h2>Your cart is empty</h2>
          <p className="text-muted">You must add items to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate('/shop')} className="btn-primary" style={{ marginTop: '16px' }}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {step !== 3 ? (
        <div className="checkout-grid">
          {/* Form Wizard column */}
          <div className="checkout-card">
            {/* Step indicators */}
            <div className="checkout-steps">
              <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-num">1</span>
                <span className="step-label">Shipping</span>
              </div>
              <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-num">2</span>
                <span className="step-label">Payment</span>
              </div>
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem'
                }}
              >
                <ShieldAlert size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Shipping Address Form */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit}>
                <h3 style={{ marginBottom: '24px' }}>Shipping Address</h3>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Recipient's Name"
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="123 Heirloom Road, Suite A"
                    value={shippingAddress.addressLine1}
                    onChange={handleShippingChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Toytown"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State / Region</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Maharashtra"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Postal / Zip Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="400001"
                      value={shippingAddress.postalCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                      className="sort-select"
                      style={{ width: '100%', height: '45px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 16px' }}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}>
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* STEP 2: Payment Details Form */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3>Payment Information</h3>
                  <button type="button" onClick={() => setStep(1)} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={14} /> Back to Shipping
                  </button>
                </div>

                {/* Payment Method Selector */}
                <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '16px',
                      border: `2px solid ${paymentMethod === 'upi' ? 'var(--gold-bright)' : 'var(--border)'}`,
                      backgroundColor: paymentMethod === 'upi' ? 'rgba(201,168,76,0.1)' : 'var(--navy-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Smartphone size={24} color={paymentMethod === 'upi' ? 'var(--gold-bright)' : 'var(--txt-muted)'} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: paymentMethod === 'upi' ? 'var(--gold-bright)' : 'var(--txt-primary)' }}>UPI Payment</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--txt-muted)' }}>Scan QR or Pay with UPI App</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '16px',
                      border: `2px solid ${paymentMethod === 'razorpay' ? 'var(--gold-bright)' : 'var(--border)'}`,
                      backgroundColor: paymentMethod === 'razorpay' ? 'rgba(201,168,76,0.1)' : 'var(--navy-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Zap size={24} color={paymentMethod === 'razorpay' ? 'var(--gold-bright)' : 'var(--txt-muted)'} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: paymentMethod === 'razorpay' ? 'var(--gold-bright)' : 'var(--txt-primary)' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--txt-muted)' }}>Secure cards & Netbanking</div>
                    </div>
                  </button>
                </div>

                {/* Razorpay Card Form */}
                {paymentMethod === 'razorpay' && (
                  <>
                    {/* Premium Credit Card Graphic */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy-card) 100%)',
                        border: '1.5px solid var(--border-glow)',
                        color: '#fff',
                        padding: '24px',
                        borderRadius: '18px',
                        marginBottom: '32px',
                        boxShadow: 'var(--shadow-card)',
                        minHeight: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontFamily: '"Courier New", Courier, monospace',
                        letterSpacing: '0.15em',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>பொம்மைக் கடை</span>
                        <CreditCard size={32} strokeWidth={1.5} color="var(--gold-bright)" />
                      </div>
                      
                      {/* Card Number */}
                      <div style={{ fontSize: '1.25rem', textAlign: 'center', margin: '20px 0', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', color: 'var(--gold-pale)' }}>
                        {payment.cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--txt-muted)' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.55rem', opacity: 0.6, marginBottom: '2px' }}>Cardholder</span>
                          <span style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)', color: '#fff' }}>{payment.cardholderName || 'Cardholder Name'}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'block', fontSize: '0.55rem', opacity: 0.6, marginBottom: '2px' }}>Expires</span>
                          <span style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)', color: '#fff' }}>{payment.expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardholderName"
                        placeholder="John Doe"
                        value={payment.cardholderName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="4111 2222 3333 4444"
                        value={payment.cardNumber}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Expiration Date</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={payment.expiry}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV Security Code</label>
                        <input
                          type="password"
                          name="cvv"
                          placeholder="123"
                          value={payment.cvv}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div style={{
                    background: 'var(--navy-mid)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '24px',
                    marginBottom: '20px'
                  }}>
                    {/* UPI Subtabs */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setUpiSubMethod('qr')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          color: upiSubMethod === 'qr' ? 'var(--gold-bright)' : 'var(--txt-muted)',
                          background: upiSubMethod === 'qr' ? 'rgba(201,168,76,0.12)' : 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Scan QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiSubMethod('id')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          color: upiSubMethod === 'id' ? 'var(--gold-bright)' : 'var(--txt-muted)',
                          background: upiSubMethod === 'id' ? 'rgba(201,168,76,0.12)' : 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Enter UPI ID
                      </button>
                    </div>

                    {upiSubMethod === 'qr' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        {/* Dynamic UPI QR Code using public qr API */}
                        <div style={{
                          background: 'white',
                          padding: '16px',
                          borderRadius: '16px',
                          boxShadow: 'var(--shadow-glow)',
                          display: 'inline-block',
                          marginBottom: '16px',
                          border: '4px solid var(--gold)'
                        }}>
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=8084004747@ybl&pn=Bommai%20Kadai&am=${orderTotal}&cu=INR&tn=BK-${Date.now().toString().slice(-6)}`)}`}
                            alt="UPI QR Code"
                            style={{ display: 'block' }}
                          />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--txt-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '4px' }}>QR Code Expires In</span>
                          <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: '1.25rem', fontWeight: 800, color: timeLeft < 60 ? '#ff4d4d' : 'var(--gold-bright)' }}>
                            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                          </span>
                        </div>

                        {/* Mobile Deep Linking Intent Action */}
                        <div style={{ width: '100%', marginBottom: '20px' }}>
                          <a
                            href={`upi://pay?pa=8084004747@ybl&pn=Bommai%20Kadai&am=${orderTotal}&cu=INR&tn=BK-${Date.now().toString().slice(-6)}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '10px',
                              background: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
                              color: '#060917',
                              padding: '14px 24px',
                              borderRadius: '50px',
                              fontWeight: '700',
                              fontSize: '0.92rem',
                              textDecoration: 'none',
                              boxShadow: '0 8px 24px rgba(29,151,108,0.25)',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            <span>📱</span> Pay via UPI App (GPay/PhonePe/Paytm)
                          </a>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--txt-muted)', marginTop: '8px', lineHeight: 1.4 }}>
                            💡 Tip: If you are on mobile, tapping the button above will launch your installed UPI applications automatically with amount pre-filled!
                          </span>
                        </div>

                        {/* UPI App Icons Strip */}
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', margin: '8px 0 20px' }}>
                          <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} title="Google Pay">📱</span>
                          <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} title="PhonePe">💜</span>
                          <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} title="Paytm">💙</span>
                          <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} title="BHIM UPI">🇮🇳</span>
                        </div>

                        {isVerifying ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(201,168,76,0.08)', padding: '10px 20px', borderRadius: '50px', border: '1px dashed var(--gold)' }}>
                            <div style={{ width: '16px', height: '16px', border: '2px solid var(--border)', borderTopColor: 'var(--gold-bright)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 600 }}>Verifying scanner payment...</span>
                          </div>
                        ) : (
                          <p style={{ fontSize: '0.85rem', color: 'var(--txt-muted)', maxWidth: '280px', lineHeight: 1.6 }}>
                            Scan this QR code using any UPI app (GPay, PhonePe, Paytm) to complete payment.
                          </p>
                        )}
                      </div>
                    )}

                    {upiSubMethod === 'id' && (
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ color: 'var(--gold)' }}>Enter UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p style={{ fontSize: '0.78rem', color: 'var(--txt-muted)', marginTop: '8px' }}>
                          Provide your VPA/UPI address (e.g. mobile@ybl, name@okaxis) to trigger request.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
                  disabled={submitting}
                >
                  {submitting ? 'Processing Payment...' : `Pay ₹${orderTotal.toLocaleString('en-IN')}`}
                </button>
              </form>
            )}
          </div>

          {/* Right Summary Panel Column */}
          <div className="checkout-order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-items">
              {cart.map((item) => (
                <div className="summary-item" key={item.productId}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.name}
                  </div>
                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping (Flat Rate)</span>
                <span>₹{shippingCost.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <span>Total Amount</span>
                <span>₹{orderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STEP 3: Order Completed Success Card */
        <div className="order-success-card">
          <div className="success-icon-wrapper">
            <CheckCircle size={40} />
          </div>
          <h2>Thank You For Your Order!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Your transaction has completed successfully. We are preparing your toys for packaging and shipment.
          </p>
          
          {placedOrder && (
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                textAlign: 'left',
                margin: '10px 0'
              }}
            >
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>ORDER ID: {placedOrder._id}</span>
                <span>PAID: ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Deliver To:</strong> {placedOrder.shippingAddress.fullName}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {placedOrder.shippingAddress.addressLine1}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} {placedOrder.shippingAddress.postalCode}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => navigate('/orders')} className="btn-primary">
              View Order History
            </button>
            <button onClick={() => navigate('/shop')} className="btn-secondary">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
