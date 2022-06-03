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
import MyTestList from './pages/MyTestList';
import Ranking from './pages/Ranking'
import Forum from './pages/Forum'
import AskingView from './pages/AskingView';
import Shop from './pages/Shop';
import { Routes, Route } from 'react-router-dom'
import TestResult from './pages/TestResult';
import MyTestResult from './pages/MyTestResult';



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
        <Route path='/TestResult/:testId' element={ <TestResult />} />
        <Route path="/Forum" element={ <Forum />} />
        <Route path="/MyTestList" element={ <MyTestList /> } />
        <Route path="/MyTestResult/:testId" element={ <MyTestResult /> } />
        <Route path="/Ask/:askingId"element={ <AskingView /> } />
        <Route path='/Ranking' element={ <Ranking />} />
        <Route path="/Shop" element={ <Shop /> } />
      </Routes>
      
    </div>
  );
}

export default App;
