import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar__logo'>
            <p>Logo</p>
        </div>
        <div className='navbar__links'>
            <ul>
                <li><a href="">Pricing</a></li>
                <li><a href="">Products</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar