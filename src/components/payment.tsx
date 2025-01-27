import {useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutform'
import imagen1 from './images/231127_FeatureImage_11.png';
//import netlifyIdentity from 'netlify-identity-widget';

function Payment(props: { stripePromise: any; }) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');
  const [ customerOptions, setCustomerOptions ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const button1 = document.getElementById('left');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent")
      .then((res) => res.json())
      .then(({clientSecret, customerOptions}) => {
        setClientSecret(clientSecret)
        setCustomerOptions(customerOptions)
        setLoading(false)
      });
  }, []);

  const handleLogine = (e: { target: any; }) => {
    console.log("Evento botón login ", e.target);
    //netlifyIdentity.open();
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
      <p>The Subs Plugins: <strong>USD 24.0</strong></p>
     {/*  {clientSecret && !loading && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance, fonts, customerOptions }}>
          <CheckoutForm />
        </Elements>
      )} */}
        <div>
            <Link to="/">go Home</Link>
        </div>
    </div>

    </>
  );
}

export default Payment;
