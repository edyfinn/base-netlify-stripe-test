const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const { queryStripeCliente } = require('./utils/fauna');

//Aplica un descuento a una suscripción
exports.handler = async (event, context) => {
  //Usuario netlify
  const { user } = context.clientContext;
  console.log("Dentro ", user);
  /*const { user } = context.clientContext;
  console.log("usuario: ", user.sub);
  var descuentoAplicado = await descuentoSubs(user.sub);*/

  return {
    statusCode: 200,
    body: `fin`, //descuentoAplicado, //JSON.stringify(descuentoAplicado),
  };
};


async function descuentoSubs(id_netlify) {
  //Recupera id del cliente en stripe con el id del cliente en netlify.
  //const clienteID = await queryStripeCliente(id_netlify);
  console.log("descuentoSubs ", id_netlify);

  /*const stripe = require('stripe')('sk_test_51OXmGhGAVjNy5dcWqdTRW9E1Eh3MyAspCBVlYYRiZQISneBAcRK0MC1c4WNBYwJbnhRuO4X8l1kwTeWaLpXamVb200Z0n4lQK8');
  
  const subscription = await stripe.subscriptions.create({
    customer: '{{CUSTOMER_ID}}',
      items: [
        {
          price: '{{PRICE_ID}}',
        },
      ],
      discounts: [
        {
          coupon: 'free-period',
        },
      ],
  });*/

  /*const subscriptionU = await stripe.subscriptions.update(
    'sub_1ChorizoEnorme',
    {
      items: [
        {
          price: '{{PRICE_ID}}',
        },
      ],
      discounts: [
        {
          coupon: 'free-period',
        },
      ],
    }

  );*/


  return "Descuento";
}
