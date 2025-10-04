import React, { useState, useRef, useEffect } from 'react';
import './Calculator.css';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';

const buttons = [
  '()',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C', '√', '%'
];

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [sqrtMode, setSqrtMode] = useState(false);
  const displayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((/[0-9.+\-*/%]/).test(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === 'c' || e.key === 'C') {
        clearInput();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClick = (value) => {
    if (value === 'C') {
      clearInput();
      setSqrtMode(false);
    } else if (value === '=') {
      calculate();
    } else if (value === '√') {
      if (input) {
        setInput(`√(${input})`);
      } else {
        setInput('√(');
      }
      setError('');
    } else if (value === '()') {
      // Count open and close braces
      const openCount = (input.match(/\(/g) || []).length;
      const closeCount = (input.match(/\)/g) || []).length;
      const lastChar = input[input.length - 1];
      // If open braces <= close braces or last char is operator or empty, add '('
      if (openCount <= closeCount || /[+\-*/(]/.test(lastChar) || !input) {
        setInput(input + '(');
      } else {
        // Otherwise, add ')'
        setInput(input + ')');
      }
      setError('');
    } else if (value === '%') {
      try {
        let result;
        let expr = input.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
        if (expr) {
          result = eval(expr) / 100;
          setHistory([...history, `${input} % = ${result}`]);
          setInput(result.toString());
          setError('');
        }
      } catch {
        setError('Invalid input for %');
        setSqrtMode(false);
      }
    } else {
      setInput(input + value);
      setError('');
    }
  };

  const calculate = () => {
    try {
      let expr = input.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
      // Only allow valid characters
      if (!/^[-+*/%.0-9() Math.sqrt]+$/.test(expr)) {
        throw new Error('Invalid characters');
      }
      // eslint-disable-next-line no-eval
      let result = eval(expr);
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
      setError('');
      setSqrtMode(false);
    } catch {
      setError('Error: Invalid Expression');
      setSqrtMode(false);
    }
  };

  const clearInput = () => {
    setInput('');
    setError('');
    setSqrtMode(false);
  };

  return (
    <div className="calculator-layout">
      <div className="calculator-main">
        <CalculatorDisplay input={input} error={error} ref={displayRef} />
        <CalculatorButtons buttons={buttons} onClick={handleClick} />
      </div>
      <div className="calculator-sidebar">
        <CalculatorHistory history={history} onHistoryClick={val => setInput(input + val.split(' = ')[1])} />
      </div>
    </div>
  );
};

export default Calculator;
