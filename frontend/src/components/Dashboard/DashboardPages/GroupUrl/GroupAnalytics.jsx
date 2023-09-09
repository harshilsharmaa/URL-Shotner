import React,{useEffect} from 'react'
import Analytics from '../../Analytics/Analytics'
import {getGroupAnalytics} from '../../../../Actions/Analytics.actions'
import { useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

const GroupAnalytics = () => {

  const {groupAnalytics} = useSelector(state => state.groupAnalytics);

  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getGroupAnalytics(id));
  }, [dispatch])

  return (
    <div className='groupAnalytics page-container'>
        <div className="heading">
            <h3>Analytics Group - abcd</h3>
        </div>
        {
            groupAnalytics && <Analytics analytics={groupAnalytics} groupId={id}/>
        }
    </div>
  )
}

export default GroupAnalytics