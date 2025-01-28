import React from 'react';
import { useEffect, useState, useRef, createContext, memo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";

function Home(usuarioToken: any, usuarioN: any) {
    const navigate = useNavigate();

    console.log("Datos llegan ", usuarioN, " ", usuarioToken);
    /*try{
        const result = await fetch(
            '/.netlify/functions/create-manage-link',
            {
                method: 'POST',
                headers: {'Authorization': `Bearer ${usuarioToken}`},
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
       /* return {
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
    /**useEffect(() => {
        console.log("lanza create manage");
        // Create Manage Link
        fetch("/.netlify/functions/create-manage-link")
          .then((res) => res.json())
          .then(({link}) => {
            console.log("lanza create manage FINAL")
            navigate(link)
          });
      }, []);*/

    const goToManage = () => {
        console.log("Manage Subscription, Click.");
        //console.log("La IDENTIDAD --> ", JSON.stringify(usuarioNetlify));
        console.log("Token del Usuario --> ", usuarioToken);

        apiCallTest(usuarioToken);
        // HANDLE subscription management
        fetch('/.netlify/functions/create-manage-link', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${usuarioToken}`,
          },
        })
          .then((res) => res.json())
          .then((link) => {
            navigate(link)
            //window.location.href = link;
          })
          .catch((err) => console.error("¡¡ERROR!! llamando a create-manage-link: ", err));
          
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

    async function apiCallTest(parameter: any) {
        console.log("Usuario ", parameter.usuarioN);
        const url = `/.netlify/functions/create-manage-link?parameter=${parameter}`;
        try {
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${usuarioToken}`,
                    },
                  }
            );
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async function apiCall(parameter: any) {
        const url = `/.netlify/functions/create-manage-link?parameter=${parameter}`;
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