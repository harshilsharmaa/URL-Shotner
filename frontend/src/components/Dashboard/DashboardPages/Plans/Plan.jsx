import React from 'react'
import { PlanData } from './PlanData'
import './Plan.css'
import cross from '../../../../images/cross.png'
import check from '../../../../images/check.png'


const Plan = () => {
    // console.log(PlanData)
    return (
        <div className='plans page-container'>
            <div className="heading">
                <h3>Subscription Plans</h3>
            </div>
            <div className="plans-container">
                {
                    PlanData.map((plan) => {
                        return (
                            <div className="plan-card" key={plan.id}>
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