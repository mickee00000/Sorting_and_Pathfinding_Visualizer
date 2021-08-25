import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './sortingVisual/sortViz';
import NavigationBar from './sortingVisual/NavigationBar';


function App() {
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default App;
