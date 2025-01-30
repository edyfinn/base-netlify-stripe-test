/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import logo from './logo.svg';
import edyFlowLogoSmall from "./images/230728-edyflow-Logo-colordark-small.png";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, BrowserRouter }
    from "react-router-dom";
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import { setSesionDB } from "./js/faunaDB.js";

import netlifyIdentity from 'netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

import Payment from "./components/payment";
import Login from "./components/logeo";
import Home from "./components/home";
import Welcome from "./components/welcome";
import Dashboard from "./components/dashboard";
import Main from "./main";
import Private from "./components/private";
//import { LogIn } from './views';

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
      {/*<Router>
          <Routes>
          <Route path="/payment" element={isauth ? <Payment stripePromise={undefined}/> : <Navigate to="/Home"  />}/> */}
          {/* TEST <Route path="/payment" element={Private(<Payment stripePromise={undefined} />)} /> */}
           {/*TEST <PublicRoute path="/createaccount" component={CreateAccount} />
            < TEST PublicRoute path="/login" component={LogIn} /> */}
              {/* TEST <Route path="/payment"
                  element={<Payment stripePromise={undefined} />} /> */}
              {/*<Route path="/logeo"
                  element={<Login />} />
              <Route path="/home"
                  element={<Home />} />
              <Route path="/"
                  element={<Welcome />} />
              <Route path="/main"
                  element={<Main />} />
              
          </Routes>
      </Router> */}
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
  
  return (
    <div className="App" style={{alignContent: "center", backgroundColor: "#282c34" }}>
      <header className="App-header" style={{ alignContent: "right", backgroundColor: "transparent" }}>
        {identity && identity.isLoggedIn ? (
          <>
            <div style={{ display: "flex", alignItems: "right", justifyContent: "flex-end", marginLeft:"auto"}}>
              <p style={{fontSize:"12px", fontWeight:"regular", marginLeft: "auto"}}>logged in as <a style={{fontWeight:"bold"}}>{name}</a></p>
              {avatar_url && <img alt="user name" src={avatar_url} style={{ height: 0, borderRadius: "100%", marginLeft: "auto" }} />}
               <span>
                {identity.isLoggedIn ? <Logout /> : <h1>Log In/Sign Up</h1>}
              </span> 
            </div>

            {identity.isConfirmedUser && identity.isLoggedIn ? (
                <>
                <Router>
                  <Routes>
                  <Route path="/payment" element={identity.isLoggedIn ? <Payment stripePromise={undefined}/> : <Navigate to="/Home"  />}/>
                      <Route path="/dashboard"
                          element={<Dashboard />} />
                      <Route path="/home"
                          element={<Home usuarioNetlify={identity.user?.id} usuarioToken={identity.user?.token.access_token}/>} />
                      <Route path="/"
                          element={<Welcome />} />
                    </Routes>
                </Router>
                {/* <TheSubsPMain identidadNetlify={identity}></TheSubsPMain> */}
                </>
                
            ):(checkEmail())}
            
          </>
        ) : (
            <>             
              <div className="welcome-container">
              <img src = {edyFlowLogoSmall} alt="Subscription Image" />
              <h1>Here you can manage your subscription</h1>
              <h2>If you have any further questions always feel free to contact us!</h2>
                <button className="error-btn" style={{marginTop:"25px"}} onClick={() => setDialog(true)}>
                  Login or Sign Up
                </button>
              </div>
            </>
            
          )}
       <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user:any) => {setDialog(false), setUserLogin(user?.user_metadata.full_name), console.log('hello ', user?.user_metadata)}}
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
