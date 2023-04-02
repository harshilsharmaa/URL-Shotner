import React,{useState, useEffect} from 'react'
import GoogleButton from 'react-google-button'
import { registerUserEmail } from '../../Actions/User.actions'
import { useDispatch, useSelector } from 'react-redux'
import './Login-Register.css'
import Alert from '../Alert/Alert'
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {

    const {user, error, message, status} = useSelector(state => state.user);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!username || !email || !password){
            alert('Please fill all the fields')
            return
        }

        dispatch(registerUserEmail({username,email,password}));
    }

    useEffect(() => {
        if(status === 'success'){
            dispatch({type: 'CLEAR_STATUS'})
            navigate('/v/dashboard-home');
        }
        if(error){
            setTimeout(() => {
                dispatch({type: 'CLEAR_ERRORS'})
            }, 5000);
        }
        if(message){
            setTimeout(() => {
                dispatch({type: 'CLEAR_MESSAGES'})
            }, 5000);
        }
    }, [error, message, status])

    useEffect(()=>{
        if(user) navigate('/v/dashboard-home');
    },[user])

    const handleGoogleSignup = () => {
        window.location.href = 'https://urily.onrender.com/auth/google';
    }

    return (
        <div className='login-register'>

            {
                error ? <Alert text={error} type={"error"}/> :
                message ? <Alert text={message} type={"success"}/>: null
            }

            <h2>Signup</h2>
            <div className="login-register-form">
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" id="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <button type="submit">Register</button>
                    <p>Already have an account? <span><Link to="/v/login">Login</Link></span></p>
                </form>
            </div>
            <p id='or'>or</p>
            <GoogleButton
                label="Continue with Google"
                onClick={(e)=>handleGoogleSignup() }
            />
        </div>
    )
}

export default Signup