import React, {  useState } from 'react';

function CartModal({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem, onProceedToPayment }) {
  const [address, setAddress] = useState('Add delivery address');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 199 ? 0 : 40;
  const total = subtotal + deliveryFee;

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
      zIndex: 1003,
      animation: 'fadeIn 0.3s ease-out'
    }} onClick={onClose}>
      
      <div className="card card-glow" style={{
        maxWidth: '600px',
        width: '95%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '1.5rem',
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
            🛒 Your Cart
          </h2>
          
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
        </div>

        {/* Delivery Address */}
        <div style={{
          background: 'var(--glass-bg)',
          padding: '1rem',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
          cursor: 'pointer'
        }} onClick={() => setAddress(prompt('Enter delivery address:', address) || address)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0 }}>Delivery to</h4>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark)', margin: 0 }}>
                {address}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-light)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some plants to get started!</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'var(--glass-bg)',
                  borderRadius: '1rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/60x60?text=🌱'} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--text-dark)',
                      marginBottom: '0.25rem'
                    }}>
                      {item.name}
                    </h4>
                    <p style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: 'var(--secondary-green)',
                      margin: 0
                    }}>
                      ₹{item.price}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--accent-green)',
                    borderRadius: '0.5rem',
                    padding: '0.25rem'
                  }}>
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => {
                        if (item.quantity === 1) {
                          onRemoveItem && onRemoveItem(item._id);
                        } else {
                          onUpdateQuantity && onUpdateQuantity(item._id, item.quantity - 1);
                        }
                      }}
                    >
                      {item.quantity === 1 ? '🗑️' : '−'}
                    </button>
                    
                    <span style={{
                      color: 'white',
                      fontWeight: '600',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div style={{
              background: 'var(--glass-bg)',
              padding: '1rem',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-dark)',
                marginBottom: '1rem'
              }}>
                📊 Bill Details
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>MRP (included all taxes)</span>
                  <span style={{ fontWeight: '600' }}>₹{subtotal}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Delivery fee</span>
                  <span style={{ fontWeight: '600', color: deliveryFee === 0 ? 'var(--accent-green)' : 'var(--text-dark)' }}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                
                {subtotal < 199 && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-green)',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: 'rgba(127, 176, 105, 0.1)',
                    borderRadius: '0.5rem'
                  }}>
                    🎁 Add ₹{199 - subtotal} more for FREE delivery
                  </div>
                )}
                
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.5rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>To pay</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-green)' }}>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem'
              }}
              onClick={() => {
                onClose();
                if (onProceedToPayment) {
                  const orderId = `MPL${Date.now().toString().slice(-6)}`;
                  onProceedToPayment({ cartItems, total, address, orderId });
                }
              }}
            >
              🚀 Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;