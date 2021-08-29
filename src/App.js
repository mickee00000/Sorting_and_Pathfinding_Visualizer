import './App.css';
import SortingVisualizer from './sortingVisual/ArrayChart';
import NavigationBar from './sortingVisual/NavigationBar';


function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
