import faunaDB from 'faunadb';
var q = faunaDB.query;

//Recupera el mensaje informativo de la versión.
export async function getVersiónMSG(version) {

  var secretFDB = getSecretFauna();
  let version_msg;
  let msg = await secretFDB.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getMSGVersion'), version)))
  );
  version_msg = msg[0];
  //console.log("Mensaje de versión: " + version_msg);
  return version_msg;
}

//Recupera el valor del campo sesion en faunaDB
export async function setSesionDB(numSesion, idNet) {    
    //alert("faunaDB Sesión: " + numSesion + " cliente: " + idNet);
    //console.log("en setSesionDB ------------- ", numSesion, " ------ " , idNet);
    var secretFDB = getSecretFauna();

    //alert("FaunaJS " + numSesion);
    const query = await secretFDB.query(
        q.Update(
          q.Select(
            ['ref'],
            q.Get(q.Match(q.Index('session_by_netlifyID'), idNet))
          ),
          {
            data: {
              sesion: numSesion,
            },
          }
        )
      );

      /*let lapromesa = new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });*/

      //alert(JSON.stringify(query));
      //console.log(query);
      return query;

};

//Recupera el valor del campo MAC en faunaDB
export async function getMacDB(netlifyUsuarioID) {
    
  //console.log("en getMacDB ------------- ", netlifyUsuarioID.user.id);
  var secretFDB = getSecretFauna();
  let mac;
  
  let macDB = await secretFDB.query(
    q.Select('data', q.Paginate(q.Match(q.Index('session_by_netlifyID'), netlifyUsuarioID.user.id)))
  );
   
  mac = macDB[0];

  //console.log("MAC en faunaDB: " + mac);

  return mac;
};

//Recupera el valor del campo sesion en faunaDB
export async function getSesionUsuariosDB(netlifyUsuarioID) {
    
    //console.log("en getSesionUsuariosDB ------------- ", netlifyUsuarioID.user.id);
    var secretFDB = getSecretFauna();
    let sesion;
    
    let sesionNum = await secretFDB.query(
      q.Select('data', q.Paginate(q.Match(q.Index('session_by_netlifyID'), netlifyUsuarioID.user.id)))
    );
     
    sesion = sesionNum[0];

    //console.log("Sesiones en faunaDB: " + sesion);

    return sesion;
};

  //Conexión con faunaDB
  function getSecretFauna() {
    var client = new faunaDB.Client({
      secret: 'fnAFd7S3DtAA0N5-NPYZT7stySbGsGGaacCDm2Mu',//process.env.FAUNA_BD_STRIPE,
      domain: 'db.eu.fauna.com',
      scheme: 'https',
    });
    return client;
  };

  export async function setSesionTest(numSesion, idNet) {
  
    const regex = /["/"\""]/g
    const txtIDNet = idNet;
  
    alert(txtIDNet.replaceAll(regex, "")); // "\"073872dc-2a56-493b-998c-a23e3134c955\""
    const idNetLimpio = txtIDNet.replaceAll(regex, "");
    
  
    //alert("faunaDB Sesión: " + numSesion + " cliente: " + idNet);
    //console.log("en setSesionTest ------------- ", numSesion, " ------ " , idNet);
    var secretFDB = getSecretFauna();
    //alert("en setSesionTest " + JSON.stringify(secretFDB));
    alert(JSON.stringify(secretFDB));
    try {
      const query = secretFDB.query(
        //alert("inicio query " + JSON.stringify(idNetLimpio)),
          q.Update(
            q.Select(
              ['ref'],
              q.Get(q.Match(q.Index('session_by_netlifyID'), JSON.stringify(idNetLimpio)))
            ),
            {
              data: {
                sesion: 0,
              },
            }
          ),
          //alert(JSON.stringify("query------------:" + query))
        );
  
      let lapromesa = new Promise((resolve) => {
        setTimeout(() => {
          resolve(alert("dentro promesa"));
        }, 2000);
      });
  
      alert(JSON.stringify(query));
      //console.log(query);
      return query;
  
    } catch (err) {
      console.error("Error en faunaDB: " + err);
    }
  };
