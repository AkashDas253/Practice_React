import React from 'react';

const CalculatorButtons = ({ buttons, onClick }) => {
  return (
    <div className="buttons">
      {buttons.map((btn) => (
        <button 
          key={btn} 
          onClick={() => onClick(btn)}
          className={`btn-${btn === '=' ? 'equals' : 'default'}`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;