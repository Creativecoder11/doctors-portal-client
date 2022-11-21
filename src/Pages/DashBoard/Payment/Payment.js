import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData()
    const navigation = useNavigation()
    const {treatmentName, price, appointmentData, slot} = booking
    if(navigation.state === 'Loading'){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-3xl'>Payment for {treatmentName}</h1>
            <p className='text-xl'> Please Pay <strong>${price}</strong> for  your appointment {appointmentData} at {slot}</p>
            <div className='w-96 my-6'> 
            <Elements stripe={stripePromise}>
                <CheckOutForm 
                booking={booking}
                />
            </Elements>
            </div>
        </div>
    );
};

export default Payment;