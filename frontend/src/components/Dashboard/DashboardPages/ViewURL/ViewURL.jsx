import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewUrl, deleteUrlReq } from '../../../../Actions/Url.actions'
import Analytics from '../../Analytics/Analytics'
import GenrateQR from '../../../GenrateQR/GenrateQR';
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
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [deleteUrlHash, setDeleteUrlHash] = useState("");
    const [gerateQr, setGerateQr] = useState(false);

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



    useEffect(() => {
        if (urlError) {
            setError(urlError);
        }
        if (deleteUrlMessage){
            setMessage(deleteUrlMessage)
            navigate('/myUrls', {replace: true});
        }
        if(deleteUrlError){
            setError(deleteUrlError);
        }

        setTimeout(() => {
            setError(null);
            setMessage(null);
        }, 5000);

        dispatch({type: "CLEAR_MESSAGES"});
        dispatch({type: "CLEAR_ERRORS"});

    }, [deleteUrlMessage, deleteUrlError, urlMessage, urlError])

    const handleDeleteUrl = () => {

        // console.log("handle delete url");

        if(deleteUrlHash !== url?.hash){
            return;
        }
        dispatch(deleteUrlReq(url?.hash));
        setShowDeleteModel(false);
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
                                <button onClick={(e)=>setShowDeleteModel(true)} style={{"margin-left":"5px"}}>
                                    <p>Delete</p>
                                    <img src={deleteIcon} alt="" />
                                </button>
                                <button onClick={(e)=>setGerateQr(true)} style={{"margin-left":"5px"}}>
                                    <p>Genrate QR</p>
                                    <img src={deleteIcon} alt="" />
                                </button>
                            </div>
                            {
                                gerateQr ? <GenrateQR value={url?.longUrl} /> : null
                            }

                            {/* Delete url confirmation modal */}
                            {
                                showDeleteModel ?
                                // console.log("show delete model")
                                // : null
                                    <div className="delete-model">
                                        <div className="delete-model-container">
                                            <div className="delete-model-heading">
                                                <h4>Delete URL</h4>
                                            </div>
                                            <div className="delete-model-body">
                                                <p>Type <b>{url?.hash}</b> to delete this url.</p>
                                                <input value={deleteUrlHash} onChange={(e)=>setDeleteUrlHash(e.target.value)} type="text" />
                                                {deleteUrlHash.length>0 && deleteUrlHash!==url?.hash ? <p id="delete-error">Hash does not match</p> : null}
                                            </div>
                                            <div className="delete-model-footer">
                                                <button id='delete' onClick={(e) => handleDeleteUrl()}>Delete</button>
                                                <button id='cancle' onClick={(e) => setShowDeleteModel(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div> : null
                            }

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