import React,{useState, useEffect} from 'react'
import './MyURLs.css'
import URL from './URL'
import search from '../../../../images/search.png'
import { getMyUrls } from '../../../../Actions/Url.actions'
import { useSelector, useDispatch } from 'react-redux'

const MyURLs = () => {

    const {urls, error, message, status} = useSelector(state => state.urls);

    const [myUrls, setMyUrls] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyUrls());
    }, [])

    useEffect(() => {
        setMyUrls(urls)
        // console.log(urls)
    }, [urls])

  return (
    <div className='myurls page-container'>
      <div className="heading">
        <h3>My URLs</h3>
      </div>

        <section className="searchUrl">
            <input type="search" name="searchUrl" id="" placeholder='Search URL or URL short code' />
            <button>
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
                myUrls && myUrls.length>0 ? myUrls.map((url, index) => {
                    return <URL key={index} index={index+1} url={url} />
                }):null
            }
        </section>
    </div>
  )
}

export default MyURLs