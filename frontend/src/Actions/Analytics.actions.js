import axios from 'axios'

// const rootUrl = 'http://localhost:4000';
const rootUrl = '';

export const getAnalytics = () => async(dispatch)=> {
    try {

    dispatch({
        type: 'GetAnalyticsRequest'
    })


    const {data} = await axios.get(`${rootUrl}/api/v1/analytics/getAll`, {
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

export const getClicks = (hash) => async(dispatch)=> {
    try{
        dispatch({
            type: 'GetClicksRequest'
        })
        const {data} = await axios.get(`${rootUrl}/api/v1/analytics/clicks?hash=${hash}`, {
            withCredentials: true
        })
        console.log(data);
        dispatch({
            type: 'GetClicksSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'GetClicksFailure',
            payload: error.response.data.message
        })
    }
}