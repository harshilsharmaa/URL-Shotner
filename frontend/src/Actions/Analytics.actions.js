import axios from 'axios'

const root = 'http://localhost:4000';

export const getAnalytics = () => async(dispatch)=> {
    try {

    dispatch({
        type: 'GetAnalyticsRequest'
    })


    const {data} = await axios.get(`${root}/api/v1/analytics/getAll`, {
        withCredentials: true
    })
    console.log(data);

    dispatch({
        type: 'GetAnalyticsSuccess',
        payload: data
    })
        
    } catch (error) {
        dispatch({
            type: 'GetAnalyticsFailure',
            payload: error.response.data.message
        })
    }
}