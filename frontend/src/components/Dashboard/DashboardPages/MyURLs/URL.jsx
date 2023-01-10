import React from 'react'
import './URL.css'
import copy from '../../../../images/copy.png'
import view from '../../../../images/view.png'
import edit from '../../../../images/edit.png'

const URL = () => {

    const clicked = (e) => {
        console.log("id");
    }

  return (
    <div className='url'>
        <div className="url-component sr">
            <p>1</p>
        </div>

        <div className="url-component name">
            <p>Amazone Link</p>
        </div>

        <div className="url-component comb-url">
            <p id='shortUrl'>https://urily/adgad <span><img src={copy} alt="" /></span></p> 
            <p id='longUrl'>https://amazone.com/adshvk/32dsdkhiasd?ihas </p>
        </div>

        <div className="url-component expiry">
            <p>Never</p>
        </div>

        <div className="url-component analytics">
            <img src={view} alt="" />
        </div>

        <div onClick={()=>clicked()} className="url-component edit">
            <img src={edit} alt="" />
        </div>

    </div>
  )
}

export default URL