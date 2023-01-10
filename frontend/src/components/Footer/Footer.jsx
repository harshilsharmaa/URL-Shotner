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

{/*
<a href="https://www.flaticon.com/free-icons/pdf" title="pdf icons">Pdf icons created by Creative Stall Premium - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Maxim Basinski Premium - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/paper" title="paper icons">Paper icons created by Gregor Cresnar - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/view" title="view icons">View icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/edit" title="edit icons">Edit icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/eye" title="eye icons">Eye icons created by Sergei Kokota - Flaticon</a>
*/} 

export default Footer