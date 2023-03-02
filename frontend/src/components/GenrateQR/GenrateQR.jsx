import React, { useState } from 'react'
import QRCode from "react-qr-code";
import './GenrateQR.css'
import downloadIcon from '../../images/download.png'
import { Canvg } from 'canvg';

const GenrateQR = ({ value, handleCloseGenrateQr }) => {

    const handleQrDownload = () => {

        const canvas = document.getElementById('qr-code');
        console.log(canvas);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }


    return (
        <div className='qr-code'>
            <div className="qr-code-container">
                <div className="qr-code-header">
                    <h4>QR Code</h4>
                    <button onClick={(e) => handleCloseGenrateQr()}>X</button>
                </div>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 360, width: "100%" }}>
                    <QRCode
                        id='qr-code'
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`300 0 256 256`}
                    />
                </div>
                <div className="qr-code-btn">
                    <button onClick={(e) => handleQrDownload()}>
                        <p>Genrate QR</p>
                        <img src={downloadIcon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GenrateQR