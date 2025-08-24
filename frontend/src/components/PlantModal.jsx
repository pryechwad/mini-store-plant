import React from 'react';

function PlantModal({ plant, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !plant) return null;

  const getPlantEmoji = (categories) => {
    if (categories.some(cat => cat.toLowerCase().includes('succulent'))) return '🌵';
    if (categories.some(cat => cat.toLowerCase().includes('flower'))) return '🌸';
    if (categories.some(cat => cat.toLowerCase().includes('herb'))) return '🌿';
    if (categories.some(cat => cat.toLowerCase().includes('tropical'))) return '🌴';
    return '🌱';
  };

  const getCareLevel = (categories) => {
    if (categories.some(cat => cat.toLowerCase().includes('low maintenance'))) return 'Easy Care';
    if (categories.some(cat => cat.toLowerCase().includes('succulent'))) return 'Very Easy';
    return 'Moderate Care';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }} onClick={onClose}>
      <div className="card card-glow" style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
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
            color: 'var(--text-dark)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent-green)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--glass-bg)';
            e.target.style.color = 'var(--text-dark)';
          }}
        >
          ×
        </button>

        {/* Plant Image */}
        <div style={{
          height: '350px',
          borderRadius: '1rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          background: 'var(--bg-secondary)'
        }}>
          {plant.image ? (
            <img 
              src={plant.image} 
              alt={plant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '1rem',
                background: 'white'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div style={{
            display: plant.image ? 'none' : 'flex',
            height: '100%',
            background: 'linear-gradient(135deg, var(--light-green) 0%, var(--sage-green) 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            borderRadius: '1rem'
          }}>
            <div className="floating">
              {getPlantEmoji(plant.categories)}
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            {plant.available ? '✅' : '❌'}
          </div>
        </div>

        {/* Plant Details */}
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: 'var(--primary-green)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {plant.name}
          </h2>

          {/* Price */}
          <div style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            ₹{plant.price}
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              color: 'var(--secondary-green)',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              🏷️ Categories
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {plant.categories.map((category, index) => (
                <span
                  key={index}
                  className="status-badge"
                  style={{
                    background: 'linear-gradient(135deg, var(--light-green), var(--sage-green))',
                    color: 'var(--primary-green)',
                    fontSize: '0.9rem'
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Care Level */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="status-badge" style={{
              background: 'var(--mint-green)',
              color: 'var(--forest-green)',
              fontSize: '1rem'
            }}>
              🌱 {getCareLevel(plant.categories)}
            </div>
          </div>

          {/* Description */}
          {plant.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{
                color: 'var(--secondary-green)',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                📝 Description
              </h4>
              <p style={{
                color: 'var(--text-dark)',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                {plant.description}
              </p>
            </div>
          )}

          {/* Care Instructions */}
          {plant.careInstructions && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{
                color: 'var(--secondary-green)',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                🌿 Care Instructions
              </h4>
              <p style={{
                color: 'var(--text-dark)',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                {plant.careInstructions}
              </p>
            </div>
          )}

          {/* Availability Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem'
          }}>
            <span className={`status-badge ${plant.available ? 'status-available' : 'status-unavailable'}`}>
              {plant.available ? '✓ In Stock' : '❌ Out of Stock'}
            </span>
            
            {plant.available && (
              <button 
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem'
                }}
                onClick={(e) => {
                  if (onAddToCart) {
                    onAddToCart(plant);
                  }
                  onClose();
                }}
              >
                🛒 Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantModal;