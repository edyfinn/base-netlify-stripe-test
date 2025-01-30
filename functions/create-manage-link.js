const stripe = require('stripe')(process.env.REACT_STRIPE_SECRET_KEY_TEST);
const { queryStripeCliente } = require('./utils/fauna');

exports.handler = async (paramHomeNetlify) => {
  console.log("create-manage-link INICIO-------------------------------------");
  console.log("Todos Parametros Datos --------------------------------------- \n", paramHomeNetlify);
  console.log("Parametros que llegan --------------------------------------\n ", paramHomeNetlify.multiValueQueryStringParameters);
  console.log("Parametro 1 --------------------------------------\n ", paramHomeNetlify.multiValueQueryStringParameters.idNetlify);
  console.log("Parametro 2 --------------------------------------\n ", paramHomeNetlify.multiValueQueryStringParameters.tokenUser);
  //console.log("tokenUser ", paramHomeNetlify);
  //Usuario netlify
  //const { user } = context.clientContext;
  const user = paramHomeNetlify.multiValueQueryStringParameters.idNetlify;
  console.log("El user ", user);
  var idSprite = await queryStripeCliente(user);
  console.log("SpriteID ", idSprite);
  /*var stripeIDString = JSON.stringify(idSprite);
  console.log("datos ", stripeIDString);
  //Enlace a web de pago.
  var enlace = await crearLinkManager(stripeIDString);*/
  return {
    statusCode: 200,
    //body: JSON.stringify(enlace.url),
  };
}
  /*
  try{
      const result = await fetch(
          process.env.REACT_APP_GRAPHQL_ENDPOINT,
          {
              method: 'POST',
              headers: {'Authorization': `Bearer ${process.env.REACT_APP_GRAPHQL_API_KEY}`},
              body: JSON.stringify({
                  query: `query {
                      getProductList{
                          items{
                              price
                              name
                              _id
                              image{
                                  sourceUrl
                              }
                          }
                      }
                  }
                  `
              }),
          }
      )
      const resultJSON = await result.json();
      /**
       * Must return an object with a statusCode
       * and a body
       */
    /*  return {
          statusCode: 200,
          body: JSON.stringify(resultJSON)
      }
  } catch (err) {
      return {
          statusCode: 500,
          body: JSON.stringify({
              message: `Failed to fetch. ${err}`
          })
      }
  }*/
//}

//Crea un enlace a la suscripción
/*exports.handler = async (_event, context) => {
  console.log("datos ", context);
  //Usuario netlify
  const { user } = context.clientContext;
  var idSprite = await queryStripeCliente(user.sub);
  console.log("datos ", idSprite);
  //Enlace a web de pago.
  var enlace = await crearLinkManager(user.sub);
  return {
    statusCode: 200,
    body: JSON.stringify(enlace.url),
  };
};*/


async function crearLinkManager(id_netlify) {
  console.log("ID Net ", id_netlify);
  //Recupera id del cliente en stripe con el id del cliente en netlify.
  const clienteID = await queryStripeCliente(id_netlify);
  console.log("Creando Enlace para: ", clienteID[0]);
  //Crea enlace de este cliente a la pagina de pago de stripe
  const link = await stripe.billingPortal.sessions.create({
    customer: clienteID[0],
    return_url: process.env.URL,
  });
  //console.log("Creando Enlace: ", clienteID[0]);
  return link;
}
