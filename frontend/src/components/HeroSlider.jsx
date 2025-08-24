import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDark } = useTheme();

  const slides = [
    {
      id: 1,
      title: "Beautiful Plant Pots",
      subtitle: "Ceramic & Terracotta Pots ₹149+",
      description: "Stylish pots perfect for your green friends",
      background: "linear-gradient(rgba(45, 80, 22, 0.7), rgba(74, 124, 89, 0.7)), url('https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&h=600&fit=crop')",
      features: ["🏺 Premium Pots", "🌿 Plant Ready", "✨ Stylish Design"]
    },
    {
      id: 2,
      title: "Indoor Collection",
      subtitle: "Monstera ₹599 | Snake Plant ₹299",
      description: "Air-purifying plants for your home",
      background: "linear-gradient(rgba(127, 176, 105, 0.7), rgba(143, 188, 143, 0.7)), url('https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&h=600&fit=crop')",
      features: ["🏠 Ready Plants", "📜 Care Guide", "📞 Support"]
    },
    {
      id: 3,
      title: "Succulents & Herbs",
      subtitle: "Aloe ₹199 | Basil ₹99 | Jade ₹249",
      description: "Low-maintenance & medicinal plants",
      background: "linear-gradient(rgba(143, 188, 143, 0.7), rgba(167, 201, 87, 0.7)), url('https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=1200&h=600&fit=crop')",
      features: ["💵 Budget-Friendly", "🌿 Medicinal", "📦 Secure"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container" style={{
      height: 'clamp(400px, 50vh, 500px)',
      marginBottom: '2rem',
      boxShadow: '0 20px 40px var(--shadow)'
    }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: slide.background,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDark ? 'var(--warm-white)' : 'var(--text-dark)'
          }}
        >
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }}></div>

          {/* Content */}
          <div className="container" style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            padding: '2rem 1rem',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>

            
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '800',
              marginBottom: '0.75rem',
              textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.8)' : '0 2px 4px rgba(255,255,255,0.8)',
              color: isDark ? 'var(--warm-white)' : 'var(--primary-green)',
              lineHeight: '1.2',
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}>
              {slide.title}
            </h1>
            
            <h2 style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              fontWeight: '600',
              marginBottom: '1rem',
              color: isDark ? 'var(--light-green)' : 'var(--secondary-green)',
              textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.8)',
              lineHeight: '1.3',
              wordWrap: 'break-word'
            }}>
              {slide.subtitle}
            </h2>
            
            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              marginBottom: '1.5rem',
              color: isDark ? 'var(--warm-white)' : 'var(--text-dark)',
              textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.8)',
              maxWidth: '90%',
              margin: '0 auto 1.5rem',
              padding: '0 0.5rem',
              lineHeight: '1.4',
              wordWrap: 'break-word'
            }}>
              {slide.description}
            </p>

            {/* Features */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(0.5rem, 2vw, 1.5rem)',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
              maxWidth: '100%'
            }}>
              {slide.features.map((feature, idx) => (
                <div key={idx} style={{
                  background: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                  borderRadius: '1.5rem',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                  fontWeight: '600',
                  color: isDark ? 'var(--warm-white)' : 'var(--primary-green)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.5)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}>
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '100%'
            }}>
              <button 
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--primary-green)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '700',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => document.getElementById('plants-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🛍️ Shop Now
              </button>
              <button 
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--warm-white)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => document.getElementById('plants-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🌱 View Collection
              </button>
            </div>
          </div>
        </div>
      ))}



      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--warm-white)',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--warm-white)',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.75rem'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              background: index === currentSlide ? 'var(--warm-white)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;