import React,{useEffect, useState} from 'react'
import './Analytics.css'
import LineChart from './Graphs/LineChart';
import PieChart from './Graphs/PieChart';
import csv from '../../../images/csv.png'
import pdfIcon from '../../../images/pdfIcon.png'
import { getAnalytics, getUrlAnalytics } from '../../../Actions/Analytics.actions'
import {useSelector, useDispatch} from 'react-redux'
import ClickCards from './ClickCards/ClicksCards';
import GraphSection from './Graphs/GraphSection';
  

const Analytics = ({analytics, urlHash, groupId}) => {

  useEffect(() => {
    if(urlHash) console.log('urlHash', urlHash);
    if(groupId) console.log('groupId', groupId);
  },[urlHash, groupId])

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

      {
        urlHash ? <GraphSection analytics={analytics} urlHash={urlHash}/>:
        groupId ? <GraphSection analytics={analytics} groupId={groupId}/>:
        <GraphSection analytics={analytics} />
      }
    
    </div>
  )
}

export default Analytics