import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <div className='loader_container'>
                <div className="loading-dots">
                    <div className="snippet" data-title="dot-flashing">
                        <div className="stage">
                            <div className="dot-flashing"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader