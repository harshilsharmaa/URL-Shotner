import React from 'react'
import SideNavbar from './SideNavbar/SideNavbar'
import DashboardHome from './DashboardPages/DashboradHome/DashboardHome'
import Profile from './DashboardPages/Profile/Profile'
import Reports from './DashboardPages/Reports/Reports'
import MyURLs from './DashboardPages/MyURLs/MyURLs'
import CreateURL from './DashboardPages/CreateUrl/CreateURL'
import ViewURL from './DashboardPages/ViewURL/ViewURL'
import EditUrl from './DashboardPages/EditUrl/EditUrl'
import './Dashboard.css'

const Dashboard = ({page}) => {
  return (
    <div className="dashboard">

      <section className='sideNavbar-section'>
        <SideNavbar />
      </section>

      <section className='mainContent-section'>
        {
          page==='dashboard-home' ? <DashboardHome /> :
          page==='profile' ? <Profile /> : 
          page==='reports' ? <Reports /> :
          page==='myUrls' ? <MyURLs /> :
          page==='createUrl' ? <CreateURL /> :
          page==='viewUrl' ? <ViewURL /> :
          page==='editUrl' ? <EditUrl /> :
          <h1>404</h1>
        }
      </section>
    </div>
  )
}

export default Dashboard