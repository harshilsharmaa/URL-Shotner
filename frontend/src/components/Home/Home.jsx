import React,{useState} from 'react'

import './Home.css'
import custom from '../../images/custom.png'
import qrcode from '../../images/qrcode.jpg'
import collaborate from '../../images/collaborate.jpg'
import password from '../../images/password.jpg'
import graph from '../../images/graph.png'

import axios from 'axios'

const Home = () => {

    const [originalUrl, setOriginalUrl] = useState('')

    const [shortUrl, setShortUrl] = useState('')

    const [copyBtnValue, setCopyBtnValue] = useState('Copy')
    const [copied, setCopied] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const postOriginalUrl = async () => {


            const {data} = await axios.post('/shorten', {originalUrl},{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            
            setShortUrl(window.location.href+data.urlId);
        }
        postOriginalUrl();

    }

    function copyText() {

        /* Select the text field */
        // shortUrl.select();
        // shortUrl.setSelectionRange(0, 99999); /* For mobile devices */
      
         /* Copy the text inside the text field */
        navigator.clipboard.writeText(shortUrl);
      

        setCopyBtnValue('Copied');
        setCopied(true);
        
        setInterval(() => {
            setCopyBtnValue('Copy');
            setCopied(false);
        },3000)
      }

  return (
    <div className='home'>

        <div className="header">
            <h2>Urliy.com</h2>
            <p id='title'>Shorten Your Long Ugly URL 🤪</p>

            <form className="url-form"  onSubmit={handleSubmit}>
                <input type="text" label="Enter URL"  onChange={(e)=>{setOriginalUrl(e.target.value)}}/>
                <button>Shorten</button>
            </form>

            {
                shortUrl && shortUrl.length>0 ? (
                <div className="showUrl">

                    <h3>{shortUrl}</h3> 
                    <button className='copyBtn' style={{ color: copied? "#fff": "", background: copied ? "green" : "#03031f", border: copied ? "none" : "" }}  onClick={copyText}>{copyBtnValue}</button>
                </div>
                ): null
            }
        </div>


        <div className="login-section">
            <p>Login Now to access all features <a href="/login">Login</a></p>
        </div>

        <div className="features-section">
            <h3>Features</h3>

            <div className="features-div">
                <div className="feature-box">
                    <h4>Custom Url</h4>
                    <p className='feature-description'>Customize your URLs. Add custom name or codes.</p>
                    <div className="feature-image">
                        <img src={custom} alt="custom" />;
                    </div>
                </div>
                <div className="feature-box">
                    <h4>Analytics</h4>
                    <p className='feature-description'>Get URLs click count and genrate report.</p>
                    <div className="feature-image">
                    <img src={graph} alt="" srcset="" />
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>QR Code</h4>
                    <p className='feature-description'>Generate QR code for your URLs.</p>
                    <div className="feature-image">
                    <img src={qrcode} alt="qrcode"/>
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>See your URLs</h4>
                    <p className='feature-description'>See all your URLs in one place.</p>
                    <div className="feature-image">
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>Collaborate</h4>
                    <p className='feature-description'>Invite your team member.</p>
                    <div className="feature-image">
                    <img src={collaborate} alt="collaborate"/>
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>Share</h4>
                    <p className='feature-description'>Share your URLs with your friends.</p>
                    <div className="feature-image">
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>Link Expiry</h4>
                    <p className='feature-description'>Set expiry date for your URLs.</p>
                    <div className="feature-image">
                    <img src={password} alt="password"/>
                        
                    </div>
                </div>
                <div className="feature-box">
                    <h4>Link Password</h4>
                    <p className='feature-description'>Set password for your URLs.</p>
                    <div className="feature-image">
                    <img src={password} alt="password"/>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Home