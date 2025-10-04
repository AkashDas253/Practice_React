import React from 'react';

const CalculatorDisplay = React.forwardRef(({ input, error }, ref) => (
  <>
    <div className="display" ref={ref}>{input || '0'}</div>
    {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
  </>
));

export default CalculatorDisplay;
