const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const fetch = require('node-fetch');
const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.handler = async () => {
    /*return {
      statusCode: 200,
      body: "Hola Mundo Cruel!"
    };*/

    /*const { user } = context.clientContext;
    console.log("Usuario: " + user.sub);*/

    const mySecret = process.env.STRIPE_SECRET_KEY_TEST;
    const mySecret1 = process.env.FAUNA_SERVER_KEY_V10_TEST
    const mySecret2 = process.env.STRIPE_DEFAULT_PRICE_PLAN_TEST

    var client = new faunaDB.Client({
      secret: process.env.FAUNA_BD_STRIPE_TEST,
      domain: 'db.eu.fauna.com_TEST',
      scheme: 'https',
    });

    let respuesta = await client.query(
      q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID_TEST'), 'ba31a0e6-dac9-425a-9b46-246dfd4e906f')))
    );

    return {
      statusCode: 200,
      body: `La clave de stripe es: ${mySecret} \n ${mySecret1} \n ${mySecret2} \n ${createP}`,
      //body: `Respuesta Query faunaDB: ${JSON.stringify(respuesta[0])}`,
      /*body: `Respuesta Query en PARALELO: ${JSON.stringify(link.value.url)} \n ${JSON.stringify(stripeID)} \n ${stripeID} 
            \n ${JSON.stringify(stripeID.value[0])} \n ${JSON.stringify(stripeID)}`,*/
    };
};