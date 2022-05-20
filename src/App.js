import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/SignUp" element={ <SignUp /> } />
      </Routes>
      
    </div>
  );
}

export default App;
