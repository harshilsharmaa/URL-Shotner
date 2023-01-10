import React from 'react'
import './MyURLs.css'
import URL from './URL'
import search from '../../../../images/search.png'

const MyURLs = () => {
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
                <p>Analytics</p>
            </div>
            <div className="urlList-heading-component edit">
                <p>Edit</p>
            </div>
        </div>
        <section className='urlList'>
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
            <URL />
        </section>
    </div>
  )
}

export default MyURLs