import React,{useState, useEffect} from 'react'
import { getAnalytics } from '../../../../Actions/Analytics.actions'
import {useSelector, useDispatch} from 'react-redux'


const ClicksCards = () => {

    const {analytics} = useSelector(state => state.analytics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalytics());
  },[])

  return (
    <div className="clicksCard-box">
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
    </div>
  )
}

export default ClicksCards