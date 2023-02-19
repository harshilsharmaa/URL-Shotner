import React,{useState, useEffect} from 'react'
import './DashboardHome.css'
import Analytics from '../../Analytics/Analytics'

const DashboardHome = () => {
  return (

    <div className='dasboard-home page-container'>
      <div className="heading">
        <h3>Dashboard</h3>
      </div>
        <Analytics urlHash={false}/>
    </div>
  )
}

export default DashboardHome