import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {

    const navigate = useNavigate();

    const navigateToDashboard = () => {

        navigate('/dashboard');
    }

    return(
        <div>
            <h2>
                Welcome to ChatPal!
            </h2>
            <button style={{paddingLeft: "1rem", paddingRight: "1rem"}} onClick={navigateToDashboard}> 
                Continue
            </button>
        </div>
    )
}

export default WelcomePage;