import React,{useEffect} from 'react'
import './PaymentSuccess.css'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {


  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get('reference');

  return (
    <div className='paymentSuccess page-container'>

        <div className="paymentSuccess-body">
            <h3>Payment Success</h3>
            <p>Reference No. {reference}</p>
        </div>
    </div>
  )
}

export default PaymentSuccess