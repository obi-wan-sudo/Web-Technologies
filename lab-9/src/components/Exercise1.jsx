import React from 'react';

const Exercise1 = () => {
  const student = {
    name: 'John Doe',
    department: 'Software Engineering',
    year: '3rd Year',
    section: 'A'
  };

  return (
    <div className="exercise-container">
      <h2>Exercise 1: Student Profile</h2>
      <div className="profile-card">
        <h3>{student.name}</h3>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Section:</strong> {student.section}</p>
      </div>
    </div>
  );
};

export default Exercise1;
