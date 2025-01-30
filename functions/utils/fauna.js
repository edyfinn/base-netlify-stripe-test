const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.faunaConexion = async () => {
  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE_TEST_A,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  return client;
}

//Crea tupla en usuarios para relacionar los stripeID con los netlifyID
exports.queryCrearNetIDStripeID = async (idNet, idSprite) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE_TEST_A,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  await clientFauna.query(
    q.Create(q.Collection('UsuariosBuenosTest'), { data: { netlifyID: idNet , stripeID: idSprite, sesion: 0 } })
  );
  
}

//Recupera stripeID con netlifyID del logeo
exports.queryStripeCliente = async (idNetlify) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.REACT_FAUNA_BD_STRIPE_TEST_A,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  console.log("Net: ", idNetlify);
  const respuesta = await clientFauna.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyIDTEST'), idNetlify)))
  );

  console.log("idSpriteFauna ", respuesta);
  //clientFauna.close();
  return respuesta;
}

exports.querySesionCliente = async (idNetlify) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE_TEST_A,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  const respuesta = await clientFauna.query(
    q.Select('data', q.Paginate(q.Match(q.Index('session_by_netlifyIDTEST'), idNetlify)))
  );

  //clientFauna.close();
  return respuesta;
}
