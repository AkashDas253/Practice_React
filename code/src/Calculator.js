import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString()); // For demo purposes only
    } catch {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {[1,2,3,4,5,6,7,8,9,0].map(num => (
          <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
        ))}
        {['+', '-', '*', '/'].map(op => (
          <button key={op} onClick={() => handleClick(op)}>{op}</button>
        ))}
        <button onClick={clearInput}>C</button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
