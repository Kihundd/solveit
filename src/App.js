import './styles/App.css';
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
import TestResult from './pages/TestResult';
import MyTestResult from './pages/MyTestResult';
import Admin from './pages/Admin';
import Report from './components/admin/Report';
import Coupon from './components/admin/Coupon';
import { Routes, Route, Navigate } from 'react-router-dom'
import isLogin from './pages/isLogin';
import isRole from './pages/isRole';
import PrivateRoute from './components/route/PrivateRoute';



function App() {
  // console.log(isLogin())
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/SignUp" element={ <SignUp /> } />
        <Route path="/Profile" element={ <Profile /> } />
        <Route path="/MyCoupon" element={ <MyCoupon /> } />
        <Route path="/CreateTest" element={ <PrivateRoute><CreateTest /></PrivateRoute> } />
        <Route path="/TestList" element={ <TestList /> } />
        <Route path="/TestInfo/:testId" element={ <PrivateRoute><TestInfo /></PrivateRoute> } />
        <Route path="/Test/:testId" element={ <Test />} />
        <Route path='/TestResult/:testId' element={ <TestResult />} />
        <Route path="/Forum" element={ <Forum />} />
        <Route path="/MyTestList" element={ <PrivateRoute><MyTestList /></PrivateRoute> } />
        <Route path="/MyTestResult/:testId" element={ <MyTestResult /> } />
        <Route path="/Ask/:askingId" element={ <AskingView /> } />
        <Route path='/Ranking' element={ <Ranking />} />
        <Route path="/Shop" element={ <PrivateRoute><Shop /></PrivateRoute> } />
        <Route path="/Admin/Setting" element={ <Admin /> } />
        <Route path='/Admin/Report' element={<Report />} />
        <Route path='/Admin/Coupon' element={<Coupon />} />
        {/* <AuthRoute path="/Shop" element={ <Shop /> } /> */}
        <Route path="*" />
      </Routes>
    </div>
  );
}


export default App;
