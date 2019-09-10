import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import './Dashboard.scss';
import axios from 'axios';

import Hoc from '../../globalComponent/Hoc';
import Header from '../../globalComponent/Header';
import ReviewItem from '../../components/Reviews/ReviewItem';
import Stars from '../../components/Stars/Stars';
import Upload from '../../components/Forms/Upload';
import EventModal from './EventModal';

class Dashboard extends Component {
    
    state = {
        showNewEv: false,
        showNewAn: false,
        date: new Date(),
        serviceImage: '',
        serviceVideo: ''
    }
    
    handleChange = (date) => {
        this.setState({
            date: date
        });
    }

    setFile(name, file) {
        this.setState({
            [name]: file,
            profileImageValid: true,
            error: ''
        }, this.validateForm);
    }

    closeEventModal = () => {
        this.setState({showNewEv: false});
    }

    componentDidMount() {
        
    }

    render() {
        const { serviceImage, serviceVideo } = this.state;
        return (
            <Hoc>
                <Header />
                <section className="dashboard mt-5">
                    <div className="container p-5">
                        <div className="row pt-3">
                            <div className="col-sm-12 d-flex mb-3 add-buttom-wrapper">
                                <h2 className="py-3 mr-auto align-align-self-end">TOUTES LES RESERVATIONS</h2>
                                <button className="button" onClick={() => this.setState({showNewEv: true})}>NOUVEL EVENEMENT</button>
                                <button className="button" onClick={() => this.setState({showNewAn: true})}>NOUVEAU SERVICE</button>
                            </div>
                            <div className="col-sm-12">
                                <hr/>
                            </div>
                        </div>
                        <div className="row mt-4 pb-5">
                            <div className="col-sm-12 col-md-12 col-lg-4 mt-2">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                                        After Work - Prestation (3)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">
                                        Miss & Master Etudiant 2020 (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                                        Formation Wordpress débutant (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">
                                        Cours d'Allemand rapide (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 mt-2 d-flex flex-column justify-content-between">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>@Otto.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>@Thornton.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>theBird.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>@Otto.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Larry</td>
                                                <td>theBird.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Jacob</td>
                                                <td>@Thornton.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="deleteWrapper d-flex">
                                    <button className="btn btn-danger ml-auto mt-3">Supprimer l'Evenement/Service</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* messages */}
                    <div className="container mt-5 p-5 mb-5">
                        <div className="row pt-3 align-items-start">
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <h3 className="pt-3 mb-5">Messages sur l'évènement</h3>
                                <ReviewItem/>
                                <ReviewItem/>
                                <ReviewItem/>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <h2>Other things here</h2>
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Event/Annonce */}
                <EventModal 
                    user={this.props.user}
                    show={this.state.showNewEv} 
                    closeModal={this.closeEventModal}  />

                {/* New Service */}
                <Modal show={this.state.showNewAn} onHide={() => this.setState({showNewAn: false})} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouveau Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                        <div className="form-group">
                                            <label for="name">Nom du Service</label>
                                            <input type="text" className="form-control is-valid" name="title" placeholder="Nom du Service" required/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="category">Catégorie</label>
                                            <select id="category" className="form-control">
                                                <option selected>Choisir...</option>
                                                <option>Catégorie 1</option>
                                                <option>Catégorie 2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Problème</label>
                                            <textarea type="text" className="form-control is-invalid" name="resume" rows={3} placeholder="Problème"></textarea>
                                            <div className="invalid-feedback">
                                                Invalid.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Offre</label>
                                            <textarea type="text" className="form-control is-invalid" name="offre" rows={3} placeholder="Entrer votre offre"></textarea>
                                            <div className="invalid-feedback">
                                                Invalid.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Cible</label>
                                            <input type="text" className="form-control is-valid" name="target" placeholder="Entrer votre cible" required/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Durée du service</label>
                                            <input type="text" className="form-control is-valid" name="duration" placeholder="Exemple: 1 Mois" required/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <Upload type="image" oldUrl={serviceImage} setFile={(name,file)=>this.setFile(name, file)} name="serviceImage" label={"Importer une image"} />
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <Upload type="video" oldUrl={serviceVideo} setFile={(name,file)=>this.setFile(name, file )} name="serviceVideo" label={"Importer une video"} />
                                            </div>
                                        </div>
                                        <input className="mt-4" type="submit" name="Valider" value="Ajouter le service" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({showNewAn: false})}>
                        Fermer
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Hoc>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapPropsToState)(Dashboard);