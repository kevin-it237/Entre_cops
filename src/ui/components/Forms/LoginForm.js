import React, { Component } from 'react';
import './Forms.scss';

import userLogo from '../../../assets/images/user.png'

class LoginForm extends Component {

    goToSignUpForm = (e) => {
        e.preventDefault();
        this.props.changeForm()
    }

    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first mt-5">
                    <img src={userLogo} id="icon" alt="User Icon" />
                    </div>

                    <form>
                    <input type="email" id="login" class="fadeIn second" name="email" placeholder="Adresse Email"/>
                    <input type="password" id="password" class="fadeIn third" name="password" placeholder="Mot de passe"/>
                    <input type="submit" id="signBtn" class="fadeIn fourth mt-4 mb-5" value="Se connecter"/>
                    </form>
                    <p>Ou bien connectez vous avec:</p>
                    <div className="d-flex socialWrapper">
                        <button className="btn btn-danger google">Google</button>
                        <button className="btn btn-primary facebook">Facebook</button>
                    </div>

                    <div id="formFooter">
                    <a class="underlineHover" href="#signup" onClick={(event) => this.goToSignUpForm(event)}>Ou bien Inscrivez vous Ici.</a>
                    </div>

                </div>
            </div>
        );
    }
}

export default LoginForm;