import React from 'react'
import './Login-Register.css'

const Login = () => {
  return (
    <div className='login-register'>
        <h2>Login</h2>
        <div className="login-register-form">
            <form action="">
                <div className="form-group">
                    {/* <label htmlFor="email">Email</label> */}
                    <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button type="submit">Login</button>
                <p>Not Registered? <span><a href="/signup">Signup</a></span></p>
            </form>
        </div>
    </div>
  )
}

export default Login