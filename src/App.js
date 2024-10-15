import logo from './logo.svg';
//import './App.css';
//import './input.css';
import Header from './components/header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
     
    </div>
    </Router>

  );
}

export default App;
