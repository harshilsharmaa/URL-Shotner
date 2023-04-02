import React, { useState, useEffect } from 'react'
import './GroupUrl.css'
import dateFormat from "dateformat";
import search from '../../../../images/search.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../../Actions/Url.actions';
import Loader from '../../../Loader/Loader';


const GroupUrl = () => {

  const { allGroups, loading, error, message } = useSelector(state => state.allGroups)
  console.log(allGroups);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getGroups());
  }, [])


  const handleSearch = () => {
    setSearched(true);
    setCurrentPage(1);
  }

  const hanleClearSearch = () => {
    setSearched(false);
    setSearchText('');
  }

  return (
    <div className='groupUrl page-container'>
      <div className="heading">
        <h3>Url Group</h3>
      </div>

      <section className="searchUrl">
        {
          searched ? <div>
            <h4>searched result for: "{searchText}"</h4>
            <button onClick={(e) => hanleClearSearch()} className='clear-search-btn'>Clear</button>
          </div> : null
        }
        <input type="search" name="searchUrl" value={searchText} onChange={(e) => setSearchText(e.target.value)} id="" placeholder='Search Group' />
        <button className='search-btn' onClick={(e) => handleSearch()}>
          <img src={search} alt="search" />
        </button>
      </section>

      <div className="group-section">
        <div onClick={(e) => navigate('/create/group')} className="create-group-card">
          <h1>+</h1>
          <p>Create Group</p>
        </div>

        {
          loading ? <Loader/> :
          allGroups?.length > 0 ? allGroups.map((group, index) => {
            return (
              <div onClick={(e)=>navigate(`/group/${group._id}/${group.urlGroupName}`)} key={index} className="group-card">
                <div className="group-card-header">
                  <div className="name">
                    <h4>{group.urlGroupName}</h4>
                  </div>
                  <h5>435</h5>
                </div>
                <div className="group-card-body">
                  <div className="group-body-item">
                    <p>Urls</p>
                    <p>{group.urls.length}</p>
                  </div>
                  <div className="group-body-item">
                    <p>Created At</p>
                    <p>{dateFormat(group?.createdAt, "dd-mm-yyyy")}</p>
                  </div>
                </div>
              </div>
            )
          })
            : null
        }



      </div>
    </div>
  )
}

export default GroupUrl