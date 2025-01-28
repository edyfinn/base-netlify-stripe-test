import React from 'react';
import { useEffect, useState, useRef, createContext, memo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";

function Home(usuarioToken: any) {
    const navigate = useNavigate();
    
    const goToManage = () => {
        console.log("Manage Subscription, Click.");
        //console.log("La IDENTIDAD --> ", JSON.stringify(usuarioNetlify));
        console.log("Token del Usuario --> ", usuarioToken);
        // HANDLE subscription management
        fetch('/.netlify/functions/create-manage-link', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${usuarioToken}`,
          },
        })
          .then((res) => res.json())
          .then((link) => {
            navigate(link);
            //window.location.href = link;
          })
          .catch((err) => console.error(err));
    };

    const goToHome = () => {
        navigate('/home');
    };
    const gotToLogin = () => {
        navigate('/logeo');
    };
    const gotToMain = () => {
        navigate('/main');
    };

    async function apiCall(parameter: any) {
        const url = `/.netlify/functions/functionname?parameter=${parameter}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <div className="right">
                    <img src = {edyFlowLogoSmall} alt="Subscription Image" />
                </div>               

                    <div>
                        <p>Home</p>
                        <button onClick={goToManage}>
                            Manage Subscription
                        </button> 
                        <Link to="/">go back</Link>
                    
                    </div>
                    
            </header>
        </div>
    );
  
}

export default Home;