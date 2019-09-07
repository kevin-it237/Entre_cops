import React, { Component } from 'react';
import './SupplierForms.scss';
import Upload from '../Forms/Upload';
import Loader from '../../globalComponent/Loader';

class SupplierForm extends Component {

    state = {
        name: '',
        email: '',
        tel: '',
        location: '',
        services: [],
        profileImage: '',
        otherInfos: '',
        isTyping: false,
        formValid: false,
        emailValid: false,
        nameValid: false,
        telValid: false,
        locationValid: false,
        servicesValid: false,
        profileImageValid: false,
        otherInfosValid: false,
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let { emailValid, nameValid, telValid, locationValid, servicesValid, profileImageValid, otherInfosValid} = this.state;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case 'name':
                nameValid = value.length > 0;
                break;
            case 'tel':
                telValid = value.length > 0;
                break;
            case 'location':
                locationValid = value.length > 0;
                break;
            case 'services':
                servicesValid = value.length > 0;
                break;
            case 'profileImage':
                profileImageValid = value.length > 0;
                break;
            case 'otherInfos':
                otherInfosValid = value.length > 0;
                break;
            default:
                break;
        }
        this.setState({
            emailValid: emailValid,
            nameValid: nameValid,
            telValid: telValid,
            locationValid: locationValid,
            servicesValid: servicesValid,
            profileImageValid: profileImageValid,
            otherInfosValid: otherInfosValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: 
            this.state.emailValid && 
            this.state.nameValid &&
            this.state.telValid &&
            this.state.locationValid &&
            this.state.servicesValid &&
            this.state.profileImageValid &&
            this.state.otherInfosValid });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isTyping: true});
        if(this.state.formValid) {
            const { email, name, tel, location, services, profileImage, otherInfos } = this.state;
            const newSupplier = {
                name: name,
                email: email,
                tel: tel,
                location: location,
                services: services,
                profileImage: profileImage,
                otherInfos: otherInfos,
            }
            console.log(newSupplier);
            // Save the supplier
        } else {
            this.setState({error: "Veuillez remplir tous les champs"});
        }
    }

    setFile(name,file) {
        this.setState({
            [name]: file
        });
    }

    render() {
        const { isTyping, name, tel, services, location, locationValid, otherInfos,  emailValid, telValid, email, 
                nameValid, profileImage, servicesValid, otherInfosValid, profileImageValid, error } = this.state;
        return (
            <form>
                {error && error.length ? <div className="alert alert-danger" style={{fontSize: "1.3rem"}}>{error}</div> : null}
                <div className="form-group">
                    <label for="name">Nom complet</label>
                    <input type="text" className={isTyping && nameValid ? "form-control is-valid" : "form-control is-invalid"} value={name} onChange={(e) => this.handleInputChange(e)} name="name" id="name" placeholder="Nom complet" />
                    {isTyping && nameValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Invalide</div>}
                </div>
                <div className="form-group">
                    <label for="email">Adresse Email</label>
                    <input type="email" className={isTyping && emailValid ? "form-control is-valid" : "form-control is-invalid"} value={email} onChange={(e) => this.handleInputChange(e)} name="email" id="email" placeholder="Adresse Email" />
                    {isTyping&&emailValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Email invalide</div>}
                </div>
                <div className="form-group">
                    <label for="tel">Numero de Téléphone</label>
                    <input type="tel" className={isTyping && telValid ? "form-control is-valid" : "form-control is-invalid"} value={tel} onChange={(e) => this.handleInputChange(e)} name="tel" id="tel" pattern="[0-9]{9}" placeholder="Numero de Téléphone" />
                    {isTyping&&telValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Invalide</div>}
                </div>
                <div className="form-group">
                    <label for="name">Localisation</label>
                    <input type="text" className={isTyping && locationValid ? "form-control is-valid" : "form-control is-invalid"} value={location} onChange={(e) => this.handleInputChange(e)} name="location" id="location" placeholder="Localisation" />
                    {isTyping&&locationValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Invalide</div>}
                </div>
                <div className="form-group">
                    <label for="name">Vos services (Séparez par des virgules: ",")</label>
                    <textarea type="text" className={isTyping && servicesValid ? "form-control is-valid" : "form-control is-invalid"} value={services} onChange={(e) => this.handleInputChange(e)} name="services" rows={3} placeholder="Services"></textarea>
                    {isTyping&&servicesValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Invalide</div>}
                </div>
                <div className="form-group">
                    <label for="name">Autres informations</label>
                    <textarea type="text" className={isTyping && otherInfosValid ? "form-control is-valid" : "form-control is-invalid"} value={otherInfos} onChange={(e) => this.handleInputChange(e)} name="otherInfos" rows={3} placeholder="Autres informations"></textarea>
                    {isTyping&&otherInfosValid ? <div className="valid-feedback">Valide</div> : <div className="invalid-feedback">Invalide</div>}
                </div>
                <div className="row align-items-center justify-content-center py-3">
                    <div className="col-sm-8 col-md-8 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                        <Upload type="image" oldUrl={profileImage} setFile={(name, file) => this.setFile(name, file)} name="profileImage" label={"Image de Profil"} />
                    </div>
                    {isTyping &&profileImageValid  ?  null : <div className="invalid-feedback">Image Requise</div>}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" onClick={(e) => this.handleSubmit(e)} className="button fadeIn fourth mt-4 mb-5">{this.props.loader ? <Loader color="white" /> : "Valider"}</button>
                </div>
            </form>
        );
    }
}

export default SupplierForm;