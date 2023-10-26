import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sideNavbarData } from './sideNavbarData'
import {loagout} from '../../../Actions/User.actions'
import { useDispatch, useSelector } from 'react-redux'
// import {useHistory} from 'react-router-dom'
import './SideNavbar.css'

const SideNavbar = () => {

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
           navigate('/login', {replace: true});
        }
    }, [user])

    const handleLogout = () => {
        dispatch(loagout())
    }

    return (
        <div className='sideNavbar'>
            <div className='sideNavbar__logo'>
                {/* <img src="https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465__340.png" alt="logo" /> */}
                <h1><span id='logo-u'>U</span>rily</h1>
            </div>
            <div className='sideNavbar__menu'>
                {
                    sideNavbarData.map((item, index) => {
                        return (
                            <Link key={index} to={item.path}>
                                <div className='menu-item-selected menu-item' key={index}>
                                    <div className="menu-item-icon">
                                        <img src={item.icon} alt={item.title} />
                                    </div>
                                    <div className="menu-item-name">
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                <Link to={'/createURL'}>
                    <div className='menu-item' id='create-url-btn'>
                        {/* <div className="menu-item-icon">
                        <img src={item.icon} alt={item.title} />
                    </div> */}
                        <div className="menu-item-name">
                            <span><p>+ Create URL</p></span>
                        </div>
                    </div>
                </Link>

            </div>
            <div className="sideNavbar-bottom">
                <button onClick={(e)=>handleLogout()}>Logout</button>
            </div>
        </div>
    )
}

export default SideNavbar
