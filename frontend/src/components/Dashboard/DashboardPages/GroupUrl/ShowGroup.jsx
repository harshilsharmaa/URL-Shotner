import React, { useEffect, useState } from 'react'
import './ShowGroup.css'
import { useParams, useNavigate } from 'react-router-dom'
import dateFormat from "dateformat";
import { useSelector, useDispatch } from 'react-redux'
import { getGroupById } from '../../../../Actions/Url.actions'
import URL from '../MyURLs/URL';
import Alert from '../../../Alert/Alert'
import Loader from '../../../Loader/Loader'
import deleteIcon from '../../../../images/delete.png'
import edit from '../../../../images/edit.png'
import {deleteGroupReq} from '../../../../Actions/Url.actions'

const ShowGroup = () => {

  const { group, loading, message, error } = useSelector(state => state.groupById);
  const {deleteGroup, loading: deleteGroupLoading, message:deleteGroupMessage, error:deleteGroupError} = useSelector(state => state.deleteGroup);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    dispatch(getGroupById(id));
  }, [id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_ERRORS" })
      }, 3000);
    }
    if (message) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGES" })
      }, 3000);
    }
    if(deleteGroupMessage){
      dispatch({ type: "CLEAR_GROUP" })
      navigate('/v/group')
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGES" })
      }, 3000);
    }
    if(deleteGroupError){
      setTimeout(() => {
        dispatch({ type: "CLEAR_ERRORS" })
      }, 3000);
    }
  }, [error, message, deleteGroupMessage])

  const handleDeleteGroup = () => {
    if (confirmText === "delete group") {
      dispatch(deleteGroupReq(id));
    }
  }

  return (
    <div className='showGroup page-container'>

      {
        loading || deleteGroupLoading ? <Loader /> :

          group ?
            <div className="group">
              <div className="heading">
                <h3>Group {group?.urlGroupName}</h3>
              </div>
              <div className="common viewUrl-btn-section">
                <button>
                  <p>Edit</p>
                  <img src={edit} alt="" />
                </button>
                <button onClick={(e) => setShowDeleteModel(true)} style={{ "margin-left": "5px" }}>
                  <p>Delete</p>
                  <img src={deleteIcon} alt="" />
                  {
                    showDeleteModel ?
                      <div className="delete-model">
                        <div className="delete-model-container">
                          <div className="delete-model-heading">
                            <h4>Delete URL</h4>
                          </div>
                          <div className="delete-model-body">
                            <p>Type <b>delete group</b> to delete this group.</p>
                            <input value={confirmText} onChange={(e)=>setConfirmText(e.target.value)} type="text" />
                            {confirmText.length > 0 && confirmText !== "delete group" ? <p id="delete-error">text does not match</p> : null}
                          </div>
                          <div className="delete-model-footer">
                            <button id='delete' onClick={(e) => handleDeleteGroup()}>Delete</button>
                            <button id='cancle' onClick={(e) => setShowDeleteModel(false)}>Cancel</button>
                          </div>
                        </div>
                      </div> : null
                  }
                </button>
                <button onClick={(e)=>navigate(`/v/group/analytics/${group._id}`)} style={{ "margin-left": "5px" }}>
                  <p>Analytics</p>
                  <img src="a" alt="" />
                </button>
              </div>

              <div className="url-details">
                <div className="url-detail-box">
                  <div className="left">
                    <h4>Name</h4>
                  </div>
                  <div className="right">
                    <h4>{group.urlGroupName}</h4>
                  </div>
                </div>
                <div className="url-detail-box">
                  <div className="left">
                    <h4>Created At</h4>
                  </div>
                  <div className="right">
                    <h4>{dateFormat(group.createdAt, "d mmmm yyyy - hh:MM:ss TT")}</h4>
                  </div>
                </div>
              </div>

              <div className="urlList-heading">
            <div className="urlList-heading-component sr">
                <p>Sr.</p>
            </div>
            <div className="urlList-heading-component name">
                <p>Name</p>
            </div>
            <div className="urlList-heading-component comb-url">
                <p>URL</p>
            </div>
            <div className="urlList-heading-component expiry">
                <p>Expiry</p>
            </div>
            <div className="urlList-heading-component analytics">
                <p>View</p>
            </div>
            <div className="urlList-heading-component edit">
                <p>Edit</p>
            </div>
        </div>
              <section className='urlList'>
            {
                group.urls.map((url, index) => {
                    return <URL key={index} sr={index+1} index={index+1} url={url} />
                })
            }
        </section>

            </div> : null

      }

      {
        message ? <Alert text={message} type="success" /> :
          error ? <Alert text={error} type="error" /> : null
      }
    </div>
  )
}

export default ShowGroup