import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Completion(props: { stripePromise: any;}) {
  const [ messageBody, setMessageBody ] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;
    //console.log("la promesa en completion ", stripePromise);
    stripePromise.then(async (stripe: any) => {
      const url = new URL(window.location.origin);
      const paymentIntentId = url.searchParams.get('payment_intent');
      ///////const { error, paymentIntent } = await fetch(`/retrieve-payment-intent?payment_intent=${paymentIntentId}`).then(r => r.json());
      
      setMessageBody("El pago se ha realizado CORRECTAMENTE");
      //console.log("texto ", messageBody, stripe.retrievePaymentIntent.value);
      //console.log("texto ", messageBody, stripe);
      /*setMessageBody(error ? `> ${error.message}` : (
        
        <>
        {alert("todo " + paymentIntentId)}
        <h1>&gt; Payment {paymentIntent}:
          <a href={`https://dashboard.stripe.com/test/payments/${paymentIntentId}`} target="_blank" rel="noreferrer">
          {paymentIntentId}</a></h1>
        </>
      ));*/
    });
  }, [stripePromise]);

  return (
    <>
        <h1 style={{ color: "MediumSeaGreen"}}>Thank you!</h1>
        <h3 style={{ color: "DodgerBlue"}}>--{messageBody}-- </h3>
        <Link to="/home">go Home</Link>
        <Link to="/">
            <button onClick={() => {/*se puede ejecutar algo*/}} > go Welcome </button>
        </Link>
      {/* <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div> */}
      {/* <div role="alert">{messageBody}</div> */}
    </>
  );
}

export default Completion;
