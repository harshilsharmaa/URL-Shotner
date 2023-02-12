import axios from 'axios';

const rootUrl = 'http://localhost:4000';

export const registerUserEmail = ({username, email, password}) => async (dispatch) => {

    try {

        dispatch({
            type: 'RegisterRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }


        const { data } = await axios.post(`${rootUrl}/auth-email/register`, {username, email, password}, config);

        dispatch({
            type: 'RegisterSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'RegisterFailure',
            payload: error.response.data.message
        })
    }
}

export const loginUserEmail = ({email, password}) => async (dispatch) => {
        try {
    
            dispatch({
                type: 'LoginRequest'
            })
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: 'true'
            }
    
            const { data } = await axios.post(`${rootUrl}/auth-email/login`, {email, password}, config);
    
            dispatch({
                type: 'LoginSuccess',
                payload: data
            })
            
        } catch (error) {
            dispatch({
                type: 'LoginFailure',
                payload: error.response.data.message
            })
        }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }

        const { data } = await axios.get(`${rootUrl}/api/v1/user/profile`, config);

        dispatch({
            type: 'LoadUserSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'LoadUserFailure',
            // payload: error.response.data.message
        })
    }
}