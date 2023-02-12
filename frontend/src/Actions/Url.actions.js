import axios from 'axios';

const rootUrl = 'http://localhost:4000';

export const getMyUrls = ()=> async(dispatch) => {
    try {

        dispatch({
            type: 'getMyUrlsRequest'
        })

        const {data}  = await axios.get(`${rootUrl}/api/v1/url/my-urls`,{
            withCredentials: true
        });
        dispatch({
            type: 'getMyUrlsSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'getMyUrlsFailure',
            payload: error.response.data.message
        })
    }
}

export const createUrl = (urlData)=> async(dispatch) => {
    try{

        dispatch({
            type: 'createUrlRequest'
        })

        const {data} = await axios.post(`${rootUrl}/api/v1/url/login-short`,{
            originalUrl: urlData.originalUrl,
            urlName: urlData.urlName
        }, {
            withCredentials: true
        });

        dispatch({
            type: 'createUrlSuccess',
            payload: data
        })

    }
    catch(error){
        dispatch({
            type:'createUrlFailure',
            payload: error.response.data.message
        })
    }
}

export const viewUrl = (hash)=> async(dispatch) => {
    try{

        dispatch({
            type: 'viewUrlRequest'
        })

        const {data} = await axios.get(`${rootUrl}/api/v1/url/view/${hash}`,{
            withCredentials: true
        });

        dispatch({
            type: 'viewUrlSuccess',
            payload: data
        })

    }
    catch(error){
        dispatch({
            type:'viewUrlFailure',
            payload: error.response.data.message
        })
    } 
}