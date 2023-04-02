import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PlanData } from '../Plans/PlanData'
import {checkout} from '../../../../Actions/Payment.actions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../Loader/Loader'
import './BuyPlan.css'

const BuyPlan = () => {

    const {order, loading} = useSelector(state => state.order);
    const {user} = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {type} = useParams();

    const [plan, setPlan] = useState({})

    useEffect(() => {
        if(type==='30' || type==='360'){
            if(type==='30') setPlan(PlanData[1]);
            if(type==='360') setPlan(PlanData[2]);
            return;
        } 
        navigate('/plans')
    }, [type])

    useEffect(()=>{
        if(order){
            console.log(order)
        }
    },[order])

    const checkoutHandler = (price) => {
        dispatch(checkout(user,price,type));
    }

  return (
    <div className='buyPlan page-container'>
        <div className="heading">
            <h3>Buy Plan</h3>
        </div>
        {
            loading ? <Loader /> :null
        }
        <div className="plan-info">
            <p>Plan - {plan.name}</p>
            <p>Price - {plan.price}</p>
        </div>
        <div className="buyPlan-body">
            <div className="buyPlan-body-left">
                <div className="buy-plan-features">
                    {
                        plan.features?.filter((feature) => feature.value===1).map((feature, index) => {
                            return (
                                <div className="buy-plan-feature-item" key={index}>
                                    <h4 className='text'>{feature.name}</h4>
                                </div>
                            )
                        })
                    }
                </div>
                <button>Change Plan</button>
            </div>
            <div className="buyPlan-body-vertical-line"></div>
            <div className="buyPlan-body-right">
                <div className="place-order-card">
                    <div className="item">
                        <p>Plan</p>
                        <p>{plan.name}</p>
                    </div>
                    <div className="item">
                        <p>Price</p>
                        <p>{plan.price}</p>
                    </div>
                    <div className="item-horizontal-line"></div>
                    <div className="item">
                        <p>Total</p>
                        <p>{plan.price}</p>
                    </div>
                    <button onClick={(e)=>checkoutHandler(plan.price)}>Place Order</button>
                </div>
            </div>
            <div className="buyPlan-features">

            </div>
        </div>
    </div>
  )
}

export default BuyPlan