import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUrl } from '../../../../Actions/Url.actions';
import {urlsLimit} from '../../../../Actions/User.actions';
import { useNavigate } from 'react-router-dom';
import './CreateURL.css';
import Alert from '../../../Alert/Alert';
import Loader from '../../../Loader/Loader';

const CreateURL = () => {

  const { message, error } = useSelector(state => state.createUrl);
  const {user} = useSelector(state => state.user);
  const {overLimit, loading} = useSelector(state => state.urlsLimit);

  const [originalUrl, setOriginalUrl] = useState('')
  const [urlName, setUrlName] = useState('')
  const [disableContent, setDisableContent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(urlsLimit());
  },[])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGES' });
      }, 0);
      navigate('/v/myUrls');
    }
    if (error) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERRORS' });
      }, 5000);
    }
  }, [message, error])

  useEffect(() => {
    if(overLimit===true){
      setDisableContent(true);
    }
    
    return () => {
      setDisableContent(false);
    }
  },[overLimit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlData = {};
    if (originalUrl) urlData.originalUrl = originalUrl;
    if (urlName) urlData.urlName = urlName;

    dispatch(createUrl(urlData));
  }

  return (
    <div className='createURL page-container'>
      <div className="heading">
        <h3>Create URL</h3>
      </div>
      {
        error && <Alert type='error' text={error} />
      }
      {
        loading ? <Loader /> :
        disableContent ? 
        <div className='disabled-page'>
          <h4>Sorry, you have reached your weekly limit of {user?.urlsLimitPerWeek} URLs.</h4>
          <p>Upgrade to premium to create more URLs. or wait for next week</p>
          <button>Buy Plan</button>
        </div> 
        : null
      }



      <section className='create-url-upper'>
        <form onSubmit={handleSubmit} action="" className='createUrl-form'>
          <div className="form-component">
            <input type="url" name="originalUrl" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} id="" placeholder='Enter Long URL' />
          </div>
          <div className="form-component optional">
            <h4>Optional</h4>
          </div>
          <div className="form-component">
            <input type="text" name="urlName" value={urlName} onChange={(e) => setUrlName(e.target.value)} id="" placeholder='Enter Url Name (Optional)' />
          </div>
          <button>Create</button>
        </form>
      </section>
    </div>
  )
}

export default CreateURL