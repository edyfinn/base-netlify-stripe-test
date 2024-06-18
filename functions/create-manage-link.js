const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { queryStripeCliente, faunaConexion, faunaFetch } = require('./utils/fauna');

//Crea un enlace a la suscripción
exports.handler = async (_event, context) => {
  //Usuario netlify
  const { user } = context.clientContext;

  //Enlace a web de pago.
  var enlace = await crearLinkManager(user.sub);

  return {
    statusCode: 200,
    body: JSON.stringify(enlace.url),
  };
};


async function crearLinkManager(id_netlify) {
  //Recupera id del cliente en stripe con el id del cliente en netlify.
  const clienteID = await queryStripeCliente(id_netlify);
  
  //Crea enlace de este cliente a la pagina de pago de stripe
  const link = await stripe.billingPortal.sessions.create({
    customer: clienteID[0],
    return_url: process.env.URL,
  });

  return link;
}
