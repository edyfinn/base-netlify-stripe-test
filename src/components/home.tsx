import React from 'react';
import { useEffect, useState, useRef, createContext, memo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";

function Home(full_parametros: any) {
    const [cuponDes, setCuponDes] = useState('');
    const navigate = useNavigate();

    const handleCuponChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        console.log("Cupon: ", e.target.value);
        setCuponDes(e.target.value);
    };

    const handleCuponClick = (cuponTXT: string) => {
        console.log("CuponazoClick: ", cuponTXT);
        setCuponDes(cuponTXT);
    };

    //console.log("Datos llegan ", full_parametros);
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
        //console.log("Token del Usuario --> ", full_parametros);        
        
        // HANDLE subscription management
        fetch(`/.netlify/functions/create-manage-link?idNetlify=${full_parametros.usuarioNetlify}&tokenUser=${full_parametros.usuarioToken}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${full_parametros.usuarioToken}`,
          },
        })
          .then((res) => res.json())
          .then((link) => {
            //navigate(link)
            window.location.href = link;
          })
          .catch((err) => console.error("¡¡ERROR!! llamando a create-manage-link: ", err));
          
          /**PRUEBA
          window.location.href = JSON.stringify(apiCallTest(full_parametros));*/
          
    };

    const goToCupon = () => {
        console.log("Cupón: ", cuponDes);
        // HANDLE cuponazo
        fetch(`/.netlify/functions/cupon_descuento?CuponDes=${cuponDes}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${full_parametros.usuarioToken}`,
            },
            body: JSON.stringify(cuponDes),
          })
            .then((response) => {
            console.log("respuesta: ", response.status);
            if(response.status === 200) {
                alert("Cupón descuento, ¡Aplicado!");
            } else {
                alert("Código Cupón no es correcto.");
            }
            })
            /*.then((data: any) => {
            console.log("subscriptionU: ", data);
            let datos = data;
            console.log("Datos: ", datos );
            })
            .catch((err: any) => console.error("¡¡ERROR!! llamando a cupon_descuento: ", err));*/
            
            /*b3.innerText = 'Cupón';
            b3.addEventListener('click', () => {
              // Aplica cupón
              fetch('/.netlify/functions/cupon_descuento', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${user.token.access_token}`,
                },
                body: JSON.stringify(cuponTXT.value),
              })
                .then((response) => {
                  console.log("respuesta: ", response.status);
                  if(response.status === 200){
                    alert("Cupón descuento, ¡Aplicado!");
                  } else {
                    alert("Código Cupón no es correcto.");
                  }
                })
                .then((data) => {
                  console.log("subscriptionU: ", data);
                  let datos = data;
                  console.log("Datos: ", datos );
                })
                .catch((err) => console.error(err));
            });*/
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

    async function apiCallTest(parametros: any) {
        console.log("Usuario en Home ", parametros.usuarioNetlify);
        const url = `/.netlify/functions/create-manage-link?idNetlify=${parametros.usuarioNetlify}&tokenUser=${parametros.usuarioToken}`;
        try {
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${parametros.usuarioToken}`,
                    },
                  }
            );
            const data = await response.json();
            console.log("Link ", data);
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
                        <input
                            type="text"
                            value={cuponDes}
                            onChange={handleCuponChange}
                        /> 
                        <button onClick={goToCupon}>
                            Cupón
                        </button> 
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