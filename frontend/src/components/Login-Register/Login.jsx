import React,{useState, useEffect} from 'react';
import GoogleButton from 'react-google-button';
import './Login-Register.css';
import { loginUserEmail, loadUser } from '../../Actions/User.actions';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';

const Login = () => {

    const {loading:userLoading, user, error, message} = useSelector(state => state.user);
    const {loading:loginUserLoading ,message:loggedInMessage, error:loggedInError} = useSelector(state => state.loginUser);;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!email || !password){
            alert('Please fill all the fields')
            return
        }

        dispatch(loginUserEmail({email,password}));
    }

    const handleGoogleLogin = () => {
        // dispatch(loginUserGoogle());
        // navigate('/auth/google');
        window.location.href = 'http://localhost:4000/auth/google';
    }

    useEffect(()=>{
        console.log(user);
        if(user) {
            navigate('/dashboard-home');
        }
    },[user,message])

    useEffect(() => {
        if(loggedInError){
            setTimeout(() => {
                dispatch({type: 'CLEAR_ERRORS'})
            }, 5000);
        }
        if(loggedInMessage){
            dispatch(loadUser());
            setTimeout(() => {
                dispatch({type: 'CLEAR_MESSAGES'})
            }, 5000);
        }
    }, [loggedInError, loggedInMessage])

  return (
    <div className='login-register'>
        {
            loginUserLoading || userLoading ? <Loader/> : null
        }
         {
                loggedInError ? <Alert text={loggedInError} type={"error"}/> :
                loggedInMessage ? <Alert text={loggedInMessage} type={"success"}/>: null
            }
        <h2>Login</h2>
        <div className="login-register-form">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button type="submit">Login</button>
                <p>Not Registered? <span><a href="/signup">Signup</a></span></p>
            </form>
        </div>
        <p id='or'>or</p>
            <GoogleButton
                label="Continue with Google"
                onClick={(e)=>handleGoogleLogin() }
            />
    </div>
  )
}

export default Login