import React from "react";

function PlantCard({ plant, onClick, onAddToCart }) {
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
    <div 
      className="card card-glow p-4 slide-in-up" 
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={() => onClick && onClick(plant)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow)';
      }}
    >
      {/* Plant Image */}
      <div style={{
        height: '200px',
        borderRadius: '1rem',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <img 
          src={plant.image || 'https://via.placeholder.com/300x200?text=Plant+Image'} 
          alt={plant.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1rem'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Plant+Image';
          }}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem'
        }}>
          {plant.available ? '✅' : '❌'}
        </div>
        <div className="bounce" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          borderRadius: '0.5rem',
          padding: '0.25rem 0.5rem',
          fontSize: '1.2rem',
          animation: 'bounce 2s infinite'
        }}>
          {getPlantEmoji(plant.categories)}
        </div>
      </div>

      {/* Plant Info */}
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
          minHeight: '2.4rem'
        }}>
          {plant.name}
        </h3>

        {/* Price */}
        <div style={{
          fontSize: '1.4rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          ₹{plant.price}
        </div>

        {/* Categories */}
        <div style={{marginBottom: '1rem'}}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {plant.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="status-badge"
                style={{
                  background: 'linear-gradient(135deg, var(--light-green), var(--sage-green))',
                  color: 'var(--primary-green)',
                  fontSize: '0.8rem'
                }}
              >
                {category}
              </span>
            ))}
            {plant.categories.length > 2 && (
              <span className="status-badge" style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-light)',
                fontSize: '0.8rem'
              }}>
                +{plant.categories.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Care Level */}
        <div className="status-badge" style={{
          background: 'var(--mint-green)',
          color: 'var(--forest-green)',
          marginBottom: '1rem',
          alignSelf: 'flex-start'
        }}>
          🌱 {getCareLevel(plant.categories)}
        </div>

        {/* Description */}
        {plant.description && (
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-light)',
            lineHeight: '1.5',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {plant.description}
          </p>
        )}

        {/* Availability Status & Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <span className={`status-badge ${plant.available ? 'status-available' : 'status-unavailable'}`}>
            {plant.available ? '✓ In Stock' : '❌ Out of Stock'}
          </span>
          
          {plant.available && (
            <button 
              className="btn btn-primary"
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.9rem',
                borderRadius: '0.5rem'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) {
                  onAddToCart(plant);
                }
              }}
            >
              🛒 Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlantCard;