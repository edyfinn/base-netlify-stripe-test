const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const { queryStripeCliente } = require('./utils/fauna');

var response = {
  statusCode: 200,
  body: "",
};

//Aplica un descuento a una suscripción
exports.handler = async (event, context) => {
  //Usuario netlify
  const { user } = context.clientContext;
  console.log("Dentro ", user.sub);
  console.log("ValorCupon: ", event.body);
  var cupontTXT = event.body;
  /*const { user } = context.clientContext;
  console.log("usuario: ", user.sub);
  var descuentoAplicado = await descuentoSubs(user.sub);*/
  var resultadoDes = await descuentoSubs(user.sub, cupontTXT);
  console.log("Resultado directo: ", resultadoDes.body.message);
  response.body = resultadoDes.body.message;
  console.log("Resultado completo: ", response);
  return response;
  /*return {
    statusCode: 200,
    data: JSON.stringify({msg: "SUCCESS"})
  };*/
};


async function descuentoSubs(id_netlify, cupon) {
  //Recupera id del cliente en stripe con el id del cliente en netlify.
  const clienteID = await queryStripeCliente(id_netlify);
  console.log("Creando Enlace para: ", clienteID[0], " cupón: ", cupon);
  var resUsuarioStri = clienteID[0];

  //console.log("descuentoSubs ", id_netlify);

  // Retrieve the subscription associated with the customer
  const subscription = await stripe.subscriptions.list({
    customer: resUsuarioStri,
    limit: 10, // Limit to 1 subscription as we're looking for a specific customer
  });

  console.log("Suspcripción: ", subscription);
  
  console.log("ID sub: ", subscription.data[0].id);
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
  /*console.log("cuponTXT: ", JSON.parse(cupon));
  console.log(cupon === 'Friends20'); // true
  */
 
  if(JSON.parse(cupon) == "Friends20"){
    const subscriptionU = await stripe.subscriptions.update(
      subscription.data[0].id,
      {
        discounts: [
          {
            coupon: 'Friends20', //promo_1PDwgdGAVjNy5dcWSZefD3MR
          },
        ],
      }
    );
    console.log("cuponazo: ", subscription.data[0].discounts);
    
    return {
      statusCode: 200,
      body: {
        message: `Esto va muy bien :)`,
        sub: subscriptionU.id
      },
    };
    
  } else {
    console.log("cuponazo else: ", subscription.data[0].discounts);
  }

  console.log("Descuento: ", subscription.data[0].discounts);

  /*return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Esto va muy bien :)`,}),
  };*/

}
