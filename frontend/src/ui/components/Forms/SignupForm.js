import React, { Component } from 'react';
import './Forms.scss';
import { connect } from 'react-redux';
import { signup, renderLoader, clearLoader } from '../../../store/actions';
import Loader from '../../globalComponent/Loader';

import userLogo from '../../../assets/images/event.png';

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        isTyping: false,
        formErrors: {email: '', password: '', name: ''},
        emailValid: false,
        passwordValid: false,
        nameValid: false,
        formValid: false
    }

    goToSignInForm = (e) => {
        e.preventDefault();
        this.props.changeForm()
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, isTyping: true}, 
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          case 'name':
            nameValid = value.trim().length >= 6;
            fieldValidationErrors.name = nameValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        nameValid: nameValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Display Loader
        this.props.onRenderLoader();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        // Launch the signup
        this.props.onSignUp(data);
        // Clear loader
        this.props.onClearLoader();
    }

    render() {
        const { isTyping, emailValid, passwordValid, nameValid , name, email, password } = this.state;
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first mt-5">
                    <img src={userLogo} id="icon" alt="User Icon" />
                    </div>
                    <form>
                        <input type="text" value={name} onChange={(e) => this.handleInputChange(e)} id="nom" class="fadeIn second" name="name" placeholder="Nom"/>
                        {isTyping&&!nameValid ? <div style={{color: "red"}}>Invalide. Min 6 caratères</div>:null}
                        <input type="email" value={email} onChange={(e) => this.handleInputChange(e)} id="email" class="fadeIn second" name="email" placeholder="Adresse Email"/>
                        {isTyping&&!emailValid ? <div style={{color: "red"}}>Email non valide.</div>:null}
                        <input type="password" value={password} onChange={(e) => this.handleInputChange(e)} id="password" class="fadeIn third" name="password" placeholder="Mot de passe"/>
                        {isTyping&&!this.state.passwordValid ? <div style={{color: "red"}}>Invalide. Min 6 caratères</div>:null}
                        <button disabled={!passwordValid} type="submit" onClick={(e) => this.handleSubmit(e)} id="signBtn" class="button fadeIn fourth mt-4 mb-5">{this.props.loader ? <Loader color="white" />:"S'inscrire"}</button>
                    </form>

                    <p>Ou bien inscrivez vous avec:</p>
                    <div className="d-flex socialWrapper">
                        <button className="btn btn-danger google">Google</button>
                        <button className="btn btn-primary facebook">Facebook</button>
                    </div>

                    <div id="formFooter">
                    <a class="underlineHover" href="#signin" onClick={(event) => this.goToSignInForm(event)}>Déja inscrit ? Connectez vous.</a>
                    </div>

                </div>
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        loader: state.loader.loading,
        error: state.auth.error
    }
}

const mapDispatchToState = dispatch => {
    return {
        onSignUp: (data) => dispatch(signup(data)),
        onClearLoader: () => dispatch(clearLoader()),
        onRenderLoader: () => dispatch(renderLoader()),
    }
}

export default connect(mapPropsToState, mapDispatchToState)(SignUpForm);