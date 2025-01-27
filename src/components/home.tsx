import React from 'react';
import { useEffect, useState, useRef, createContext, memo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";

function Home() {


    const navigate = useNavigate();

    const salirLogout = () => {
       //HACER logout aquí
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

    return (
        <div className="App">
            <header className="App-header">
                <div className="right">
                    <img src = {edyFlowLogoSmall} alt="Subscription Image" />
                </div>               

                    <div>
                        <p>Home components</p>

                        <Link to="/">go back</Link>
                    
                    </div>

                    <div className="container">
                    <div className="left">

                        <h1>Here you can manage your subscription</h1>
                        <h2>If you have any further questions always feel free to contact us!</h2>

                        <div id="logged-container">
                        {/* <!--column 1 zxp--> */}
                        <div className="column">
                            <div className="exp-container">
                            <i className="chevron fas fa-chevron-right" id="chevronzxp"></i>
                            <p className="toggle-explain" id="toggle-explainzxp">Learn how to install the plugin as a .zxp file
                            <a className="note">recommended</a></p>
                            <a className="download-btn" href="https://www.dropbox.com/scl/fi/z8q9nwv9bibhuifha8w3h/com.edyflow.thesubsplugin.zxp?rlkey=l0gt5bl5tm9kinefdets8mbet&dl=1" download>download .zxp</a>
                        </div>
                            <div className="explanation" id="explanationzxp">
                            <ol className="list">
                                <li>Click the download link on the right to get the .zxp file for the plugin</li>
                                <li>If you don't have a ZXP installer tool, we recommend using <a href="https://aescripts.com/learn/zxp-installer/" target="_blank">this one by aescripts</a></li>
                                <li>Open your ZXP installer tool and drag the downloaded .zxp file into the installer window</li>
                                <li>Follow the on-screen instructions provided by the installer tool to finish the installation process</li>
                            </ol>
                            </div>
                            
                        </div>
                        
                        {/*  <!--column 2 zip--> */}
                        <div className="column">
                            <div className="exp-container">
                            <i className="chevron fas fa-chevron-right" id="chevronzip"></i>
                            <p className="toggle-explain" id="toggle-explainzip">Learn how to install the plugin as a .zip file</p>
                            <a className="download-btn" href="https://www.dropbox.com/scl/fi/0j63yxkc6mimuw90jtn3d/com.edyflow.thesubsplugin.zip?rlkey=4o58d87nzj69jwc01a3pr67mv&dl=1" download>download .zip</a>
                            </div>
                            <div className="explanation" id="explanationzip">
                            <ol className="list">
                                <li>Click the download link on the right to get the .zip file for the plugin</li>
                                <li>Extract the contents of the .zip file to a location on your device where you can easily find it</li>
                                <li>Locate the adobe extensions folder, navigate to the appropriate folder:
                                <ul  >
                                    <li >Windows:</li>
                                <li>C:\Program Files (x86)\Common Files\Adobe\CEP\extensions</li>
                                <li >Mac:</li>
                                <li>/Library/Application Support/Adobe/CEP/extensions</li>
                                </ul></li>
                                <li>Move the extracted folder "com.edyflow.thesubsplugin" into the Adobe extensions folder you located in the previous step</li>
                                <li>Reopen Premiere Pro</li>
                            </ol>
                            </div>
                            <div className="right">
                            {/* <img src={imagen1} alt="Subscription Image" /> */}
                        </div>
                            </div>
                        </div>

                        <div className="user-info">
                        {/* <button id="left" onClick={handleLogine}>Log In</button> */}
                        <button className="outline" id="right">Sign Up</button>
                        <button id="cupon">Cupon</button>
                        <input type="text" id="cupontxt"></input>
                        
                        </div>
                    </div>
                </div>
                    
            </header>
        </div>
    );
  
}

export default Home;