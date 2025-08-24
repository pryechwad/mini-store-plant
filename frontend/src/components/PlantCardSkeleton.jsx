import React from 'react';

function PlantCardSkeleton() {
  return (
    <div className="card p-4 loading">
      <div style={{
        height: '200px',
        background: 'var(--bg-secondary)',
        borderRadius: '1rem',
        marginBottom: '1.5rem'
      }}></div>
      <div style={{
        height: '24px',
        background: 'var(--bg-secondary)',
        borderRadius: '0.5rem',
        marginBottom: '0.75rem'
      }}></div>
      <div style={{
        height: '20px',
        background: 'var(--bg-secondary)',
        borderRadius: '0.5rem',
        marginBottom: '0.75rem',
        width: '60%'
      }}></div>
      <div style={{
        height: '16px',
        background: 'var(--bg-secondary)',
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}></div>
      <div style={{
        height: '36px',
        background: 'var(--bg-secondary)',
        borderRadius: '0.5rem'
      }}></div>
    </div>
  );
}

export default PlantCardSkeleton;