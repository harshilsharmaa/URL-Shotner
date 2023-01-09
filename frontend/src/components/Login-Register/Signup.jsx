import React from 'react'
import './Login-Register.css'

const Signup = () => {
  return (
    <div className='login-register'>
        <h2>Signup</h2>
        <div className="login-register-form">
            <form action="">
                <div className="form-group">
                    <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span><a href="/login">Login</a></span></p>
            </form>
        </div>
    </div>
  )
}

export default Signup