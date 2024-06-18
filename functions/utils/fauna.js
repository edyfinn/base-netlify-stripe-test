const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.faunaConexion = async () => {
  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  return client;
}

exports.queryCrearNetIDStripeID = async (idNet, idSprite) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  await clientFauna.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: idNet , stripeID: idSprite, sesion: 1 } })
  );

}

exports.queryStripeCliente = async (idNetlify) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  const respuesta = await clientFauna.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), idNetlify)))
  );

  //clientFauna.close();
  return respuesta;
}

exports.querySesionCliente = async (idNetlify) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  const respuesta = await clientFauna.query(
    q.Select('data', q.Paginate(q.Match(q.Index('session_by_netlifyID'), idNetlify)))
  );

  //clientFauna.close();
  return respuesta;
}
