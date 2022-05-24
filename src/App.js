import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyCoupon from './pages/MyCoupon'
import { Routes, Route, Link} from 'react-router-dom'



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/SignUp" element={ <SignUp /> } />
        <Route path="/Profile" element={ <Profile /> } />
        <Route path="/MyCoupon" element={ <MyCoupon /> } />
      </Routes>
      
    </div>
  );
}

export default App;
