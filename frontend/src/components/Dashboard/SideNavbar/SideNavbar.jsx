import React from 'react'
import {Link} from 'react-router-dom'
import {sideNavbarData} from './sideNavbarData'
import './SideNavbar.css'

const SideNavbar = () => {
  return (
    <div className='sideNavbar'>
        <div className='sideNavbar__logo'>
            <img src="https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465__340.png" alt="logo" />
        </div>
        <div className='sideNavbar__menu'>
                {
                    sideNavbarData.map((item, index) => {
                        return (
                            <Link to={item.path}>
                                <div className='menu-item' key={index}>
                                    {/* <img src={item.icon} alt={item.title} /> */}
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        )       
                    })
                }
        </div>
    </div>
  )
}

export default SideNavbar