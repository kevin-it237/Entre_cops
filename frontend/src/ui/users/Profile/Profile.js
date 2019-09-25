import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { renderLoader, clearLoader, clearError } from '../../../store/actions';
import Header from '../../globalComponent/Header';
import Loader from '../../globalComponent/Loader';
import Upload from '../../components/Forms/Upload';
import user from '../../../assets/images/user.png';
import './Profile.scss';

class Profile extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        tel: '',
        isTyping: false,
        formErrors: { email: '', password: '', name: '' },
        emailValid: false,
        passwordValid: false,
        nameValid: false,
        formValid: false,
        location: '',

        /* Password change */
        password1: '',
        newpassword1: '',
        newpassword2: '',
        changingPassword: false
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'name':
                nameValid = value.trim().length >= 6;
                fieldValidationErrors.name = nameValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            nameValid: nameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isTyping: true });
        if (this.state.formValid) {
            // Display Loader
            this.props.onRenderLoader();
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                tel: this.state.tel
            }
            // Launch the signup
            this.props.onSignUp(data);
            // Clear loader
            this.props.onClearLoader();
        }
    }

    setFile = (name, file) => {
        this.setState({
            [name]: file,
            imageValid: true,
            error: ''
        }, this.validateForm);
    }

    componentDidMount() {

    }

    render() {
        const { isTyping, emailValid, passwordValid, nameValid, name, email, tel, changingPassword, password1, newpassword1, newpassword2, location, profileImage } = this.state;
        const { error, loader } = this.props;

        return (
            <Fragment>
                <Header />
                <section className="profile-section">
                    <div className="container my-5">
                        <div className="row justify-content-between">
                            <div className="col-sm-12 text-center pb-4">
                                <h3>Paramètres du compte</h3>
                                <h5 className="pb-3">Editez votre compte ici.</h5>
                                <hr/>
                            </div>
                            <div className="col-sm-12 col-md-2 col-lg-2 mt-3 d-flex flex-column align-items-center">
                                <img src={user} className="img-fluid" alt="" width="200" />
                                <h4 className="mt-3 text-center"><strong>Abel Kevin</strong></h4>
                                <h5 className="text-center">ngaleuabel@gmail.com</h5>
                            </div>
                            <div className="col-sm-12 col-md-5 col-lg-5">
                                <h4 className="py-3">Mettre à jour mes informations</h4>
                                <form>
                                    {error && error.length ? <div className="alert alert-danger">{error}</div> : null}
                                    <input type="text" value={name} onChange={(e) => this.handleInputChange(e)} id="nom" name="name" placeholder="Nom" />
                                    {isTyping && !nameValid ? <div style={{ color: "red" }}>Invalide. Min 6 caratères</div> : null}
                                    <input type="email" value={email} onChange={(e) => this.handleInputChange(e)} id="email"  name="email" placeholder="Adresse Email" />
                                    {isTyping && !emailValid ? <div style={{ color: "red" }}>Email non valide.</div> : null}
                                    <input type="text" value={location} onChange={(e) => this.handleInputChange(e)}  name="location" placeholder="Adresse" />
                                    <input type="text" value={tel} onChange={(e) => this.handleInputChange(e)} id="tel" name="tel" placeholder="Numéro de Téléphone" />
                                    <div className="py-3 justify-content-center">
                                        <Upload type="image" oldUrl={profileImage} setFile={(name, file) => this.setFile(name, file)} name="profileImage" label={"Importer une image de profile"} />
                                    </div>
                                    <button disabled={loader} type="submit" onClick={(e) => this.handleSubmit(e)} id="signBtn" className="button mt-4 mb-5">{this.props.loader ? <Loader color="white" /> : "Enregistrer"}</button>
                                </form>
                            </div>
                            <div className="col-sm-12 col-md-5 col-lg-4">
                                <h4 className="py-3">Réinitialiser votre mot de passe</h4>
                                <form>
                                    {error && error.length ? <div className="alert alert-danger">{error}</div> : null}
                                    <input type="password" value={password1} onChange={(e) => this.handleInputChange(e)}  name="password1" placeholder="Ancien Mot de passe" />
                                    <input type="password" value={newpassword1} onChange={(e) => this.handleInputChange(e)}  name="password2" placeholder="Nouveau mot de passe" />
                                    <input type="password" value={newpassword2} onChange={(e) => this.handleInputChange(e)} name="newpassword" placeholder="Confirmation" />
                                    {isTyping && !passwordValid ? <div style={{ color: "red" }}>Invalide. Min 6 caratères</div> : null}
                                    <button disabled={loader} type="submit" onClick={(e) => this.handleSubmit(e)} id="signBtn" className="button mt-4 mb-5">{changingPassword ? <Loader color="white" /> : "Réinitialiser"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

const mapPropsToState = state => {
    return {
        loader: state.loader.loading,
        error: state.auth.error,
        user: state.auth.user
    }
}

const mapDispatchToState = dispatch => {
    return {
        onClearLoader: () => dispatch(clearLoader()),
        onRenderLoader: () => dispatch(renderLoader()),
        onClearError: () => dispatch(clearError()),
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Profile);
