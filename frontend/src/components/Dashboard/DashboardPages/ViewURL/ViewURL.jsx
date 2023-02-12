import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewUrl } from '../../../../Actions/Url.actions'
import ClicksCards from '../../Analytics/ClickCards/ClicksCards';
import Analytics from '../../Analytics/Analytics'
import './ViewURL.css'
import '../../../common.css'
import Loader from '../../../Loader/Loader'
import csv from '../../../../images/csv.png'
import pdfIcon from '../../../../images/pdfIcon.png'
import deleteIcon from '../../../../images/delete.png'
import copy from '../../../../images/copy.png'
import edit from '../../../../images/edit.png'
import Footer from '../../../Footer/Footer'


const ViewURL = () => {

    const { url, message, error, loading } = useSelector(state => state.url);


    const { hash } = useParams();
    const dispatch = useDispatch();

    const [urlDetails, setUrlDetails] = useState({})

    useEffect(() => {
        dispatch(viewUrl(hash));
    }, [dispatch])

    useEffect(() => {
        if (url) {
            setUrlDetails({
                // ...urlDetails,
                "Url Name": url.urlName,
                "Original Url": url.longUrl,
                "Short Url": url.shortUrl,
                "Hash": url.hash,
                "Users": url.users,
                // "Clicks": url.clicks.count,
                "Password": url.password,
                "Expires At": dateFormat(url.expiryDate, "d mmmm yyyy - hh:MM:ss TT"),
                "Created At": dateFormat(url.createdAt, "d mmmm yyyy - hh:MM:ss TT"),
                "Updated At": dateFormat(url.updatedAt, "d mmmm yyyy - hh:MM:ss TT"),
            })
        }
        if (message) {
            console.log(message);
            console.log(loading);
        }
        if (error) {
            console.log(error);
        }
    }, [url, message, error, loading])

    return (
        <div className='viewUrl page-container'>
            {
                loading ? <Loader/> :
                    url ?
                        <div>
                            <div className="heading">
                                <h3>URL - {url.urlName.length > 0 ? url.urlName :""} ({url.hash})</h3>
                            </div>
                            <div className="common viewUrl-btn-section">
                                <button>
                                    <p>Edit</p>
                                    <img src={edit} alt="" />
                                </button>
                                <button style={{"margin-left":"5px"}}>
                                    <p>Delete</p>
                                    <img src={deleteIcon} alt="" />
                                </button>
                                {/* <button>
                                    <p>Analytics</p>
                                    <img src={pdfIcon} alt="" />
                                </button> */}
                            </div>
                            <div className="url-details">
                                {
                                    Object.keys(urlDetails).map((key, index) => {
                                        return (
                                            <div className="url-detail-box" key={index}>
                                                <div className="left">
                                                    <h4>{key}</h4>
                                                </div>
                                                <div className="right">
                                                    {
                                                        !urlDetails[key] ? <h4>-</h4> :
                                                        <h4>{urlDetails[key]}</h4>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> :
                        error ? <h1>{error}</h1> :
                            message ? <h1>{message}</h1> : null
            }

            <section className="clicks-section">
                <ClicksCards />
            </section>

            <section className="analytics-section">
                <Analytics/>
            </section>

            {/* <Footer /> */}

        </div>
    )
}

export default ViewURL