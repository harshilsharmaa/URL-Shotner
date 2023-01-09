import React from 'react'
import SideNavbar from './SideNavbar/SideNavbar'
import Profile from './DashboardPages/Profile/Profile'
import Reports from './DashboardPages/Reports/Reports'
import './Dashboard.css'

const Dashboard = ({page}) => {
  return (
    <div className="dashboard">

      <section className='sideNavbar-section'>
        <SideNavbar />
      </section>

      <section className='mainContent-section'>
        {
          page==='profile' ? <Profile /> : 
          page==='reports' ? <Reports /> :
          <h1>404</h1>
        }
      </section>
    </div>
  )
}

export default Dashboard