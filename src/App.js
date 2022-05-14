import logo from './Logo_Login.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Login></Login>
    </div>
  );
}

export default App;

function Header() {
  return (
    <div>
      <h1>Header</h1>
    </div>
  )
}

function Login() {
  return(
    <img src={logo} ></img>
  )
}