import React, { Component, Fragment } from 'react';
import './SupplierForms.scss';
import Upload from '../Forms/Upload';

class SupplierForm extends Component {
    state = {
        imagePreview: '',
        profileImage: ''
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    setFile(name,file, previewFile) {
        this.setState({
            [name]: file
        });
    }

    render() {
        const { imagePreview } = this.state;
        return (
            <Fragment>
                <section className="supplier-view-page">
                    <div className="container my-5">
                        <div className="row justify-content-center mt-5">
                            <div className="col-sm-11 col-md-10 col-lg-8 mb-5 supplier-registration-form">
                                <div className="row mb-5">
                                    <div className="col-sm-12">
                                        <h2 className="text-center mb-5">DEVINIR UN PARTENAIRE</h2>
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
                                <div class="form-group">
                                    <label for="name">Autres informations</label>
                                    <textarea type="text" class="form-control" name="resume" rows={3} placeholder="Autres informations"></textarea>
                                </div>
                                <div className="row align-items-center justify-content-center py-3">
                                    <div className="col-sm-8 col-md-8 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                        <Upload type="image" oldUrl={imagePreview} setFile={(name,file, previewFile)=>this.setFile(name, file, previewFile)} name="profileImage" label={"Image de Profil"} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <input className="mt-4" type="submit" id="submit" value="Envoyer" name="submit"/>
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