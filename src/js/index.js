document.addEventListener('DOMContentLoaded', async (e) => {
    const  clienteSecret  = 'pi_3QL3F6GAVjNy5dcW1jQ4InSx_secret_FCN54YWdqbLxKutLmSD7iiKmO';
    const stripe = Stripe('pk_test_51OXmGhGAVjNy5dcWXyIWRd1QmpfAWfscWkQTPsewPh2EVDteGRkA5CnTfekMUrfoiiSdcvOElaBOtGs0XIDA4Qof00CpVKEzgQ');
    console.log("Carga " + JSON.stringify(e));
    /*const { clientSecret } = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  
    addMessage(`Client secret: ${clientSecret}`);*/
  
    // Customize the appearance of Elements using the Appearance API.
    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#ed5f74',
        borderRadius: '20px',
        fontFamily: '--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif',
        colorBackground: '#fafafa',
      },
    };
    console.log("Carga elemento");
    //const token = user ? await netlifyIdentity.currentUser().jwt(true) : false;
    // Create an elements group from the Stripe instance, passing the clientSecret (obtained in step 2) and appearance (optional).
    const elements = stripe.elements({ clientSecret: clienteSecret});
    
    // Create and mount the Payment Element
    /****const paymentElement = elements.create("payment");
    
    paymentElement.mount("#payment-element");*****/

    //console.log("paymentElement ", paymentElement);
    
    // Create and mount the linkAuthentication Element
    const linkAuthenticationElement = elements.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");
  
    // If the customer's email is known when the page is loaded, you can
    // pass the email to the linkAuthenticationElement on mount:
    //
       linkAuthenticationElement.mount("#link-authentication-element",  {
         defaultValues: {
           email: 'david.ramosg@gmail.com',
         }
       })
  
    // If you need access to the email address entered:
    //
    //  linkAuthenticationElement.on('change', (event) => {
    //    const email = event.value.email;
    //    console.log({ email });
    //  })
  
    // Create and mount the Shipping Address Element
    /****const shippingAddressElement = elements.create("address", { mode: 'shipping', allowedCountries: ['US'] });
    shippingAddressElement.mount("#shipping-address-element");*****/
//    console.log("Carga elemento SI ", shippingAddressElement);
    // If you need access to the shipping address entered
    //
    //  shippingAddressElement.on('change', (event) => {
    //    const address = event.value;
    //    console.log({ address });
    //  })
  
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
      addMessage('Submitting payment...');
      event.preventDefault();
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:8888/payment/next",
        }
      });
      
      if (error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(error.message);
        addMessage(`Error: ${error.message}`);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
      
    })
    console.log("Carga elemento SI ", form);
  })
  