import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile page-container'>
      <div className="heading">
        <h3>Profile</h3>
      </div>
      <section className='accountInfo'>
        <div className="subHeading">
          <h4>Account Information</h4>
        </div>
        <div className="info">
          <div className="genral-info">
            <form className='form-type-2' action="">
              <div className="info-component">
                <label htmlFor="fname">First Name</label>
                <input type="text" name="fname" id="fname" />
              </div>
              <div className="info-component">
                <label htmlFor="lname">Last Name</label>
                <input type="text" name="lname" id="lname" />
              </div>
              <div className="info-component">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="info-component">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>

          <div className="vertical-line"></div>
          
          <div className="change-password">
            <form className='form-type-2' action="">
              <div className="info-component">
                <label htmlFor="old-password">Old Password</label>
                <input type="password" name="old-password" id="old-password" />
              </div>
              <div className="info-component">
                <label htmlFor="new-password">New Password</label>
                <input type="password" name="new-password" id="new-password" />
              </div>
              <div className="info-component">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" id="confirm-password" />
              </div>
              <div className="info-component">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile