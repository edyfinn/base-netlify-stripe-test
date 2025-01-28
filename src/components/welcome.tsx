/* eslint-disable react/style-prop-object */
import { Link, useNavigate } from 'react-router-dom';

import edyFlowLogo from "../images/231127_FeatureImage_11.png";
import edyFlowLogoSmall from "../images/230728-edyflow-Logo-colordark-small.png";
function Welcome() {
    const navigate = useNavigate();

    const goToPayment = () => {
        navigate('/payment');
    };

    const goToHome = () => {
        navigate('/home');
    };

    const goToLogin = () => {
        navigate('/logeo');
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToMain = () => {
        navigate('/main');
    };

    return (
        
        <div className="App">
            <header className="App-header">
            <div className="right">
                <img src = {edyFlowLogoSmall} alt="Subscription Image" />
            </div>
                <button onClick={goToHome}>
                    go to Home
                </button>        
                <button onClick={goToPayment}>
                    go to Payment
                </button>
                <button onClick={goToDashboard}>
                    go to Dashboard
                </button>
                
            <div id="logged-container">
      {/*<!--column 1 zxp--> */}
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
      
      {/* <!--column 2 zip-->*/}
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
              <ul>
                <li>Windows:</li>
              <li>C:\Program Files (x86)\Common Files\Adobe\CEP\extensions</li>
              <li>Mac:</li>
              <li>/Library/Application Support/Adobe/CEP/extensions</li>
            </ul></li>
            <li>Move the extracted folder "com.edyflow.thesubsplugin" into the Adobe extensions folder you located in the previous step</li>
            <li>Reopen Premiere Pro</li>
          </ol>
        </div>
        </div>
    </div>
                {/* <p>
                Welcome!{' '}
                <Link to="/logeo">
                <button onClick={() => {//netlifyAuth.signout(() => history.push('/'));
                    }} > Sign out </button>
                </Link>
                </p>
                <button onClick={goToPayment}>
                    go to Payment
                </button>
                <button onClick={goToLogin}>
                    go to Login
                </button>
                <button onClick={goToMain}>
                    go to Main
                </button>
                <button onClick={goToHome}>
                    go to Home
                </button> */}
                
            </header>
        </div>
    );
}

    
export default Welcome;