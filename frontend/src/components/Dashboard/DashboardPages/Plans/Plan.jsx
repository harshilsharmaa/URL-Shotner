import React,{useState} from 'react'
import { PlanData } from './PlanData'
import './Plan.css'
import cross from '../../../../images/cross.png'
import check from '../../../../images/check.png'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Alert from '../../../Alert/Alert'


const Plan = () => {
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate()

    const [error, setError] = useState(false);

    const handleClick = (id) => {
        if(id===0) return;
        if(user?.premiumPlan) {
            setError(true);
            setTimeout(() => {
                setError(false);
            },5000)
            return;
        }
        navigate(`/v/buy-plan/${id}`)
    }

    return (
        <div className='plans page-container'>
            {
                error && <Alert type='error' text='You already have a plan'/>
            }
            <div className="heading">
                <h3>Subscription Plans</h3>
            </div>
            <div className="subheading">
                <p>Choose your premimum</p>
            </div>
            <div className="plans-container">
                {
                    PlanData.map((plan) => {
                        return (
                            <div className={plan.id==user.premiumPlan?"plan-card selected-plan":"plan-card"} key={plan.id} onClick={(e)=>handleClick(plan.id)}>
                                {
                                    plan.id==user.premiumPlan && <div className="selected-plan-tag">
                                        <p>Current Plan</p>
                                    </div>
                                }
                                <div className="plan-heading">
                                    <p>{plan.name}</p>
                                </div>
                                <div className="plan-price">
                                    <p>{plan.price}</p>
                                </div>
                                <div className="plan-body">
                                    {
                                        plan.features.map((feature, index) => {
                                            return (

                                                <div className="plan-body-item" key={index}>
                                                    <h4 className='text'>{feature.name}</h4>
                                                    {
                                                        feature.value? <img src={check} alt="Yes" />:
                                                        <img src={cross} alt="No" />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Plan


//