import React from 'react';

function Toast({ message, isVisible, onClose, type = 'success' }) {

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '✅';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? 'var(--accent-green)' : 'var(--error-color, #ff4444)',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      animation: 'slideInRight 0.3s ease-out',
      cursor: 'pointer'
    }} onClick={onClose}>
      <span>{getIcon()}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer',
          padding: '0',
          marginLeft: '0.5rem'
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Toast;