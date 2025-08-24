import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
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
        🔍
      </div>
      <input
        type="text"
        placeholder="Search for plants, categories, or care types..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
        style={{
          width: '100%',
          paddingLeft: '2.5rem',
          fontSize: '1rem'
        }}
      />
    </div>
  );
}

export default SearchBar;
