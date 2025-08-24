import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <nav style={{
      position: 'sticky',
      top: '0.5rem',
      zIndex: 1000,
      margin: '0.5rem 1rem',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '2rem',
      border: '1px solid var(--border-color)',
      boxShadow: '0 8px 32px var(--shadow), inset 0 1px 0 rgba(255,255,255,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(167, 201, 87, 0.05), transparent)',
        animation: 'shimmer 3s infinite'
      }}></div>
      
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div className="flex" style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem'
        }}>
          <Link to="/" className="fade-in" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem',
            borderRadius: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(167, 201, 87, 0.1)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div className="floating wiggle" style={{
                fontSize: '2.5rem',
                filter: 'drop-shadow(0 4px 8px var(--shadow))',
                position: 'relative',
                zIndex: 1,
                cursor: 'pointer'
              }}>🌿</div>
              <div style={{
                position: 'absolute',
                width: '3rem',
                height: '3rem',
                background: 'radial-gradient(circle, rgba(167, 201, 87, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
            </div>
            <div>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, var(--primary-green), var(--accent-green))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                letterSpacing: '-0.5px'
              }}>
                Mini Plant Store
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-light)',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                ✨ Your Green Corner
              </div>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '2px solid var(--border-color)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-dark)'
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className="flex gap-1 desktop-nav" style={{alignItems: 'center'}}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '1.5rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                background: location.pathname === '/' ? 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))' : 'transparent',
                color: location.pathname === '/' ? 'white' : 'var(--text-dark)',
                border: location.pathname === '/' ? 'none' : '2px solid transparent',
                boxShadow: location.pathname === '/' ? '0 4px 15px rgba(127, 176, 105, 0.3)' : 'none'
              }}
            >
              🌱 Store
            </Link>
            
            <Link
              to="/admin"
              style={{
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '1.5rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                background: location.pathname === '/admin' ? 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))' : 'transparent',
                color: location.pathname === '/admin' ? 'white' : 'var(--text-dark)',
                border: location.pathname === '/admin' ? 'none' : '2px solid transparent',
                boxShadow: location.pathname === '/admin' ? '0 4px 15px rgba(127, 176, 105, 0.3)' : 'none'
              }}
            >
              ⚙️ Admin
            </Link>
            
            <button
              onClick={toggleTheme}
              className="wiggle"
              style={{
                background: 'linear-gradient(135deg, var(--glass-bg), var(--bg-primary))',
                backdropFilter: 'blur(10px)',
                border: '2px solid var(--border-color)',
                borderRadius: '50%',
                width: '3.5rem',
                height: '3.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                marginLeft: '0.5rem'
              }}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(180deg)';
                e.target.style.animation = 'glow 1s ease-in-out infinite';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.animation = 'none';
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mobile-nav" style={{
            display: 'none',
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  padding: '1rem',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textAlign: 'center',
                  background: location.pathname === '/' ? 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))' : 'transparent',
                  color: location.pathname === '/' ? 'white' : 'var(--text-dark)',
                  border: location.pathname === '/' ? 'none' : '2px solid var(--border-color)'
                }}
              >
                🌱 Store
              </Link>
              
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  padding: '1rem',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textAlign: 'center',
                  background: location.pathname === '/admin' ? 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))' : 'transparent',
                  color: location.pathname === '/admin' ? 'white' : 'var(--text-dark)',
                  border: location.pathname === '/admin' ? 'none' : '2px solid var(--border-color)'
                }}
              >
                ⚙️ Admin
              </Link>
              
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, var(--glass-bg), var(--bg-primary))',
                  border: '2px solid var(--border-color)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: 'var(--text-dark)'
                }}
              >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;