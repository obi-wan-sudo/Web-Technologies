import './App.css';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lab 9: React JS Basics</h1>
      </header>
      <main style={{width: '100%'}}>
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
      </main>
    </div>
  );
}

export default App;
