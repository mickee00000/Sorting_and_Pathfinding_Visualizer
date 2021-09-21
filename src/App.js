import './App.css';
import { ArrayChart } from './components/ArrayChart';
import { NavigationBar } from './components/NavigationBar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ArrayChart/>
        <NavigationBar/>
      </header>
    </div>
  );
}

export default App;
