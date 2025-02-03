const { queryStripeCliente } = require('./utils/fauna');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const {resolve} = require('path');
const { Stripe } = require('stripe');
const {loadStripe} = require('@stripe/stripe-js/pure');
const stripeSI = loadStripe('pk_test_51OXmGhGAVjNy5dcWXyIWRd1QmpfAWfscWkQTPsewPh2EVDteGRkA5CnTfekMUrfoiiSdcvOElaBOtGs0XIDA4Qof00CpVKEzgQ');
const stripe1 = Stripe('pk_test_51OXmGhGAVjNy5dcWXyIWRd1QmpfAWfscWkQTPsewPh2EVDteGRkA5CnTfekMUrfoiiSdcvOElaBOtGs0XIDA4Qof00CpVKEzgQ');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST, {
    apiVersion: '2024-10-28.acacia',
});

/*const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST, {
    apiVersion: '2024-10-28.acacia',
});*/

const LINK_PERSISTENT_TOKEN_COOKIE_NAME = 'stripe.link.persistent_token';

const stripe2 = Stripe(process.env.STRIPE_SECRET_KEY_TEST);

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

  const addMessage = (message) => {
    const messagesDiv = document.querySelector('#messages');
    messagesDiv.style.display = 'block';
    const messageWithLinks = addDashboardLinks(message);
    messagesDiv.innerHTML += `> ${messageWithLinks}<br>`;
    console.log(`Debug: ${message}`);
  };

  // Adds links for known Stripe objects to the Stripe dashboard.
const addDashboardLinks = (message) => {
    const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
    return message.replace(
      /(pi_(\S*)\b)/g,
      `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
    );
  };

  var response = {
    statusCode: 200,
    body: "",
  };
  

  exports.handler = async (event, context, res) => {
    //const { type } = JSON.parse(event.body);
    const { user } = context.clientContext;
    //const roles = user ? user.app_metadata.roles : false;
    //const { allowedRoles } = content[type];

    var idSprite = await queryStripeCliente(user.sub);

    //Problemas con el string, devuelve "cus_QOW0pbgLM7J5Co" y tiene que ser 'cus_QOW0pbgLM7J5Co' con comillas simples.
    //Para solucionarlo primero se hace stringify y luego parse para recuperar el primer y único elemento que tiene comillas simples.
    //Esto es porque recuperamos un string y javascript le pone "" pero lo que necesitamos es el valor dentro de un json para que javascript
    //lo tome como un valor any y le pone las '' que es lo correcto. Esto no pasa en typescript porque tiene tipado, esa es la puñetera diferencia.
    
    console.log("Stripe Cli para efemerialKey ", idSprite);
    
    var stripeIDString = JSON.stringify(idSprite);    
    var stripeIDCorrecto =JSON.parse(stripeIDString);
    
    //console.log("StripeID Json ", stripeIDString);
    //console.log("StripeID Objeto ", JSON.parse(stripeIDString));
    console.log("StripeID Correcto ", stripeIDCorrecto[0]);

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: stripeIDCorrecto[0]},
        {apiVersion: '2024-10-28.acacia'}
    );
    
    console.log("EphemeralKey ", ephemeralKey.secret);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 2400,
      customer: stripeIDCorrecto[0],
      payment_method_types: ['card', 'link'],
      payment_method_options: {
        link: {
          persistent_token: LINK_PERSISTENT_TOKEN_COOKIE_NAME,
        }
      }
      // automatic_payment_methods: { enabled: true }
    });
    console.log("paymentIntent ", paymentIntent.client_secret);

 var response = {
        
            clientSecret: paymentIntent.client_secret,
            customerOptions: {
              customer: stripeIDCorrecto[0],
              ephemeralKey: ephemeralKey.secret
            }
          
      };
  var envio = JSON.stringify(response);
  //console.log("El response ", response);
    return {
        statusCode: 200,
        body: envio,
      };
};

async function getStripeID(id_netlify) {
    //Recupera id del cliente en stripe con el id del cliente en netlify.
    const stripe_id = await queryStripeCliente(id_netlify);
    //console.log("Creando Enlace para: ", stripe_id[0]);
    
    return stripe_id[0];
}
