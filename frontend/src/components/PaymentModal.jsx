import React, { useState } from 'react';

function PaymentModal({ isOpen, onClose, orderData, onPaymentSuccess, onShowNotification }) {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !orderData) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show notification
      if (onShowNotification) {
        onShowNotification({
          message: `🎉 Order placed successfully! Thank you for shopping with us.`,
          type: 'success'
        });
      }
      
      // Small delay before showing thank you modal
      setTimeout(() => {
        onClose();
        if (onPaymentSuccess) {
          onPaymentSuccess({ ...orderData, paymentMethod: selectedPayment });
        }
      }, 500);
    }, 3000);
  };

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
      zIndex: 1005,
      animation: 'fadeIn 0.3s ease-out'
    }} onClick={!isProcessing ? onClose : undefined}>
      
      <div className="card card-glow" style={{
        maxWidth: '500px',
        width: '90%',
        padding: '2rem',
        position: 'relative',
        animation: 'bounceIn 0.5s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: 'var(--primary-green)',
            margin: 0
          }}>
            💳 Payment
          </h2>
          
          {!isProcessing && (
            <button
              onClick={onClose}
              style={{
                background: 'var(--glass-bg)',
                border: '2px solid var(--border-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: 'var(--text-dark)'
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'var(--glass-bg)',
          padding: '1rem',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Order ID:</span>
            <span style={{ fontWeight: '600' }}>{orderData.orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>Amount to Pay:</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-green)' }}>
              ₹{orderData.total}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-dark)',
            marginBottom: '1rem'
          }}>
            Select Payment Method
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'card', icon: '💳', label: 'Credit/Debit Card' },
              { id: 'upi', icon: '📱', label: 'UPI Payment' },
              { id: 'wallet', icon: '👛', label: 'Digital Wallet' },
              { id: 'cod', icon: '💰', label: 'Cash on Delivery' }
            ].map(method => (
              <div
                key={method.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: selectedPayment === method.id ? 'rgba(127, 176, 105, 0.1)' : 'var(--glass-bg)',
                  border: selectedPayment === method.id ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedPayment(method.id)}
              >
                <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{method.label}</span>
                <div style={{
                  marginLeft: 'auto',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '2px solid var(--accent-green)',
                  background: selectedPayment === method.id ? 'var(--accent-green)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedPayment === method.id && (
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <button 
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            opacity: isProcessing ? 0.7 : 1,
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
              {' '}Processing Payment...
            </>
          ) : (
            `🚀 Pay ₹${orderData.total}`
          )}
        </button>

        {/* Security Info */}
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-light)'
        }}>
          🔒 Your payment information is secure and encrypted
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;