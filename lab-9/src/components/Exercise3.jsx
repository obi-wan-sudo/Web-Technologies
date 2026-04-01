import React, { useState } from 'react';

const Exercise3 = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCounter(prev => prev - 1);
  };

  return (
    <div className="exercise-container">
      <h2>Exercise 3: Counter System</h2>
      <div className="counter-container">
        <h3>Current Count: {counter}</h3>
        <div className="button-group">
          <button onClick={handleIncrement} className="btn primary">Increase</button>
          <button onClick={handleDecrement} className="btn secondary">Decrease</button>
        </div>
      </div>
    </div>
  );
};

export default Exercise3;
