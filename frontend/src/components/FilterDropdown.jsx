import React from "react";

function FilterDropdown({ categories, selected, setSelected }) {
  return (
    <div style={{position: 'relative', width: '100%'}}>
      <div style={{
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-light)',
        fontSize: '1.1rem',
        pointerEvents: 'none'
      }}>
        🏷️
      </div>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="input"
        style={{
          width: '100%',
          paddingLeft: '2.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236c757d\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
          backgroundSize: '1rem',
          paddingRight: '3rem'
        }}
      >
        <option value="">🌿 All Categories</option>
        {categories.map((cat, idx) => {
          const getEmoji = (category) => {
            if (category.toLowerCase().includes('indoor')) return '🏠';
            if (category.toLowerCase().includes('outdoor')) return '🌳';
            if (category.toLowerCase().includes('succulent')) return '🌵';
            if (category.toLowerCase().includes('air')) return '💨';
            if (category.toLowerCase().includes('flower')) return '🌸';
            if (category.toLowerCase().includes('herb')) return '🌿';
            return '🌱';
          };
          
          return (
            <option key={idx} value={cat}>
              {getEmoji(cat)} {cat}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FilterDropdown;
