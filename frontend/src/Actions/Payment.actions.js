import axios from 'axios';

// const rootUrl = 'http://localhost:4000';
const rootUrl = '';

export const checkout = (user,amount,type) => async(dispatch)=>{
    try{
        dispatch({
            type: 'checkoutRequest'
        })

        const {data:{key}} = await axios.get(`${rootUrl}/api/v1/payment/getkey`)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }
        const {data} = await axios.post(`${rootUrl}/api/v1/payment/checkout`, {amount, plan_type:type}, config);

        const order = data.order;

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Urily.com",
            description: "Test tranction for urily.com",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: "https://urily.onrender.com/api/v1/payment/verification",
            prefill: {
                name: user.username,
                email: user.email,
                contact: "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#520569"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();

        dispatch({
            type: 'checkoutSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'checkoutFailure',
            // payload: error.response.data.error
        })
    }
}