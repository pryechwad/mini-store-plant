import React, { useState, useEffect } from 'react';

function TestimonialsSlider() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mumbai, India",
      rating: 5,
      text: "Amazing quality plants! My Monstera arrived in perfect condition and has been thriving for months. The care instructions were so helpful!",
      avatar: "👩‍🦰",
      plant: "🌿"
    },
    {
      id: 2,
      name: "Raj Patel",
      location: "Delhi, India",
      text: "Mini Plant Store transformed my apartment into a jungle oasis. Fast delivery and excellent customer service. Highly recommended!",
      rating: 5,
      avatar: "👨‍💼",
      plant: "🌱"
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Bangalore, India",
      text: "Perfect for beginners! The low-maintenance plants I ordered are still alive and beautiful after 6 months. Great selection!",
      rating: 5,
      avatar: "👩‍💻",
      plant: "🌵"
    },
    {
      id: 4,
      name: "Michael Chen",
      location: "Pune, India",
      text: "The air-purifying plants have made such a difference in my home office. Quality plants with detailed care guides. Love it!",
      rating: 5,
      avatar: "👨‍🎓",
      plant: "🌸"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="card card-glow p-4" style={{
      background: 'linear-gradient(135deg, var(--glass-bg) 0%, var(--bg-primary) 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '300px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--primary-green)',
          marginBottom: '0.5rem'
        }}>
          💚 Happy Plant Parents
        </h3>
        <p style={{
          color: 'var(--text-light)',
          fontSize: '1.1rem',
          opacity: 0.8
        }}>
          See what our customers say about their Mini Plant Store experience
        </p>
      </div>

      {/* Testimonials */}
      <div style={{
        position: 'relative',
        height: '200px',
        overflow: 'hidden'
      }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentTestimonial ? 1 : 0,
              transform: `translateX(${index === currentTestimonial ? '0' : '20px'})`,
              transition: 'all 0.8s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            {/* Avatar */}
            <div style={{
              marginBottom: '1rem'
            }}>
              <div style={{
                fontSize: '3rem',
                filter: 'drop-shadow(0 2px 4px var(--shadow))'
              }}>
                {testimonial.avatar}
              </div>
            </div>

            {/* Stars */}
            <div style={{
              display: 'flex',
              gap: '0.25rem',
              marginBottom: '1rem'
            }}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={{
                  color: '#ffd700',
                  fontSize: '1.2rem'
                }}>
                  ⭐
                </span>
              ))}
            </div>

            {/* Testimonial Text */}
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-dark)',
              lineHeight: '1.6',
              marginBottom: '1rem',
              fontStyle: 'italic',
              maxWidth: '600px'
            }}>
              "{testimonial.text}"
            </p>

            {/* Name and Location */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--secondary-green)',
                marginBottom: '0.25rem'
              }}>
                {testimonial.name}
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-light)'
              }}>
                📍 {testimonial.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginTop: '1rem'
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: `2px solid ${index === currentTestimonial ? 'var(--secondary-green)' : 'var(--border-color)'}`,
              background: index === currentTestimonial ? 'var(--secondary-green)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSlider;