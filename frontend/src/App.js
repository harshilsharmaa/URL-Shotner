import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login-Register/Login';
import Signup from './components/Login-Register/Signup';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
   
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>

        {/* Protected Routes */}
        <Route path='/dashboard' element={<Dashboard page={'profile'}/>} ></Route>
        <Route path='/profile' element={<Dashboard page={'profile'}/>} ></Route>
        <Route path='/reports' element={<Dashboard page={'reports'}/>} ></Route>
      </Routes>
      <Footer/>

    </Router>


  );
}

export default App;
