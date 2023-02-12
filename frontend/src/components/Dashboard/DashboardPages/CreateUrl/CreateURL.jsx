import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createUrl} from '../../../../Actions/Url.actions';
import {useNavigate } from 'react-router-dom';
import './CreateURL.css';

const CreateURL = () => {

  const {message, error} = useSelector(state => state.createUrl);

  const [originalUrl, setOriginalUrl] = useState('')
  const [urlName, setUrlName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlData = {};
    if(originalUrl) urlData.originalUrl = originalUrl;
    if(urlName) urlData.urlName = urlName;
    if(expiryDate) urlData.expiryDate = expiryDate;

    dispatch(createUrl(urlData));
  }

  useEffect(() => {
    if(message) {
      console.log(message);
      setTimeout(() => {
        dispatch({type: 'CLEAR_MESSAGES'});
      }, 0);
      navigate('/myUrls');
    }
    if(error){
      console.log(error)
    }
  },[message,error])

  return (
    <div className='createURL page-container'>
        <div className="heading">
        <h3>Create URL</h3>
      </div>

      <section className='create-url-upper'>
        <form onSubmit={handleSubmit} action="" className='createUrl-form'>
          <div className="form-component">
            <input type="url" name="originalUrl" value={originalUrl} onChange={(e)=>setOriginalUrl(e.target.value)} id="" placeholder='Enter Long URL' />
          </div>
          <div className="form-component optional">
            <h4>Optional</h4>
          </div>
          <div className="form-component">
            <input type="text" name="urlName" value={urlName} onChange={(e)=>setUrlName(e.target.value)} id="" placeholder='Enter Url Name (Optional)' />
          </div>
          <div className="form-component date">
            <input type="date" name="expiryDate" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} id="" />
          </div>
            <button>Create</button>
        </form>
      </section>
    </div>
  )
}

export default CreateURL