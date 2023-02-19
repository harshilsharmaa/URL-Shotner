import React,{useEffect} from 'react'
import './Analytics.css'
import LineChart from './Graphs/LineChart';
import PieChart from './Graphs/PieChart';
import csv from '../../../images/csv.png'
import pdfIcon from '../../../images/pdfIcon.png'
import { getAnalytics, getUrlAnalytics } from '../../../Actions/Analytics.actions'
import {useSelector, useDispatch} from 'react-redux'
import ClickCards from './ClickCards/ClicksCards';
import GraphSection from './Graphs/GraphSection';
  

const Analytics = ({urlHash}) => {
  
  const {analytics} = useSelector(state => state.analytics);

  const dispatch = useDispatch();

  useEffect(() => {
    if(urlHash){
      dispatch(getUrlAnalytics(urlHash));
    }else{
      dispatch(getAnalytics());
    }
  },[])
  

  return (
    <div className='analytics-page page-container'>
      
      <ClickCards analytics={analytics} />

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
    
      <GraphSection urlHash={urlHash} analytics={analytics} />
    </div>
  )
}

export default Analytics