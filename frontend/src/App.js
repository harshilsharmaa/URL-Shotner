import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadUser } from './Actions/User.actions';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Login from './components/Login-Register/Login';
import Signup from './components/Login-Register/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CreditsPage from './components/CreditsPage/CreditsPage';
import './components/common.css'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  const { user, isAuthenticated } = useSelector(state => state.user);

  return (

    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path='/' exact element={isAuthenticated? <Dashboard page={'myUrls'} /> : <Home />} ></Route>
        <Route path='/login' exact element={<Login />} ></Route>
        <Route path='/signup' exact element={<Signup />} ></Route>
        <Route path='/credits' exact element={<CreditsPage />} ></Route>

        {/* Protected Routes */}
        <Route
          path='/dashboard-home'
          exact
          element={isAuthenticated ? <Dashboard page={user.premiumMember ? 'dashboard-home' : 'content-locked'} /> : <Login />} >
        </Route>

        <Route
          path='/profile'
          exact
          element={isAuthenticated ? <Dashboard page={'profile'} /> : <Login />} >
        </Route>

        <Route
          path='/myUrls'
          exact
          element={isAuthenticated ? <Dashboard page={'myUrls'} /> : <Login />} >
        </Route>

        <Route
          path='/invite-people'
          exact
          element={isAuthenticated ? <Dashboard page={'invite-people'} /> : <Login />} >
        </Route>

        <Route
          path='/my-team'
          exact
          element={isAuthenticated ? <Dashboard page={'my-team'} /> : <Login />} >
        </Route>

        <Route
          path='/plans'
          exact
          element={isAuthenticated ? <Dashboard page={'plans'} /> : <Login />} >
        </Route>

        <Route
          path='/buy-plan/:type'
          exact
          element={isAuthenticated ? <Dashboard page={'buy-plan'} /> : <Login />} >
        </Route>

        <Route
          path='/payment/success'
          exact
          element={isAuthenticated ? <Dashboard page={'payment-success'} /> : <Login />} >
        </Route>

        <Route
          path='/createUrl'
          exact
          element={isAuthenticated ? <Dashboard page={'createUrl'} /> : <Login />} >
        </Route>

        <Route
          path='/url/:hash'
          exact
          element={isAuthenticated ? <Dashboard page={'viewUrl'} /> : <Login />} >
        </Route>

        <Route
          path='/editUrl/:hash'
          exact
          element={isAuthenticated ? <Dashboard page={'editUrl'} /> : <Login />} >
        </Route>

        <Route
          path='/group'
          exact
          element={isAuthenticated ? <Dashboard page={user.premiumMember ? 'group' : 'content-locked'} /> : <Login />} >
        </Route>

        <Route
          path='/create/group'
          exact
          element={isAuthenticated ? <Dashboard page={user.premiumMember ? 'create-group' : 'content-locked'} /> : <Login />} >
        </Route>

        <Route
          path='/group/:id/:groupName'
          exact
          element={isAuthenticated ? <Dashboard page={user.premiumMember ? 'show-group' : 'content-locked'} /> : <Login />} >
        </Route>

        <Route
          path='/group/analytics/:id'
          exact
          element={isAuthenticated ? <Dashboard page={user.premiumMember ? 'group-analytics' : 'content-locked'} /> : <Login />} >
        </Route>

      </Routes>

      {/* <Footer/> */}

    </Router>


  );
}

export default App;
