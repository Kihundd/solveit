import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyCoupon from './pages/MyCoupon'
import CreateTest from './pages/CreateTest'
import TestList from './pages/TestList'
import Test from './pages/Test'
import TestInfo from './pages/TestInfo'
// import TestResult from 'pages/TestResult'
// import Ranking from '/pages/Ranking'
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
        <Route path="/TestInfo/:testId" element={ <TestInfo /> } />
        <Route path="/Test/:testId" element={ <Test />} />
        {/* <Route path='/TestResult:testId' element={ <TestResult />} />
        <Route path='/Ranking' element={ <Ranking />} /> */}
      </Routes>
      
    </div>
  );
}

export default App;
