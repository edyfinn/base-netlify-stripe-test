const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const { queryCrearNetIDStripeID } = require('./utils/fauna');
const faunaDB = require('faunadb');
var q = faunaDB.query

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // create a new customer in Stripe
  const customer = await stripe.customers.create({ name: user.user_metadata.full_name, email: user.email, });

  // subscribe the new customer to the plan con 14 días de prueba
  const session = await stripe.checkout.sessions.create
  ({
    line_items: [
      {
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    automatic_tax: {
      enabled: true,
    },
    mode: 'subscription',
    ui_mode: 'embedded',
    return_url
  : 'https://example.com/return',
  });



  //Crea registro en faunaDB con netlifyID y stripeID.
  await queryCrearNetIDStripeID(user.id, customer.id);


  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['base'],
      },
    }),
  };
};
