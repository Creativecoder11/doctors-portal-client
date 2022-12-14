import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckOutForm = ({booking}) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {price, patient, email, _id} = booking;
    console.log(booking);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-olive.vercel.app/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            authorization : `bearer ${localStorage.getItem('accessToken')}`
         },
          body: JSON.stringify({price}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)

        if(card === null) {
            return
        } 
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if(error){
            console.log(error);
            setCardError(error.message)
        }
        else{
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patient,
                  email: email
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message)
            return
          }
          if(paymentIntent.status === "succeeded"){
            const payment = {
              price,
              transactionId: paymentIntent.id,
              email,
              bookingId: _id


            }
            fetch('https://doctors-portal-server-olive.vercel.app/payments', {
              method: 'POST',
              headers: {
                'content-type' : 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
              if(data.insertedId){
                console.log(data);
                setSuccess('Congrats! Your Payment Complete')
                setTransactionId(paymentIntent.id)
              }
            })
          } 

          setProcessing(false)
          console.log(paymentIntent);

    }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          />
        <button 
        className="btn btn-sm mt-4 btn-primary" 
        type="submit" 
        disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
        <span className="text-red-600">{cardError}</span>
        {
          success && <div>
            <p className="text-green text-500">{success}</p>
            <p>Your transactionId: <span className="font-bold">{transactionId}</span></p>
          </div>
        }
    </>
  );
};

export default CheckOutForm;
