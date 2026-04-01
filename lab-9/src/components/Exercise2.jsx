import React from 'react';

const StudentCard = ({ name, department, marks }) => {
  return (
    <div className="student-card">
      <h4>{name}</h4>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Marks:</strong> {marks}</p>
    </div>
  );
};

const Exercise2 = () => {
  const students = [
    { id: 1, name: 'Alice Smith', department: 'Computer Science', marks: 85 },
    { id: 2, name: 'Bob Jones', department: 'Data Science', marks: 92 },
    { id: 3, name: 'Charlie Brown', department: 'Information Technology', marks: 78 }
  ];

  return (
    <div className="exercise-container">
      <h2>Exercise 2: Student Cards</h2>
      <div className="cards-container">
        {students.map(student => (
          <StudentCard 
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
};

export default Exercise2;
