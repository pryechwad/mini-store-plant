import React from 'react';

function Footer() {
  return (
    <footer className="card" style={{
      margin: '3rem 1rem 1rem',
      borderRadius: '1rem',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)',
        color: 'var(--warm-white)',
        padding: '4rem 0',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
        }}></div>
        <div className="container" style={{position: 'relative', zIndex: 1}}>
          
          <div className="text-center" style={{marginBottom: '3rem'}}>
            <div className="floating" style={{fontSize: '4rem', marginBottom: '1rem'}}>🌿</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              <span style={{fontSize: '2rem', fontWeight: '800'}}>Mini</span>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>🌱 Plant 🌱</div>
              <span style={{fontSize: '2rem', fontWeight: '800'}}>Store</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              fontSize: '1.1rem',
              opacity: 0.9
            }}>
              <span>🏠 Transform Spaces</span>
              <span>•</span>
              <span>💨 Purify Air</span>
              <span>•</span>
              <span>💚 Live Green</span>
            </div>
          </div>

          <div className="grid grid-4 mb-4">
            <div className="card slide-in-up" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div className="bounce" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🌱</div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>Fresh Plants</h4>
              <div style={{fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4'}}>
                Hand-picked • Certified • Healthy
              </div>
            </div>
            <div className="card slide-in-up" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animationDelay: '0.1s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div className="wiggle" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🚚</div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>Fast Delivery</h4>
              <div style={{fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4'}}>
                Same Day • Secure • City Wide
              </div>
            </div>
            <div className="card slide-in-up" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animationDelay: '0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div className="heartbeat" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>💚</div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>Expert Care</h4>
              <div style={{fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4'}}>
                24/7 Support • Care Guides • Tips
              </div>
            </div>
            <div className="card slide-in-up" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animationDelay: '0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div className="floating" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🌍</div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>Eco-Friendly</h4>
              <div style={{fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4'}}>
                Sustainable • Biodegradable • Green
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>📞</span>
              <div>
                <div style={{fontSize: '0.8rem', opacity: 0.8}}>Call Us</div>
                <div style={{fontWeight: '600'}}>+91 1234567897</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>📧</span>
              <div>
                <div style={{fontSize: '0.8rem', opacity: 0.8}}>Email</div>
                <div style={{fontWeight: '600'}}>hello@miniplantstore.com</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>📍</span>
              <div>
                <div style={{fontSize: '0.8rem', opacity: 0.8}}>Serving</div>
                <div style={{fontWeight: '600'}}>Mumbai • Delhi • Bangalore</div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{fontSize: '1rem', opacity: 0.9}}>© 2025 Mini Plant Store</span>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.9rem'
              }}>
                Made with 💚 for plant lovers
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              fontSize: '0.85rem',
              opacity: 0.7,
              flexWrap: 'wrap'
            }}>
              <span>🌿 Transform Your Space</span>
              <span>•</span>
              <span>🫁 Breathe Better Air</span>
              <span>•</span>
              <span>🌱 Live Greener Life</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;