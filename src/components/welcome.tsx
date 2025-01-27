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

    const goToMain = () => {
        navigate('/main');
    };

    return (
        
        <div className="App">
            <header className="App-header">
            <div className="right">
                <img src = {edyFlowLogoSmall} alt="Subscription Image" />
            </div>
                {/* <p>Main components</p> */}
                <p>
                Welcome!{' '}
                <Link to="/logeo">
                <button
                    onClick={() => {
                    //netlifyAuth.signout(() => history.push('/'));
                    }}
                >
                    Sign out
                </button>
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
                </button>
                
            </header>
        </div>
    );
}

    
export default Welcome;