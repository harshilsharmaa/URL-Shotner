import React from 'react'
import SideNavbar from './SideNavbar/SideNavbar'
import DashboardHome from './DashboardPages/DashboradHome/DashboardHome'
import Profile from './DashboardPages/Profile/Profile'
import MyTeam from './DashboardPages/MyTeam/MyTeam'
import MyURLs from './DashboardPages/MyURLs/MyURLs'
import CreateURL from './DashboardPages/CreateUrl/CreateURL'
import ViewURL from './DashboardPages/ViewURL/ViewURL'
import EditUrl from './DashboardPages/EditUrl/EditUrl'
import Plans from './DashboardPages/Plans/Plan'
import BuyPlan from './DashboardPages/BuyPlan/BuyPlan'
import PaymentSuccess from './DashboardPages/PaymentSuccess/PaymentSuccess'
import GroupUrl from './DashboardPages/GroupUrl/GroupUrl'
import ShowGroup from './DashboardPages/GroupUrl/ShowGroup'
import CreateGroup from './DashboardPages/CreateGroup/CreateGroup'
import GroupAnalytics from './DashboardPages/GroupUrl/GroupAnalytics'
import ContentLocked from './DashboardPages/ContentLocked/ContentLocked'
import InvitePeople from './DashboardPages/InvitePeople/InvitePeople'
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
          page==='my-team' ? <MyTeam /> :
          page==='myUrls' ? <MyURLs /> :
          page==='createUrl' ? <CreateURL /> :
          page==='viewUrl' ? <ViewURL /> :
          page==='editUrl' ? <EditUrl /> :
          page==='plans' ? <Plans /> :
          page==='payment-success' ? <PaymentSuccess/> :
          page==='buy-plan' ? <BuyPlan/> :
          page==='group' ? <GroupUrl/>:
          page==='show-group' ? <ShowGroup/> :
          page==='create-group' ? <CreateGroup/> :
          page==='group-analytics' ? <GroupAnalytics/> :
          page==='content-locked' ? <ContentLocked/> :
          page==='invite-people' ? <InvitePeople/> :
          <h1>404</h1>
        }
      </section>
    </div>
  )
}

export default Dashboard