import React from 'react'
import './InvitePeople.css'
import { useSelector } from 'react-redux'
import whatsapp from '../../../../images/whatsapp.png'

const InvitePeople = () => {

    const {user} = useSelector(state => state.user)

  return (
    <div className='invite-people page-container'>
        <div className="heading">
            <h3>Invite People</h3>
        </div>
        <div className="invite-people-content">
            <p>Invite People to urily.com and earn some urily points.</p>
            <div className="invite-people-link">
                <input type="text" value={`https://urily.com/register?utm=${user?.utmCode}`} readOnly />
                <button>Copy</button>
            </div>
            <div className="invite-people-social">
                <h4>Share on social</h4>
                <a href={`https://web.whatsapp.com/send?text=${user.username} has invited you to join Urily.%0A%0AUrily is a platform where you can short long and ugly urls.%0A%0AHere is the link to join Urily: https://urily.com/register?utm=${user?.utmCode}`} data-action="share/whatsapp/share" target={"_blank"}><img src={whatsapp} alt="" /></a>


            </div>
        </div>
    </div>
  )
}

export default InvitePeople