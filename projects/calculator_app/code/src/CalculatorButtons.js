import React from 'react';

const CalculatorButtons = ({ buttons, onClick }) => (
  <div className="buttons">
    {buttons.map((btn) => (
      <button key={btn} onClick={() => onClick(btn)}>{btn}</button>
    ))}
  </div>
);

export default CalculatorButtons;
