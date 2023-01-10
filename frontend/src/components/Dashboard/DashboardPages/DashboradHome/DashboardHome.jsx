import React from 'react'
import './DashboardHome.css'
import Analytics from '../../Analytics/Analytics'
import csv from '../../../../images/csv.png'
import pdfIcon from '../../../../images/pdfIcon.png'

const DashboardHome = () => {
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
            <p>200</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Clicks</p>
            <span className='clicks-tag'>This Year</span>
          </div>
          <div className="click-card-content">
            <p>200</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Total Clicks</p>
            <span className='clicks-tag'>This Month</span>
          </div>
          <div className="click-card-content">
            <p>200</p>
          </div>
        </div>
        <div className="click-card">
          <div className="click-card-title">
            <p>Total Clicks</p>
            <span className='clicks-tag'>Today</span>
          </div>
          <div className="click-card-content">
            <p>200</p>
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
        <Analytics />
      </section>
    </div>
  )
}

export default DashboardHome