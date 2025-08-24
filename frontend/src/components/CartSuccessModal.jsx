import React from 'react';

function CartSuccessModal({ isOpen, onClose, plant, onViewCart }) {

  if (!isOpen || !plant) return null;

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
      zIndex: 1002,
      animation: 'fadeIn 0.3s ease-out'
    }} onClick={onClose}>
      
      <div className="card card-glow" style={{
        maxWidth: '400px',
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
          ✅
        </div>

        {/* Success Message */}
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'var(--accent-green)',
          marginBottom: '1rem'
        }}>
          Added to Cart!
        </h2>

        {/* Plant Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--glass-bg)',
          padding: '1rem',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
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
              src={plant.image || 'https://via.placeholder.com/60x60?text=🌱'} 
              alt={plant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              width: '100%',
              height: '100%',
              background: 'var(--light-green)',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🌱
            </div>
          </div>
          
          <div style={{ textAlign: 'left', flex: 1 }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--text-dark)',
              marginBottom: '0.25rem'
            }}>
              {plant.name}
            </h4>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--secondary-green)',
              margin: 0
            }}>
              ₹{plant.price}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button 
            className="btn"
            style={{
              background: 'var(--glass-bg)',
              color: 'var(--text-dark)',
              border: '2px solid var(--border-color)',
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
            onClick={onClose}
          >
            Continue Shopping
          </button>
          
          <button 
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem'
            }}
            onClick={() => {
              onClose();
              if (onViewCart) {
                onViewCart();
              }
            }}
          >
            🛒 View Cart
          </button>
        </div>


      </div>
    </div>
  );
}

export default CartSuccessModal;