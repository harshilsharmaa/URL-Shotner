import React,{useState} from 'react'

import './Home.css'
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
        <h2>Urliy.com</h2>
        <p>Shorten Your Long Ugly URL 🤪</p>

        <form className="form"  onSubmit={handleSubmit}>
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
  )
}

export default Home