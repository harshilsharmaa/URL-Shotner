import React from 'react'
import './Footer.css'
import heart from '../../images/heart.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-top">
            <a href="">Report a problem</a>
            <a href="https://linkedin.com/in/harshilsharmaa/">Follow on LinkedIn</a>
            <a href="https://github.com/harshilsharmaa/URL-Shotner">Source Code</a>
            <a href="/credits" target={'_blank'}>Credits</a>
        </div>
        <div className="footer-bottom">
            <p>Made with <span><img src={heart} alt="" srcSet="" /></span> By <a href="">Harshil Sharma</a></p>
            <p id='cpr'>Copyright © 2023 - 2024 Harshil Sharma. All rights reserved.</p>
        </div>
    </div>
  )
}



export default Footer