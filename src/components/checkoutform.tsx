import {
    LinkAuthenticationElement,
    PaymentElement,
    AddressElement,
    ShippingAddressElement,
  } from '@stripe/react-stripe-js'
  import {useState} from 'react'
  import {useStripe, useElements} from '@stripe/react-stripe-js';
  
  export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/completion`,
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(JSON.stringify(error.message));
      } else {
        //console.log("Bien");
        setMessage(error.type);
      }
  
      setIsLoading(false);
    }
  
    const handleEmailChange = async (e: any) => {
      console.log(e);
    }
  
    const handleAddressChange = async (e: any) => {
      console.log(e);
    }
  
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement onChange={handleEmailChange} />
  
  
        <h4>Shipping details</h4>
        <AddressElement
              options={{mode: 'shipping', allowedCountries: ['EU']}}
  
              // Access the address like so:
              // onChange={(event) => {
              //   setAddressState(event.value);
              // }}
            />
        {/* <AddressElement onChange={handleAddressChange} options={{allowedCountries: ['US']}} />*/}
        {/* <ShippingAddressElement onChange={handleAddressChange} options={{allowedCountries: ['US']}} /> */}
  
        
        <h4>Payment details</h4>
        <PaymentElement  />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner">...</div> : "Buy today"}
          </span>
        </button>
        {/* Show any error or success messages */}
         {message && <div id="payment-message">{message}</div>}
      </form>
    )
  }
  