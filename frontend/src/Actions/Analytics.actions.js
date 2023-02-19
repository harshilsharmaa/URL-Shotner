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

export const getUrlAnalytics = (hash) => async(dispatch)=> {
    try {

    dispatch({
        type: 'GetAnalyticsRequest'
    })


    const {data} = await axios.get(`${rootUrl}/api/v1/analytics/url/${hash}`, {
        withCredentials: true
    })

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

export const getClicks = (hash, duration) => async(dispatch)=> {
    try{
        dispatch({
            type: 'GetClicksRequest'
        })

        let url = "";

        if(duration && hash){
            url = `${rootUrl}/api/v1/analytics/clicks?hash=${hash}&duration=${duration}`
        }
        if(duration && !hash){
            url = `${rootUrl}/api/v1/analytics/clicks?duration=${duration}`
        }
        if(!duration && hash){
            url = `${rootUrl}/api/v1/analytics/clicks?hash=${hash}`
        }
        if(!duration && !hash){
            url = `${rootUrl}/api/v1/analytics/clicks`
        }

        const {data} = await axios.get(url, {
            withCredentials: true
        })
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