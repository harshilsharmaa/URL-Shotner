import React from 'react'
import './EditUrl.css'

const EditUrl = () => {
  return (
    <div className='editUrl page-container'>
            <div className="editUrl-header">
                <h3>Edit URL</h3>
            </div>
            <div className="editUrl-body">
                <form>
                    <div className="editUrl-body-input">
                        <label htmlFor="url">URL</label>
                        <input type="text" name="url" id="url" />
                    </div>
                    <div className="editUrl-body-input">
                        <label htmlFor="shortUrl">Short URL</label>
                        <input type="text" name="shortUrl" id="shortUrl" />
                    </div>
                    <div className="editUrl-body-input">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" />
                    </div>
                </form>
        </div>
    </div>
  )
}

export default EditUrl