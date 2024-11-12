const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const { queryStripeCliente } = require('./utils/fauna');

exports.handler = async (_event, context) => {
    //Usuario netlify
    const { user } = context.clientContext;
    alert("Datos " + JSON.stringify(context));
    var stripe_cli = await getStripeID(user.sub);
    console.log("Stripe Cli ", stripe_cli);
    return {
        statusCode: 200,
        body: JSON.stringify(stripe_cli),
      };
};

async function getStripeID(id_netlify) {
    //Recupera id del cliente en stripe con el id del cliente en netlify.
    const stripe_id = await queryStripeCliente(id_netlify);
    console.log("Creando Enlace para: ", stripe_id[0]);
    
    return stripe_id[0];
}

