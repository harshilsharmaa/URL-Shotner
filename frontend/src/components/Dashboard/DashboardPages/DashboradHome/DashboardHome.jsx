import React,{useState, useEffect} from 'react'
import './DashboardHome.css'
import Analytics from '../../Analytics/Analytics'
import csv from '../../../../images/csv.png'
import pdfIcon from '../../../../images/pdfIcon.png'
import { getAnalytics } from '../../../../Actions/Analytics.actions'
import {useSelector, useDispatch} from 'react-redux'

const DashboardHome = () => {

  const {analytics} = useSelector(state => state.analytics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalytics());
  },[])


  return (

    <div className='dasboard-home page-container'>
      <div className="heading">
        <h3>Dashboard</h3>
      </div>
      <section className='click-cards'>
        <div className="click-card">
          <div className="click-card-title">
            <p>Total Clicks</p>
          </div>
          <div className="click-card-content">
            <p>{analytics?analytics.clicks.total:'Loading...'}</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Clicks</p>
            <span className='clicks-tag'>This Year</span>
          </div>
          <div className="click-card-content">
            <p>{analytics?analytics.clicks.thisYear:'Loading...'}</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Clicks</p>
            <span className='clicks-tag'>This Month</span>
          </div>
          <div className="click-card-content">
            <p>{analytics?analytics.clicks.thisMonth:'Loading...'}</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Clicks</p>
            <span className='clicks-tag'>Today</span>
          </div>
          <div className="click-card-content">
            <p>{analytics?analytics.clicks.today:'Loading...'}</p>
          </div>
        </div>
      </section>

      <section className="export">
        <button>
          <p>Export CSV</p>
          <img src={csv} alt="" />
          </button>
        <button>
          Export PDF
          <img src={pdfIcon} alt="" />
        </button>
      </section>

      <section className="analytics-section">
        <Analytics/>
      </section>
    </div>
  )
}

export default DashboardHome