/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import logo from './logo.svg';
import edyFlowLogoSmall from "./images/230728-edyflow-Logo-colordark-small.png";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link }
    from "react-router-dom";
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import { setSesionDB } from "./js/faunaDB.js";

import netlifyIdentity from 'netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

import Payment from "./components/payment";
import Login from "./components/logeo";
import Home from "./components/home";
import Welcome from "./components/welcome";
import Main from "./main";
import Private from "./components/private";

interface Props {
  component: React.FunctionComponent;
  exact?: boolean;
  path: string;
}

const PublicRoute: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Link to="/home" /> : <Route {...props} />;
};

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Route {...props} /> : <Link to="/welcome" />;
};

function App() {
  
  //const navigate = useNavigate();
  const url = 'https://thesubstest.netlify.app/';
  var isauth = false;

  return (
    <IdentityContextProvider url={url}>
      <Router>
          <Routes>
          <Route path="/payment" element={isauth ? <Payment stripePromise={undefined}/> : <Navigate to="/Home"  />}/>
          {/* <Route path="/payment" element={Private(<Payment stripePromise={undefined} />)} /> */}

           {/*  <PublicRoute path="/createaccount" component={CreateAccount} />
            <PublicRoute path="/login" component={LogIn} /> */}
              {/* <Route path="/payment"
                  element={<Payment stripePromise={undefined} />} /> */}
              <Route path="/logeo"
                  element={<Login />} />
              <Route path="/home"
                  element={<Home />} />
              <Route path="/"
                  element={<Welcome />} />
              <Route path="/main"
                  element={<Main />} />
              
          </Routes>
      </Router>
      <AuthStatusView />
    </IdentityContextProvider>
  );

}

//code split the modal til you need it!
const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"))

function AuthStatusView() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);
  const [userLogin, setUserLogin] = useState<string>("usuario");
  console.log("credenciales ", identity.user?.user_metadata.email);
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName';
  const avatar_url = identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.avatar_url;

function Logout() {
  //console.log("Sesion user: " + userLogin);
  //setSesionDB(0, userLogin);
  const { logoutUser } = useIdentityContext();
  return (
    //setSesionDB(0, userLogin),
    <button hidden onClick={logoutUser}>Log Out</button>);
}

const handleLogIn  = () => {
  console.log("Pantalla logeo");
  netlifyIdentity.open()
}


  //Recuerda activo/desactivado
  //identity.loginUser(identity.user?.user_metadata.email, identity.user?.user_metadata.password, true)
  
  return (
    <div className="App" style={{alignContent: "center", backgroundColor: "transparent" }}>
      <header className="App-header" style={{ alignContent: "right", backgroundColor: "transparent" }}>
        {identity && identity.isLoggedIn ? (
          <>
            <div style={{ display: "flex", alignItems: "right", justifyContent: "flex-end", marginLeft:"auto"}}>
              <p style={{fontSize:"12px", fontWeight:"regular", marginLeft: "auto"}}>logged in as <a style={{fontWeight:"bold"}}>{name}</a></p>
              {avatar_url && <img alt="user name" src={avatar_url} style={{ height: 0, borderRadius: "100%", marginLeft: "auto" }} />}
              {/* <button className="logout-btn" style={{ marginLeft: "10px" }} onClick={() => setDialog(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 86.244 75.464">
                  <path id="Icon_open-account-logout" data-name="Icon open-account-logout" d="M32.342,0V10.781H75.464v53.9H32.342V75.464h53.9V0ZM21.561,21.561,0,37.732,21.561,53.9V43.122H64.683V32.342H21.561Z" fill="#8e03f4"/>
                </svg>
              </button> */}
               <span>

                {identity.isLoggedIn ? <Logout /> : <h1>Log In/Sign Up</h1>}
              </span> 
            </div>
           
            
            {identity.isConfirmedUser && identity.isLoggedIn ? (
                <>
                <h1>¡¡Hola!!</h1>
                {/* <TheSubsPMain identidadNetlify={identity}></TheSubsPMain> */}
                </>
                
            ):(checkEmail())}
            
          </>
        ) : (
            <>             
              <div className="welcome-container">
                <img src={edyFlowLogoSmall} alt="" width="100px" style={{marginBottom:"30px"}}/>
                <h1 style={{fontSize:"30px", lineHeight:"35px", marginTop:"0px", marginBottom:"10px"}}>Creative work<br></br>made simple.</h1>
                <p style={{textAlign:"center", marginTop:"0px", marginBottom:"0"}}>The only plugin that highlights keywords for you
                  <br></br>
                  with endless styling options.
                </p>
                <button className="error-btn" style={{marginTop:"25px"}} onClick={() => setDialog(true)}>
                  Login or Sign Up
                </button>
              </div>
            </>
            
          )}
       <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user:any) => {setDialog(false), console.log('hello ', user?.user_metadata)}}
          onSignup={(user:any) => console.log('welcome ', user?.user_metadata)}
          onLogout={ () => { console.log('adios')}}
        />
        
        
      </header>
    </div>
  )
}
  
// check if user has confirmed their email
// use authedFetch API to make a request to Netlify Function with the user's JWT token,
// letting your function use the `user` object
function checkEmail() {
  const { isConfirmedUser, authedFetch } = useIdentityContext();

  return (
    <div>
      <h1 style={{alignContent: "center"}}>You&apos;re almost there...</h1>
      {!isConfirmedUser && (
        <p style={{alignContent: "center"}}>Please check your inbox and confirm your email adress.</p>
        
      )}
      {/* <RefreshButton /> */}
    </div>
  );
}


export default App;
