const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const { queryStripeCliente, faunaConexion, faunaFetch } = require('./utils/fauna');

//Aplica un descuento a una suscripción
exports.handler = async (_event, context) => {
  //Usuario netlify
  const { user } = context.clientContext;

  var descuentoAplicado = await descuentoSubs(user.sub);

  return {
    statusCode: 200,
    body: descuentoAplicado, //JSON.stringify(enlace.url),
  };
};


async function descuentoSubs(id_netlify) {
  //Recupera id del cliente en stripe con el id del cliente en netlify.
  const clienteID = await queryStripeCliente(id_netlify);
  

  return "Descuento";
}
