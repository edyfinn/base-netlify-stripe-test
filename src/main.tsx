/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { useEffect, useState, useRef} from "react";
import { Link, useNavigate } from 'react-router-dom';
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";

/*import { IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';
import { ReactNetlifyIdentityAPI, useIdentityContext, useNetlifyIdentity } from "react-netlify-identity";
import {getSesionUsuariosDB, setSesionDB } from "./js/faunaDB.js";*/

import Home from "./components/home";

function Main() {

    const url = 'https://thesubstest.netlify.app/' //IMPORTANTE: Web(TEST) principal alojada en netlify
    if (!url)
        throw new Error(
            'process.env.REACT_APP_NETLIFY_IDENTITY_URL is blank, which means you probably forgot to set it in your Netlify environment variables',
        )
    
    
    const navigate = useNavigate();

    const gotToHome = () => {

        // This will navigate to first component
        navigate('/');
    };

    /*return (
        <IdentityContextProvider url={url}>
    
        <AuthStatusView />
        
     /*   </IdentityContextProvider>
        
      );*/

    return (
        <div className="App">
            <header className="App-header">
                <p>Main components</p>
                <Link to="/">go back</Link>
                <button onClick={gotToHome}>
                    go Home
                </button>
            </header>
        </div>
    );
}


export default Main;