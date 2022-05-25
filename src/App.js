import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyCoupon from './pages/MyCoupon'
import CreateTest from './pages/CreateTest'
import TestList from './pages/TestList'
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
        <Route path="/CreateTest" element={ <CreateTest /> } />
        <Route path="/TestList" element={ <TestList /> } />

      </Routes>
      
    </div>
  );
}

export default App;
