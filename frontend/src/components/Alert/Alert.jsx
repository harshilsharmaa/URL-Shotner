import React from 'react'
import './Alert.css'

const Alert = ({text, type}) => {
    return (
        <div className={`alert ${type}`}>
            {/* <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> */}
            {text}
        </div>
    )
}

export default Alert