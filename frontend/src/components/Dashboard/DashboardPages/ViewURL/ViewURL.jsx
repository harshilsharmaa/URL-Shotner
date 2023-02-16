import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewUrl, deleteUrlReq } from '../../../../Actions/Url.actions'
import ClicksCards from '../../Analytics/ClickCards/ClicksCards';
import Analytics from '../../Analytics/Analytics'
import './ViewURL.css'
import '../../../common.css'
import Loader from '../../../Loader/Loader'
import deleteIcon from '../../../../images/delete.png'
import copy from '../../../../images/copy.png'
import edit from '../../../../images/edit.png'
import Footer from '../../../Footer/Footer'
import Alert from '../../../Alert/Alert'


const ViewURL = () => {

    const { url, message: urlMessage, error: urlError, loading: urlLoading } = useSelector(state => state.url);
    const {message: deleteUrlMessage, error: deleteUrlError, loading: deleteUrlLoading} = useSelector(state => state.deleteUrl);

    const { hash } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [urlDetails, setUrlDetails] = useState({});
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        dispatch(viewUrl(hash));
    }, [dispatch])

    useEffect(() => {
        if (url) {
            setUrlDetails({
                "Url Name": url.urlName,
                "Original Url": url.longUrl,
                "Short Url": url.shortUrl,
                "Hash": url.hash,
                "Users": url.users,
                "Password": url.password,
                "Expires At": dateFormat(url.expiryDate, "d mmmm yyyy - hh:MM:ss TT"),
                "Created At": dateFormat(url.createdAt, "d mmmm yyyy - hh:MM:ss TT"),
                "Updated At": dateFormat(url.updatedAt, "d mmmm yyyy - hh:MM:ss TT"),
            })
        }
    }, [url]);

    console.log(deleteUrlMessage);
    console.log(deleteUrlError);

    useEffect(() => {
        if (urlError) {
            setMessage(urlError);
        }
        if (deleteUrlMessage){
            setMessage(deleteUrlMessage)
            navigate('/myUrls', {replace: true});
        }
        if(deleteUrlError){
            setError(deleteUrlError);
            console.log(deleteUrlError);
        }

        dispatch({type: "CLEAR_MESSAGES"});
        dispatch({type: "CLEAR_ERRORS"});

    }, [deleteUrlMessage, deleteUrlError, urlMessage, urlError])

    const handleDeleteUrl = () => {
        dispatch(deleteUrlReq(url?.hash));
    }

    return (
        <div className='viewUrl page-container'>
            {
                urlLoading || deleteUrlLoading ? <Loader/> :
                    url ?
                        <div className='viewUrl-container'>
                            <div className="heading">
                                <h3>URL - {url.urlName.length > 0 ? url.urlName :""} ({url.hash})</h3>
                            </div>
                            <div className="common viewUrl-btn-section">
                                <button>
                                    <p>Edit</p>
                                    <img src={edit} alt="" />
                                </button>
                                <button onClick={(e)=>handleDeleteUrl()} style={{"margin-left":"5px"}}>
                                    <p>Delete</p>
                                    <img src={deleteIcon} alt="" />
                                </button>
                                {/* <button>
                                    <p>Analytics</p>
                                    <img src={pdfIcon} alt="" />
                                </button> */}
                            </div>
                            <div className="url-details">
                                {
                                    Object.keys(urlDetails).map((key, index) => {
                                        return (
                                            <div className="url-detail-box" key={index}>
                                                <div className="left">
                                                    <h4>{key}</h4>
                                                </div>
                                                <div className="right">
                                                    {
                                                        !urlDetails[key] ? <h4>-</h4> :
                                                        <h4>{urlDetails[key]}</h4>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> :
                        message? <Alert text={message} type="success"/> : 
                        error? <Alert text={error} type="error"/> : null
            }
            <section className="analytics-section">
                {
                    url?
                    <Analytics urlHash={url?.hash}/>
                    :null
                }
            </section>
            <Footer/>
        </div>
    )
}

export default ViewURL