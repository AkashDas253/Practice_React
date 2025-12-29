import React, { useState, useRef, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';

const buttons = [
  '()', '√', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'C', '0', '.', '='
];

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const displayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((/[0-9.+\-*/%]/).test(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        clearInput();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  const handleClick = (value) => {
    setError('');
    if (value === 'C') {
      clearInput();
    } else if (value === '=') {
      calculate();
    } else if (value === '√') {
      const lastChar = input[input.length - 1];
      if (input && /[0-9)]/.test(lastChar)) {
        setInput(input + '*sqrt(');
      } else {
        setInput(input + 'sqrt(');
      }
    } else if (value === '()') {
      const openCount = (input.match(/sqrt\(|\(/g) || []).length;
      const closeCount = (input.match(/\)/g) || []).length;
      const lastChar = input[input.length - 1];

      if (openCount <= closeCount || /[+\-*/(]/.test(lastChar) || !input) {
        setInput(input + '(');
      } else {
        setInput(input + ')');
      }
    } else if (value === '%') {
      setInput(input + '/100');
    } else {
      setInput(input + value);
    }
  };

  const calculate = () => {
    try {
      if (!input) return;
      
      let expression = input;
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      
      if (openCount > closeCount) {
        expression += ')'.repeat(openCount - closeCount);
      }

      const result = evaluate(expression);
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
    } catch (err) {
      setError('Invalid Expression');
    }
  };

  const clearInput = () => {
    setInput('');
    setError('');
  };

  return (
    <div className="calculator-layout">
      <div className="calculator-main">
        <CalculatorDisplay input={input} error={error} ref={displayRef} />
        <CalculatorButtons buttons={buttons} onClick={handleClick} />
      </div>
      <div className="calculator-sidebar">
        <CalculatorHistory 
          history={history} 
          onHistoryClick={val => setInput(input + val.split(' = ')[1])} 
        />
      </div>
    </div>
  );
};

export default Calculator;