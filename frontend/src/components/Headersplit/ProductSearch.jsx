import React from 'react';

export default function ProductSearch() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',  // Space between input and button
      padding: '10px',
      maxWidth: '600px',
      margin: '0 auto',  // Center align
    }}>
      <input
        type="text"
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: '16px',
          border: '2px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          transition: 'border 0.3s ease',
        }}
        placeholder="Search products..."
      />
      <button 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '8px 12px',
          backgroundColor: '#dc4352',  // Button background color
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
        }}
        
        onMouseOut={(e) => e.target.style.backgroundColor = '#dc4352'}  // Original color
      >
        <i className="fas fa-search" style={{ fontSize: '18px' }}></i>
        <span>Search</span>
      </button>
    </div>
  );
}
