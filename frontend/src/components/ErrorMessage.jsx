import React from 'react';

function ErrorMessage({ 
  message = 'Something went wrong', 
  onRetry = null, 
  showIcon = true 
}) {
  return (
    <div className="card card-glow p-4" style={{
      textAlign: 'center',
      background: 'linear-gradient(135deg, #ffcdd2, #ffab91)',
      border: '2px solid var(--earth-brown)',
      maxWidth: '500px',
      margin: '2rem auto'
    }}>
      {showIcon && (
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          ⚠️
        </div>
      )}
      <h3 style={{
        color: 'var(--earth-brown)',
        fontSize: '1.3rem',
        fontWeight: '600',
        marginBottom: '1rem'
      }}>
        Oops! Something went wrong
      </h3>
      <p style={{
        color: 'var(--earth-brown)',
        fontSize: '1rem',
        marginBottom: onRetry ? '1.5rem' : '0',
        opacity: 0.8
      }}>
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn"
          style={{
            background: 'var(--earth-brown)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;