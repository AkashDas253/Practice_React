import React from 'react';
import './CalculatorHistory.css';

const CalculatorHistory = ({ history, onHistoryClick }) => {
  if (!history.length) return null;
  return (
    <div className="fixed-history">
      <h4>History</h4>
      <ul>
        {history.slice().reverse().map((item, idx) => (
          <li key={idx} className="fixed-history-item" onClick={() => onHistoryClick(item)} title="Click to append result">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculatorHistory;
