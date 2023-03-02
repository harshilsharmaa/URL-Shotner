import React, { useState, useEffect } from 'react'
import './CreateGroup.css'
import { Link, useNavigate } from 'react-router-dom'
import arrowIcon from '../../../../images/arrow-right.png'
import { useDispatch, useSelector } from 'react-redux'
import { getMyUrls, createGroup } from '../../../../Actions/Url.actions'

const CreateGroup = () => {

    const { urls, error, message, loading, pageCount } = useSelector(state => state.urls);
    const {createdGroup, message:createGroupMessage, error:createGroupError} =  useSelector(state=> state.createGroup);

    const [groupName, setGroupName] = useState('');
    const [allUrls, setAllUrls] = useState([]);
    const [addedUrls, setAddedUrls] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMyUrls(1));
    }, [])

    useEffect(()=>{
        setAllUrls(urls);
    },[urls])

    useEffect(()=>{
        if(createdGroup){
            dispatch({type:'CLEAR_CREATED_GROUP'})
            navigate('/group');
        }
    },[createdGroup])


    const handleAdd = (currUrl)=>{
        setAddedUrls([...addedUrls, currUrl]);
        setAllUrls(allUrls.filter((url)=>url.hash!==currUrl.hash));
    }

    const handleRemove = (currUrl)=>{
        setAddedUrls(addedUrls.filter((url)=>url.hash!==currUrl.hash));
        setAllUrls([...allUrls, currUrl]);
    }

    const handleSaveGroup = ()=>{
        if(addedUrls.length<=1){
            window.alert('Group must have more than 1 url.');
            return;
        }
        if(groupName.length===0){
            window.alert("Please Enter Group Name");
            return;
        }
        dispatch(createGroup(groupName, addedUrls));
    }

    return (
        <div className='create-group page-container'>
            <div className="heading">
                <h3>Create Url Group</h3>
            </div>
            <div className="create-group-body">
                <div className="group-name-form">
                    <input value={groupName} onChange={(e)=>setGroupName(e.target.value)} maxlength="7" autofocus="autofocus" type="text" placeholder='Enter Group Name' />
                </div>
                <div className="add-url">
                    <div className="add-url-left">
                        <h1>Add Url Here</h1>
                        <div className="add-url-list">
                            {
                                addedUrls?.length>0 ? addedUrls.map((url,index)=>{
                                    return (
                                        <div className='url-g'>
                                            <div className="url-g-component select-url-g">
                                                <button onClick={(e)=>handleRemove( url)}>remove</button>
                                            </div>
                                            <div className="url-g-component name">
                                                <p>{url.urlName}</p>
                                            </div>
                                            <div className="url-g-component comb-url-g">
                                                <p id='shortUrl'>{url.shortUrl}</p>
                                                <p id='longUrl'>{url.longUrl.slice(0, 30)}</p>
                                            </div>
                                        </div>
                                    )
                                }):null
                            }
                        </div>
                    </div>

                    <div className="add-url-right">
                        <h1>All Urls</h1>
                        <div className="add-url-list">

                            {
                                allUrls?.length>0 ? allUrls.map((url, index) => {
                                    return (
                                        <div className='url-g'>
                                            <div className="url-g-component select-url-g">
                                                <button onClick={(e)=>handleAdd(url)}>Add</button>
                                            </div>
                                            <div className="url-g-component name">
                                                <p>{url.urlName}</p>
                                            </div>
                                            <div className="url-g-component comb-url-g">
                                                <p id='shortUrl'>{url.shortUrl}</p>
                                                <p id='longUrl'>{url.longUrl.slice(0, 30)}</p>
                                            </div>
                                        </div>
                                    )
                                })   
                                    : null
                            }

                            

                        </div>
                    </div>
                </div>
                <div className="add-url-save-btn">
                    <button onClick={(e)=>handleSaveGroup()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup