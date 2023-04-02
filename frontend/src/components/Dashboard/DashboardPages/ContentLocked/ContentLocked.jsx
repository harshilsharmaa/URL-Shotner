import React from 'react'
import './ContentLocked.css'
import lock from '../../../../images/lock.png'

const ContentLocked = () => {
  return (
    <div className='content-locked'>
      <img src={lock} alt="" />
      <h4>Locked</h4>
      <p>Upgrade to premium to unlock this feature</p>
      <button>Upgrade</button>
    </div>
  )
}

export default ContentLocked