import React,{useState, useEffect} from 'react'
import './EditUrl.css'
import {useSelector, useDispatch} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { viewUrl, editUrl } from '../../../../Actions/Url.actions'
import Loader from '../../../Loader/Loader';
import Alert from '../../../Alert/Alert';
// import SmallLoader from '../../../Loader/SmallLoader';

const EditUrl = () => {

    const { url, message: urlMessage, error: urlError, loading: urlLoading } = useSelector(state => state.url);

    const {updatedUrl, message: updatedUrlMessage, error: updatedUrlError} = useSelector(state => state.updatedUrl);
    
    const { hash } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [urlName, setUrlName] = useState("");
    // const [expiryDate, setExpiryDate] = useState(url?.expiryDate);
    const [captcha, setCaptcha] = useState(false);
    const [customUrl, setCustomUrl] = useState("");
    const [customHash, setCustomHash] = useState(false);
    const [customUrlCheckbox, setCustomUrlCheckbox] = useState("");

    useEffect(() => {
        if(!url){
            dispatch(viewUrl(hash));
        }
    }, [])

    useEffect(() => {
        if(url){
            setUrlName(url.urlName);
            // setExpiryDate(url.expiryDate);
            setCaptcha(url.captcha);
            setCustomUrl(url.hash);
            setCustomHash(url.customHash);
        }
    }, [url])

    useEffect(() => {
        if (updatedUrlMessage) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGES' });
            }, 5000);

            navigate(`/v/url/${updatedUrl.hash}`, { replace: true })
        }
        if (updatedUrlError || urlError) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_ERRORS' });
            }, 5000);
        }
        if(urlMessage){
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGES' });
            }, 5000);
        }
    }, [updatedUrlMessage, updatedUrlError, urlMessage, urlError])

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlData = {};
        // console.log(expiryDate);
        if (urlName) urlData.urlName = urlName;
        // if (expiryDate) urlData.expiryDate = expiryDate;
        if (captcha) urlData.captcha = captcha;
        if (customUrl) urlData.customUrl = customUrl;

        dispatch(editUrl(hash, urlData));
    }

    return (
        <div className='editUrl page-container'>
            <div className="editUrl-header">
                <h3>Edit URL</h3>
            </div>
            {
            !urlLoading? 
            <div className="editUrl-body">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="url-details edit-url-details">

                        <div className="url-detail-box">
                            <div className="left">
                                <h4>Url Name</h4>
                            </div>
                            <div className="right">
                                <input onChange={(e)=>setUrlName(e.target.value)} value={urlName} maxLength={10} type="text" name="urlName" id="" placeholder='Enter here'/>
                            </div>
                        </div>
                        {/* <div className="url-detail-box">
                            <div className="left">
                                <h4>Expiry Date</h4>
                            </div>
                            <div className="right">
                                <input value={url?.expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} type="date" name="" id="" />
                            </div>
                        </div> */}
                        <div className="url-detail-box">
                            <div className="left">
                                <h4>Captcha confirmation</h4>
                            </div>
                            <div className="right">
                            <input checked={captcha} onChange={(e)=>setCaptcha(e.target.checked)} type="checkbox" name="" id="" />
                                {/* radio buttons for add or remove captcha */}
                                {/* <div className="captcha-radio">
                                    <div className="radio">
                                        <input type="radio" name="captcha" id="captcha" />
                                        <label htmlFor="captcha">Add</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="captcha" id="captcha" />
                                        <label htmlFor="captcha">Remove (default)</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="url-detail-box">
                            <div className="left">
                                <h4>Custome url</h4>
                            </div>
                            <div className="right">
                                <div className="custom-available">
                                    <input checked={customHash} onChange={(e)=>setCustomHash(e.target.checked)} type="checkbox" name="" id="" />
                                    {
                                        customUrlCheckbox || url?.captcha ?
                                        <div className="check-available">
                                            <input onChange={(e)=>setCustomUrl(e.target.value)} value={customUrl} minLength={7} maxLength={12} type="text" name="" id="" placeholder='Ex: abcd'/>
                                            {/* <button onClick={(e)=>{}} >Check</button>
                                            <SmallLoader/> */}
                                        </div>:null
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-container">
                            <button id='save-edit-btn'>Save</button>
                        </div>
                    </div>
                </form>
                {
                    urlMessage || updatedUrlMessage ? <Alert type={"success"} text={urlMessage || updatedUrlMessage} />
                    : urlError || updatedUrlError ? <Alert type={"error"} text={urlError ||updatedUrlError} />
                    : null
                }
            </div>
            : <Loader/>
            }
        </div>
    )
}

export default EditUrl