import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewUrl, deleteUrlReq } from '../../../../Actions/Url.actions'
import { getUrlAnalytics, getClicks } from '../../../../Actions/Analytics.actions'
import Analytics from '../../Analytics/Analytics'
import GenrateQR from '../../../GenrateQR/GenrateQR';
import './ViewURL.css'
import '../../../common.css'
import Loader from '../../../Loader/Loader'
import deleteIcon from '../../../../images/delete.png'
import edit from '../../../../images/edit.png'
import qrcode from '../../../../images/qr-code.png'
import Footer from '../../../Footer/Footer'
import Alert from '../../../Alert/Alert'

const copy = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" /></svg>

const ViewURL = () => {

    const { url, message: urlMessage, error: urlError, loading: urlLoading } = useSelector(state => state.url);
    const { message: deleteUrlMessage, error: deleteUrlError, loading: deleteUrlLoading } = useSelector(state => state.deleteUrl);
    const { urlAnalytics } = useSelector(state => state.urlAnalytics);
    const { clicks } = useSelector(state => state.clicks);

    const { hash } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [urlDetails, setUrlDetails] = useState({});
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [deleteUrlHash, setDeleteUrlHash] = useState("");
    const [gerateQr, setGerateQr] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        dispatch(viewUrl(hash));
        dispatch(getUrlAnalytics(hash));
        dispatch(getClicks(hash, 'today'))
    }, [dispatch])

    useEffect(() => {
        if (url) {
            setUrlDetails({
                "Url Name": url.urlName,
                "Original Url": url.longUrl,
                "Short Url": url.shortUrl,
                "Hash": url.hash,
                "Captcha": url.captcha ? "Yes" : "No",
                // "Users": url.users,
                // "Password": url.password,
                // "Expires At": dateFormat(url.expiryDate, "d mmmm yyyy - hh:MM:ss TT"),
                "Created At": dateFormat(url.createdAt, "d mmmm yyyy - hh:MM:ss TT"),
                "Updated At": dateFormat(url.updatedAt, "d mmmm yyyy - hh:MM:ss TT"),
            })
            setStatus(url.status === 'active' ? true : false);
        }
    }, [url]);



    useEffect(() => {
        if (urlError) {
            setError(urlError);
        }
        if (deleteUrlMessage) {
            setMessage(deleteUrlMessage)
            navigate('/v/myUrls', { replace: true });
        }
        if (deleteUrlError) {
            setError(deleteUrlError);
        }

        setTimeout(() => {
            setError(null);
            setMessage(null);
        }, 5000);

        dispatch({ type: "CLEAR_MESSAGES" });
        dispatch({ type: "CLEAR_ERRORS" });

    }, [deleteUrlMessage, deleteUrlError, urlMessage, urlError])

    const handleDeleteUrl = () => {

        if (deleteUrlHash !== url?.hash) {
            return;
        }
        dispatch(deleteUrlReq(url?.hash));
        setShowDeleteModel(false);
    }

    const handleCloseGenrateQr = () => {
        setGerateQr(false);
    }

    const handleCopy = (value) => {
        window.navigator.clipboard.writeText(value);
        setMessage("Copied to clipboard");
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const handleStatusChange = () => {
        setStatus(!status);
    }

    return (
        <div className='viewUrl page-container'>
            {
                message ? <Alert text={message} type="success" /> :
                    error ? <Alert text={error} type="error" /> : null
            }
            {
                urlLoading || deleteUrlLoading ? <Loader /> :
                    url ?
                        <div className='viewUrl-container'>
                            <div className="heading">
                                <h3>URL - {url.urlName.length > 0 ? url.urlName : ""} ({url.hash})</h3>
                            </div>
                            <div className="common viewUrl-btn-section">
                                <button onClick={((e) => navigate(`/editUrl/${url.hash}`))}>
                                    <p>Edit</p>
                                    <img src={edit} alt="" />
                                </button>
                                <button onClick={(e) => setShowDeleteModel(true)} style={{ "marginLeft": "5px" }}>
                                    <p>Delete</p>
                                    <img src={deleteIcon} alt="" />
                                </button>
                                <button onClick={(e) => setGerateQr(true)} style={{ "marginLeft": "5px" }}>
                                    <p>Genrate QR</p>
                                    <img src={qrcode} alt="" />
                                </button>

                                <div className="status-toggle">
                                    <div className="label">
                                        <p>{url?.status==='active'?"Deactivate":"Activate"}</p>
                                        {/* <div className="info-tooltip">
                                            <div className="info-tooltip-i">i</div>
                                            <div className="info-tooltip-p">
                                                <p>Active - URL is active and can be used.</p>
                                            </div>
                                        </div> */}
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" onChange={handleStatusChange} checked={status}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            {
                                gerateQr ? <GenrateQR value={url?.longUrl} handleCloseGenrateQr={handleCloseGenrateQr} /> : null
                            }

                            {/* Delete url confirmation modal */}
                            {
                                showDeleteModel ?
                                    <div className="delete-model">
                                        <div className="delete-model-container">
                                            <div className="delete-model-heading">
                                                <h4>Delete URL</h4>
                                            </div>
                                            <div className="delete-model-body">
                                                <p>Type <b>{url?.hash}</b> to delete this url.</p>
                                                <input value={deleteUrlHash} onChange={(e) => setDeleteUrlHash(e.target.value)} type="text" />
                                                {deleteUrlHash.length > 0 && deleteUrlHash !== url?.hash ? <p id="delete-error">Hash does not match</p> : null}
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
                                                    {
                                                        key === "Short Url" || key === "Original Url" ? <button onClick={(e) => handleCopy(`${urlDetails[key]}`)}>{copy}</button> : null
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : null


            }
            <section className="analytics-section">
                {
                    url && urlAnalytics && clicks ?
                        <Analytics analytics={urlAnalytics} urlHash={url.hash} />
                        : null
                }
            </section>
            <Footer />
        </div>
    )
}

export default ViewURL