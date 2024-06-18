const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

    const mySecret = process.env.STRIPE_SECRET_KEY;
    const mySecret1 = process.env.FAUNA_SERVER_KEY_V10
    const mySecret2 = process.env.STRIPE_DEFAULT_PRICE_PLAN

    var client = new faunaDB.Client({
      secret: process.env.FAUNA_BD_STRIPE,
      domain: 'db.eu.fauna.com',
      scheme: 'https',
    });

    let respuesta = await client.query(
      q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), 'ba31a0e6-dac9-425a-9b46-246dfd4e906f')))
    );
    //usuario = JSON.stringify(usuarioStripe);
    //console.log(JSON.stringify(respuesta[0]));
    var prueba = 'testeo';
    const [link, stripeID] = await Promise.allSettled([getLinkPago(prueba), getClienteStripe()]);
    
    //console.log("respuesta: ", respuesta);

    /*var createP = client.query(
      q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'Cliente_Netlify_hola' , stripeID: 'Cliente_Sprite_hola' } })
    );*/
    
    /*createP.then(function(response) {
      console.log(response.ref)
    })*/

    return {
      statusCode: 200,
      //body: `La clave de stripe es: ${mySecret} \n ${mySecret1} \n ${mySecret2} \n ${createP}`,
      //body: `Respuesta Query faunaDB: ${JSON.stringify(respuesta[0])}`,
      body: `Respuesta Query en PARALELO: ${JSON.stringify(link.value.url)} \n ${JSON.stringify(stripeID)} \n ${stripeID} 
            \n ${JSON.stringify(stripeID.value[0])} \n ${JSON.stringify(stripeID)}`,
    };
};

async function getLinkPago(cliente) {
  /*return new Promise((resolve,reject) => {
    setTimeout(() => {
    console.log("Number1 is done");
    resolve(10);
    },1000);
 });*/
 console.log(cliente);
  const link = await stripe.billingPortal.sessions.create({
    customer: 'cus_PwYnbMVoqWrrvc',
    return_url: process.env.URL,
  });
  return link;
}

async function getClienteStripe() {
  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  const respuesta = await client.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), 'ba31a0e6-dac9-425a-9b46-246dfd4e906f')))
  );
  //console.log(JSON.stringify(respuesta[0]))
  return respuesta;
}



function printNumber1() {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
     console.log("Number1 is done");
     resolve(10);
     },1000);
  });
}

function printNumber2() {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
     console.log("Number2 is done");
     resolve(20);
     },500);
  });
}

