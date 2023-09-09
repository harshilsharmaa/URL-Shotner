import React,{useState, useEffect} from 'react'
import './DashboardHome.css'
import Analytics from '../../Analytics/Analytics'
import {getAnalytics} from '../../../../Actions/Analytics.actions'
import { useDispatch, useSelector} from 'react-redux'

const DashboardHome = () => {

  const {analytics} = useSelector(state => state.analytics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch])

  return (

    <div className='dasboard-home page-container'>
      <div className="heading">
        <h3>Dashboard</h3>
      </div>
      {
        analytics && <Analytics analytics={analytics} />
      }
    </div>
  )
}

export default DashboardHome