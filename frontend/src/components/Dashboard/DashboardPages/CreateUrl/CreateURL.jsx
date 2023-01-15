import React from 'react'
import './CreateURL.css'

const CreateURL = () => {
  return (
    <div className='createURL page-container'>
        <div className="heading">
        <h3>Create URL</h3>
      </div>

      <section className='create-url-upper'>
        <form action="">
            <input type="url" name="longURL" id="" placeholder='Enter Long URL' />
            <button>Shorten</button>
        </form>
        <div className="output">
            <p>Short URL</p>
            <p>https://urily/adgad</p>
        </div>
      </section>
    </div>
  )
}

export default CreateURL