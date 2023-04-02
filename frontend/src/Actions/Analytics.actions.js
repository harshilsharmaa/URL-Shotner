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
        type: 'GetUrlAnalyticsRequest'
    })


    const {data} = await axios.get(`${rootUrl}/api/v1/analytics/url/${hash}`, {
        withCredentials: true
    })

    dispatch({
        type: 'GetUrlAnalyticsSuccess',
        payload: data
    })
        
    } catch (error) {
        dispatch({
            type: 'GetUrlAnalyticsFailure',
            payload: error.response.data.error
        })
    }
}

export const getGroupAnalytics = (groupId, duration) => async(dispatch)=> {
    try{

        dispatch({
            type: 'GetGroupAnalyticsRequest'
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/analytics/group/${groupId}`, {
            withCredentials: true
        })

        dispatch({
            type: 'GetGroupAnalyticsSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'GetGroupAnalyticsFailure',
            payload: error.response.data.error
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

export const generateUrlReport = (hash) => async(dispatch)=> {
    try{
        dispatch({
            type: 'GenerateUrlReportRequest'
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/analytics/report/url/${hash}`, {
            withCredentials: true
        })

        dispatch({
            type: 'GenerateUrlReportSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'GenerateUrlReportFailure',
            payload: error.response.data.message
        })
    }
}