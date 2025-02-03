import {useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './checkoutform';
import imagen1 from './images/231127_FeatureImage_11.png';
//import netlifyIdentity from 'netlify-identity-widget';

function Payment(props: { stripePromise: any; usuarioNetlify: any; usuarioToken: any; }) {
  
  const { stripePromise } = props;
  const { usuarioNetlify } = props;
  const { usuarioToken } = props;

  const [ clientSecret, setClientSecret ] = useState('');
  const [ customerOptions, setCustomerOptions ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const button1 = document.getElementById('left');

  //console.log("La promesa Sprite en Payment ---> ", stripePromise);
  useEffect(() => {
    fetch(`/.netlify/functions/create-payment-intent?idNetlify=${usuarioNetlify}&tokenUser=${usuarioToken}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${usuarioToken}`,
      },
    })
      .then((response) => response.json())
      .then(({clientSecret, customerOptions}) => {

        setClientSecret(clientSecret)
        setCustomerOptions(customerOptions)
        setLoading(false)
        //console.log("Resultado create-payment-intent --> ", clientSecret, " El CustomerOptions --> ", customerOptions);
        
      })
      .catch((err) => console.error("¡¡ERROR!! llamando a create-manage-link: ", err));

    // Create PaymentIntent as soon as the page loads
    /*fetch(`/.netlify/functions/create-payment-intent?idNetlify=${usuarioNetlify}&tokenUser=${usuarioToken}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${usuarioToken}`,
      },
    })
      .then((res) => res.json())
      .then(({clientSecret, customerOptions}) => {
        setClientSecret(clientSecret)
        setCustomerOptions(customerOptions)
        setLoading(false)
      })
      .catch((err) => console.error("¡¡ERROR!! llamando a create-payment-intent: ", err));*/

  }, [stripePromise]);

  const handleLogine = (e: { target: any; }) => {
    console.log("Evento botón login ", e.target);
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      borderRadius: '0px',
      fontFamily: '"IBM Plex Serif"'
    }
  }
  const fonts = [{
    cssSrc: "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif"
  }]

  return (
    <>
    <div className="container">
      <h1>EdyFlow</h1>
      <p>The Subs Plugin:  <strong>USD 24.0</strong></p>
      {clientSecret && !loading && stripePromise && (
          // <Elements stripe={stripePromise} options={{ clientSecret, appearance, fonts, customerOptions }}></Elements>
          <Elements stripe={stripePromise} options={{ clientSecret, fonts}}>
            <CheckoutForm />
          </Elements>
        )}
        <div>
            <Link to="/home">go Home</Link>
            <Link to="/">
                <button onClick={() => {/*se puede ejecutar algo*/}} > go Welcome </button>
            </Link>
        </div>
    </div>

    </>
  );
}

export default Payment;
