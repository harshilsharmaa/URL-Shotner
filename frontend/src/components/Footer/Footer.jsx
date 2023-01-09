import React from 'react'
import './Footer.css'
import heart from '../../images/heart.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-top">
            <a href="">Report a problem</a>
            <a href="">Follow on LinkedIn</a>
            <a href="">Source Code</a>
        </div>
        <div className="footer-bottom">
            <p>Made with <span><img src={heart} alt="" srcset="" /></span> By <a href="">Harshil Sharma</a></p>
        </div>
    </div>
  )
}

export default Footer