
import './PersonSignUp.css'

const PersonSignUp = () => {




    return (
        <div className="container_signup_form">
            <form className="signup_form">
                <label htmlFor="username" id="username_field">
                    Username: 
                </label>
                <input type="text" id='email' placeholder="Create a username"/>
                <label htmlFor="email" id="email_field">
                    email: 
                </label>
                <input type="text" id='email' placeholder="Enter your email"/>
            </form>
            <p>Note: You can opt-out at any time. See our Privacy Policy and Terms.</p>
        </div>
    )
}

export default PersonSignUp

