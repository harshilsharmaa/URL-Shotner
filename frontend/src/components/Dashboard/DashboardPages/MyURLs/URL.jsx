import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './URL.css'
import copy from '../../../../images/copy.png'
import view from '../../../../images/view.png'
import edit from '../../../../images/edit.png'

const URL = ({url,sr}) => {

    const clicked = (e) => {
        console.log("id");
    }
  return (
    <div className='url'>
        <div className="url-component sr">
            <p>{sr}</p>
        </div>

        <div className="url-component name">
            <p>{url.urlName}</p>
        </div>

        <div className="url-component comb-url">
            <p id='shortUrl'>{url.shortUrl}<span><img src={copy} alt="" /></span></p> 
            <p id='longUrl'>{ url.longUrl.slice(0, 50)+". . ." }</p>
        </div>

        <div className="url-component expiry">
            <p>Never</p>
        </div>

        <div className="url-component analytics">
            <Link to={`/url/${url.hash}`}>
                <img src={view} alt="" />
            </Link>
        </div>

        <div className="url-component edit">
            <Link to={`/editUrl/${url.hash}`}>
                <img src={edit} alt="" />
            </Link>
        </div>
    </div>
  )
}

export default URL