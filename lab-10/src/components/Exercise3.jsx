import React, { useState, useEffect } from 'react';

const Exercise3 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Limit to 4 users to keep the UI clean and simple
        setUsers(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="exercise-section">
      <h2>Exercise 3: API Data Fetching</h2>
      
      {loading && <div className="loading">Loading data from API...</div>}
      
      {error && <div className="error-box">Error fetching data: {error}</div>}
      
      {!loading && !error && (
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h4>{user.name}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercise3;
