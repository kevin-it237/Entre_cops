import React, { Component, Fragment } from 'react';
import './SupplierForms.scss';

class SupplierForm extends Component {
    state = {
        image: null
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.files[0];
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    _onChange = () => {
        // Assuming only image
        let file = this.refs.file;
        let reader = new FileReader();
        // let url = reader.readAsDataURL(file);
         reader.onloadend = function (e) {
            this.setState({
                image: [reader.result]
            })
          }.bind(this);
        console.log(reader) // Would see a path?
        console.log(file) // Would see a path?
        // TODO: concat files
    }

    render() {
        return (
            <Fragment>
                <section className="supplier-view-page">
                    <div className="container my-5">
                        <div className="row justify-content-center mt-5">
                            <div className="col-sm-11 col-md-10 col-lg-8 mb-5 supplier-registration-form">
                                <div className="row mb-5">
                                    <div className="col-sm-12">
                                        <h2 className="text-center mb-5">DEVINIR UN FOUNISSEUR</h2>
                                        <hr/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name">Nom complet</label>
                                    <input type="text" class="form-control" name="nom" id="name" placeholder="Nom complet"/>
                                </div>
                                <div class="form-group">
                                    <label for="email">Adresse Email</label>
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Adresse Email"/>
                                </div>
                                <div class="form-group">
                                    <label for="tel">Numero de Téléphone</label>
                                    <input type="tel" class="form-control" name="tel" id="tel" pattern="[0-9]{9}" placeholder="Numero de Téléphone"/>
                                </div>
                                <div class="form-group">
                                    <label for="pass">Mot de Passe</label>
                                    <input type="password" class="form-control" name="pass" id="pass"  placeholder="Mot de Passe"/>
                                </div>
                                <div class="form-group">
                                    <label for="name">Localisation</label>
                                    <input type="text" class="form-control" name="location" id="location" placeholder="Localisation"/>
                                </div>
                                <div class="form-group">
                                    <label for="name">Services (Séparez par des virgules: ",")</label>
                                    <textarea type="text" class="form-control" name="resume" rows={3} placeholder="Services"></textarea>
                                    <div class="invalid-feedback">
                                        {/* Invalid. */}
                                    </div>
                                </div>
                                <div className="row align-items-start py-3">
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <label for="name">Photo de profil</label><br/>
                                        <div class="custom-file">
                                            <input type="file" onChange={(e) => this.handleInputChange(e)} accept="image/*" class="custom-file-input" name="image" id="image" />
                                            <label class="custom-file-label" for="customImgFile">Choisir l'image</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <img src={this.state.image} alt="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name">Autres informations</label>
                                    <textarea type="text" class="form-control" name="resume" rows={3} placeholder="Autres informations"></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <input className="mt-4" type="submit" value="Envoyer" name="submit"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default SupplierForm;