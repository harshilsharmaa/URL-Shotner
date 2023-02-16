import React from 'react'
import LineChart from './LineChart';
import PieChart from './PieChart';

const GraphSection = ({analytics}) => {
  return (
    <section className="analytics-graph-section">
      <div className="analytics">
          <div id='lineChart' className="analytic-card">
            <div className="analytic-card-title">
              <p>Clicks</p>
              <select name="date" id="">
                <option value="this-year">This Year</option>
                <option value="this-month">This Month</option>
                <option value="today">Today</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-9-months">Last 9 Months</option>
                <option value="custom">Custom</option>            {/* Pending */}         

              </select>
            </div>
            <div className="analytic-card-content">
              <LineChart />
            </div>
            
          </div>
          <div className="analytic-card">
            <div className="analytic-card-title">
              <p>Countries</p>
              <select name="date" id="">
                <option value="this-year">This Year</option>
                <option value="this-month">This Month</option>
                <option value="today">Today</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-9-months">Last 9 Months</option>
                <option value="custom">Custom</option>            {/* Pending */}         

              </select>
            </div>
            <div className="analytic-card-content">
              <PieChart />
            </div>
          </div>
        </div>
      </section>
  )
}

export default GraphSection