import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadUser } from './Actions/User.actions';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login-Register/Login';
import Signup from './components/Login-Register/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CreditsPage from './components/CreditsPage/CreditsPage';
import './components/common.css'

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[])

  const {isAuthenticated} = useSelector(state => state.user);

  return (
   
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={!isAuthenticated?<Login/>:<Dashboard page={'profile'}/>} ></Route>
        <Route path='/signup' element={!isAuthenticated?<Signup/>:<Dashboard page={'profile'}/>} ></Route>
        <Route path='/credits' element={<CreditsPage/>} ></Route>

        {/* Protected Routes */}
        <Route path='/dashboard-home' element={isAuthenticated? <Dashboard page={'dashboard-home'}/>: <Login/>} ></Route>
        <Route path='/profile' element={isAuthenticated? <Dashboard page={'profile'}/>: <Login/>} ></Route>
        <Route path='/reports' element={isAuthenticated? <Dashboard page={'reports'}/>: <Login/>} ></Route>
        <Route path='/myUrls' element={isAuthenticated? <Dashboard page={'myUrls'}/>: <Login/>} ></Route>
        <Route path='/createUrl' element={isAuthenticated? <Dashboard page={'createUrl'}/>: <Login/>} ></Route>
        <Route path='/url/:hash' element={isAuthenticated? <Dashboard page={'viewUrl'}/>: <Login/>} ></Route>
        <Route path='/editUrl/:hash' element={isAuthenticated? <Dashboard page={'editUrl'}/>: <Login/>} ></Route>
      </Routes>

      {/* <Footer/> */}

    </Router>


  );
}

export default App;
