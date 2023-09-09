import React from 'react'
import './ContentLocked.css'
import lock from '../../../../images/lock.png'
import {useNavigate} from 'react-router-dom'

const ContentLocked = () => {

  const navigate = useNavigate()

  return (
    <div className='content-locked'>
      <img src={lock} alt="" />
      <h4>Locked</h4>
      <p>Upgrade to premium to unlock this feature</p>
      <button onClick={()=>navigate('/plans')}>Upgrade</button>
    </div>
  )
}

export default ContentLocked