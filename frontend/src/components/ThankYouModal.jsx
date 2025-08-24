import React from 'react';

function ThankYouModal({ isOpen, onClose, orderData }) {
  if (!isOpen || !orderData) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1004,
      animation: 'fadeIn 0.3s ease-out'
    }} onClick={onClose}>
      
      <div className="card card-glow" style={{
        maxWidth: '500px',
        width: '90%',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        animation: 'bounceIn 0.5s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Success Animation */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'bounce 1s ease-in-out infinite'
        }}>
          🎉
        </div>

        {/* Thank You Message */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--accent-green)',
          marginBottom: '0.5rem'
        }}>
          Payment Successful!
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-dark)',
          marginBottom: '1.5rem'
        }}>
          Your order has been confirmed and will be delivered soon
        </p>

        {/* Order Details */}
        <div style={{
          background: 'var(--glass-bg)',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
          textAlign: 'left'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Order ID:</span>
            <span style={{ fontWeight: '700', color: 'var(--secondary-green)' }}>{orderData.orderId}</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Items:</span>
            <span>{orderData.cartItems.length} plants</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Delivery to:</span>
            <span style={{ fontSize: '0.9rem', maxWidth: '200px', textAlign: 'right' }}>
              {orderData.address}
            </span>
          </div>
          
          {orderData.paymentMethod && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Payment:</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>
                {orderData.paymentMethod === 'card' ? '💳 Card' : 
                 orderData.paymentMethod === 'upi' ? '📱 UPI' :
                 orderData.paymentMethod === 'wallet' ? '👛 Wallet' : '💰 COD'} ✓
              </span>
            </div>
          )}
          
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>
              Total Amount:
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-green)' }}>
              ₹{orderData.total}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem'
          }}
          onClick={onClose}
        >
          🛍️ Continue Shopping
        </button>

        {/* Delivery Info */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(127, 176, 105, 0.1)',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-dark)'
        }}>
          🚚 Expected delivery: 2-3 business days
        </div>
      </div>
    </div>
  );
}

export default ThankYouModal;