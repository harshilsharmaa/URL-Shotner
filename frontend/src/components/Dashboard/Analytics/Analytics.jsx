import React,{useEffect} from 'react'
import './Analytics.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import csv from '../../../images/csv.png'
import pdfIcon from '../../../images/pdfIcon.png'
import { generateUrlReport } from '../../../Actions/Analytics.actions'
import ClickCards from './ClickCards/ClicksCards';
import GraphSection from './Graphs/GraphSection';
import ContentLocked from '../DashboardPages/ContentLocked/ContentLocked';
  

const Analytics = ({analytics, urlHash, groupId}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loading} = useSelector(state => state.user);
  const {reportUrl} = useSelector(state => state.reportUrl);

  // useEffect(() => {
  //   if(urlHash) console.log('urlHash', urlHash);
  //   if(groupId) console.log('groupId', groupId);
  // },[urlHash, groupId])

  useEffect(() => {
    if(reportUrl) {
      window.location = reportUrl;
      // console.log('reportUrl', reportUrl);
    };
  },[reportUrl])

  const handleGenrateReport = () => {
    if(urlHash) dispatch(generateUrlReport(urlHash));
    else return;
  }

  return (

    <div className='analytics-page'>

      {
        user?.premiumMember === false ?
        <ContentLocked heading={"Analytics Locked"}/>:

        <div className="div">

        
      
      
      <ClickCards analytics={analytics} />
    

      <section className="export">
        {/* <button>
          <p>Export CSV</p>
          <img src={csv} alt="" />
          </button> */}
        <button onClick={handleGenrateReport}>
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

    }
    
    </div>
  )
}

export default Analytics