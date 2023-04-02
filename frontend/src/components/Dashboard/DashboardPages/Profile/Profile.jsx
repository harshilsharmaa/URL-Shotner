import React,{useState, useEffect} from 'react'
import './Profile.css'
import dateFormat from "dateformat";
// import '../../../common.css'
import deleteIcon from '../../../../images/delete.png'
import edit from '../../../../images/edit.png'
import { useSelector, useDispatch } from 'react-redux'
import {deleteAccount} from '../../../../Actions/User.actions'
import {useNavigate} from 'react-router-dom';

const Profile = () => {

  const { user } = useSelector(state => state.user);

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = ()=>{
    if(confirmText!=='delete account') return;
    dispatch(deleteAccount());
  }

  useEffect(()=>{
    if(!user){
      navigate('/v/login');
    }
  },[user])

  return (
    <div className='profile page-container'>
      <div className="heading">
        <h3>Profile</h3>
      </div>
      <div className="common viewUrl-btn-section">
        <button>
          <p>Edit</p>
          <img src={edit} alt="" />
        </button>
        {/* <button onClick={(e) => setShowDeleteModel(true)} style={{ "margin-left": "5px" }}> */}
        <button style={{ "margin-left": "5px" }}>
          <p>Change Password</p>
          <img src={edit} alt="" />
        </button>
      </div>
      <section className='accountInfo'>
        <div className="subHeading">
          <h4>Account Information</h4>
        </div>
        <div className="url-details">
          <div className="url-detail-box">
            <div className="left">
              <h4>Name</h4>
            </div>
            <div className="right">
              <h4>{user?.username}</h4>
            </div>
          </div>
          <div className="url-detail-box">
            <div className="left">
              <h4>Email</h4>
            </div>
            <div className="right">
              <h4>{user?.email}</h4>
            </div>
          </div>
          <div className="url-detail-box">
            <div className="left">
              <h4>Memership Type</h4>
            </div>
            <div className="right">
              <h4>{user?.premiumMember ? "Premium" : "Free"}</h4>
            </div>
          </div>
          <div className="url-detail-box">
            <div className="left">
              <h4>URLs Limit</h4>
            </div>
            <div className="right">
              <h4>{user?.premiumMember ? "Unlimited": `${5-user?.urls.length}`}</h4>
            </div>
          </div>
          <div className="url-detail-box">
            <div className="left">
              <h4>Urily Points</h4>
            </div>
            <div className="right">
              <h4>{user?.points}</h4>
            </div>
          </div>
          <div className="url-detail-box">
            <div className="left">
              <h4>Member Since</h4>
            </div>
            <div className="right">
              <h4>{dateFormat(user?.createdAt, "d mmmm yyyy - hh:MM:ss TT")}</h4>
            </div>
          </div>
        </div>
      </section>
      <section className='secondry-info'>

      </section>

      <div className="profile-bottom">
        <button onClick={(e) => setShowDeleteModel(true)} id='delete-acc'>Delete my account</button>
        {
          showDeleteModel ?
            <div className="delete-model">
              <div className="delete-model-container">
                <div className="delete-model-heading">
                  <h4>Delete URL</h4>
                </div>
                <div className="delete-model-body">
                  <p>Type <b>delete account</b> to delete your account.</p>
                  <input value={confirmText} onChange={(e)=>setConfirmText(e.target.value)} type="text" />
                  {confirmText > 0 && confirmText !== "delete account" ? <p id="delete-error">text does not match</p> : null}
                </div>
                <div className="delete-model-footer">
                  <button id='delete' onClick={(e)=>handleDeleteAccount()}>Delete</button>
                  <button id='cancle' onClick={(e) => setShowDeleteModel(false)}>Cancel</button>
                </div>
              </div>
            </div> : null
        }
      </div>
    </div>
  )
}

export default Profile