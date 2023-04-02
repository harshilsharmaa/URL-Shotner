import axios from 'axios';

// const rootUrl = 'http://localhost:4000';
const rootUrl = '';

export const getMyUrls = (reqPage, reqSearch)=> async(dispatch) => {
    try {

        let page = reqPage;
        if(!reqPage){
            page = 1;
        }

        let searchText = null;
        if(reqSearch){
            searchText = reqSearch;
        }

        dispatch({
            type: 'getMyUrlsRequest'
        })

        const {data}  = await axios.get(`${rootUrl}/api/v1/url/my-urls?page=${page}&search=${searchText}`,{
        // const {data}  = await axios.get(`${rootUrl}/api/v1/url/my-urls`,{
            withCredentials: true,
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
            payload: error.response.data.error
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
            payload: error.response.data.error
        })
    } 
}

export const deleteUrlReq = (hash)=> async(dispatch) => {
    try{

        dispatch({
            type: 'deleteUrlRequest'
        })

        const {data} = await axios.delete(`${rootUrl}/api/v1/url/delete/${hash}`,{
            withCredentials: true
        });

        console.log(data)

        dispatch({
            type: 'deleteUrlSuccess',
            payload: data
        })

    }
    catch(error){
        dispatch({
            type:'deleteUrlFailure',
            payload: error.response.data.error
        })
    } 
}

export const editUrl = (hash, urlData) => async(dispatch)=>{
    try{
        dispatch({
            type: 'editUrlRequest'
        })

        console.log(urlData)
        console.log(hash)

        const {data} = await axios.put(`${rootUrl}/api/v1/url/edit/${hash}`,{
            urlData
        },{
            withCredentials: true
        })

        dispatch({
            type: 'editUrlSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'editUrlFailure',
            payload: error.response.data.error
        })
    }
}

export const createGroup = (groupName, urls) => async(dispatch)=>{
    try{
        dispatch({
            type: 'createGroupRequest'
        })
    
        let urlsList = [];
        urls.forEach(url => {
            urlsList.push(url.hash);
        })
    
        const {data} = await axios.post(`${rootUrl}/api/v1/url/group`, {
            groupName,
            urls:urlsList
        },{
            withCredentials: true
        })
    
        dispatch({
            type: 'createGroupSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'createGroupFailure',
            payload: error.response.data.error
        })
    }
}

export const getGroups = () => async(dispatch)=>{
    try{
        dispatch({
            type: 'getAllGroupsRequest'
        })
    
        const {data} = await axios.get(`${rootUrl}/api/v1/url/group/all`,{
            withCredentials: true
        })

        console.log(data);
    
        dispatch({
            type: 'getAllGroupsSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'getAllGroupsFailure',
            payload: error.response.data.error
        })
    }
}

export const getGroupById = (groupId) => async(dispatch)=>{
    try{
        dispatch({
            type: 'getGroupByIdRequest'
        })
    
        const {data} = await axios.get(`${rootUrl}/api/v1/url/group/${groupId}`,{
            withCredentials: true
        })
    
        dispatch({
            type: 'getGroupByIdSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'getGroupByIdFailure',
            payload: error.response.data.error
        })
    }
}

export const deleteGroupReq = (groupId) => async(dispatch)=>{
    try{
        dispatch({
            type: 'deleteGroupRequest'
        })
    
        const {data} = await axios.delete(`${rootUrl}/api/v1/url/group/delete/${groupId}`,{
            withCredentials: true
        })
    
        dispatch({
            type: 'deleteGroupSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'deleteGroupFailure',
            payload: error.response.data.error
        })
    }
}