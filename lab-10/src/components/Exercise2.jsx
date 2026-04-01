import React, { useState } from 'react';

const Exercise2 = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, { id: Date.now(), text: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="exercise-section">
      <h2>Exercise 2: Dynamic Task List</h2>
      <div className="input-group row-group">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter a new task..."
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button onClick={handleAddItem} className="btn btn-success">Add item</button>
      </div>
      
      {items.length === 0 ? (
        <p className="empty-state">No items in the list. Add one above!</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="list-item">
              <span>{item.text}</span>
              <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger btn-small">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Exercise2;
