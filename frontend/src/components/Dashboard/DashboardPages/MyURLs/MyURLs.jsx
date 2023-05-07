import React,{useState, useEffect} from 'react'
import './MyURLs.css'
import URL from './URL'
import search from '../../../../images/search.png'
import { getMyUrls } from '../../../../Actions/Url.actions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../Loader/Loader'

const MyURLs = () => {

    const {urls, error, message, loading, pageCount} = useSelector(state => state.urls);

    const [myUrls, setMyUrls] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searched, setSearched] = useState(false);
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMyUrls(1));
    }, [dispatch])

    useEffect(() => {
        setMyUrls(urls);
        let temp = [];
        for(let i=0; i<pageCount; i++){
            temp.push(i);
        }
        setPages(temp);
    }, [urls])

    const handlePageChange = (page) => {
        if(page=='next' && currentPage<pages.length){
            setCurrentPage(currentPage+1);
            searched? dispatch(getMyUrls(currentPage+1, searchText)):
            dispatch(getMyUrls(currentPage+1));
            console.log("next");
        }
        else if(page=='prev' && currentPage>1){
            setCurrentPage(currentPage-1);
            searched? dispatch(getMyUrls(currentPage-1, searchText)):
            dispatch(getMyUrls(currentPage-1));
            console.log("prev");
        }
    }

    const handleSearch = () => {
        setSearched(true);
        setCurrentPage(1);
        dispatch(getMyUrls(1, searchText));
    }

    const hanleClearSearch = () => {
        setSearched(false);
        setSearchText('');
        dispatch(getMyUrls(1));
    }

  return (
    <div className='myurls page-container'>

      <div className="heading">
        <h3>My URLs</h3>
      </div>

        <section className="searchUrl">
            {
                searched? <div>
                    <h4>searched result for: "{searchText}"</h4>
                    <button onClick={(e)=>hanleClearSearch()} className='clear-search-btn'>Clear</button> 
                </div>: null
            }
            <input type="search" name="searchUrl" value={searchText} onChange={(e)=>setSearchText(e.target.value)} id="" placeholder='Search URL or URL short code' />
            <button className='search-btn' onClick={(e)=>handleSearch()}>
                <img src={search} alt="search"/>
            </button>
        </section>

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
                loading? <Loader />:
                myUrls && myUrls.length>0 ? myUrls.map((url, index) => {
                        return <URL key={index} sr={(currentPage-1)*6 + index+1} index={index+1} url={url} />
                }):null
            }
            {
                myUrls && myUrls.length==0 && !loading? <div className='no-urls'>
                        <h4>No URLs found</h4>
                        <button onClick={(e)=>navigate('/v/createUrl')}>Create Url +</button>
                    </div>
                : null
            }
        </section>
        <div className="pagination">
            
            {
                currentPage>1? <button className='page-btn page-btn-enabled' onClick={(e)=>handlePageChange('prev')} id='prev'>Prev</button>
                :<button id='prev' className='page-btn page-btn-disabled' >Prev</button>
            }
            {
                currentPage<pageCount? <button className='page-btn page-btn-enabled' onClick={(e)=>handlePageChange('next')} id='next'>Next</button>
                :<button id='next' className='page-btn page-btn-disabled'>Next</button>
            }

        </div>
    </div>
  )
}

export default MyURLs