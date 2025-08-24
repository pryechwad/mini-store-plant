import React from 'react';

function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  const sizes = {
    small: '2rem',
    medium: '3rem',
    large: '4rem'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      gap: '1rem'
    }}>
      <div style={{
        width: sizes[size],
        height: sizes[size],
        border: '4px solid var(--border-color)',
        borderTop: '4px solid var(--secondary-green)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{
        color: 'var(--text-light)',
        fontSize: '1rem',
        fontWeight: '500'
      }}>
        {message}
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;