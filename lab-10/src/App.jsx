import './App.css';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';

function App() {
  return (
    <>
      <div className="header-container">
        <h1>Lab 10: React JS Advanced</h1>
      </div>
      <main>
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
      </main>
    </>
  );
}

export default App;
