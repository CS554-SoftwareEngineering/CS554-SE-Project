import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import GameScreen from './components/GameScreen/GameScreen'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>

    </div>
  );
}

export default App;
