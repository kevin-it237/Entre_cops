import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Dashboard.scss';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Hoc from '../../globalComponent/Hoc';
import Header from '../../globalComponent/Header';
import ReviewItem from '../../components/Reviews/ReviewItem';

import fr from 'date-fns/locale/fr';
registerLocale('fr', fr);

class Dashboard extends Component {
    
    state = {
        showNewEv: false,
        showNewAn: false,
        date: new Date()
    }
    
    handleChange = (date) => {
        this.setState({
            date: date
        });
    }

    render() {
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
                                <div class="list-group" id="list-tab" role="tablist">
                                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                                        Event 1 (3)
                                        <br/>
                                        <div className="stars">
                                            <FontAwesomeIcon icon={faStar} size={"1x"} />
                                            <FontAwesomeIcon icon={faStar} size={"1x"} />
                                            <FontAwesomeIcon icon={faStar} size={"1x"} />
                                            <FontAwesomeIcon icon={faStar} size={"1x"} />
                                            <FontAwesomeIcon icon={faStar} size={"1x"} />
                                            <span className="votes">(100 votes)</span>
                                        </div>
                                    </a>
                                    <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Event 2</a>
                                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Event 3</a>
                                    <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Event 4</a>
                                    <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-set" role="tab" aria-controls="settings">Event 5</a>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 mt-2 d-flex flex-column justify-content-between">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                        <table class="table">
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
                                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">CONTENT 2</div>
                                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">CONTENT 3</div>
                                    <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">CONTENT 4</div>
                                    <div class="tab-pane fade" id="list-set" role="tabpanel" aria-labelledby="list-settings-list">CONTENT 5</div>
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
                <Modal show={this.state.showNewEv} onHide={() => this.setState({showNewEv: false})} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouvel Evènement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                        <div class="form-group">
                                            <label for="name">Titre</label>
                                            <input type="text" class="form-control is-valid" name="title" placeholder="Titre de l'évènement" required/>
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="category">Catégorie</label>
                                            <select id="category" class="form-control">
                                                <option selected>Choisir...</option>
                                                <option>Catégorie 1</option>
                                                <option>Catégorie 2</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Resumé</label>
                                            <textarea type="text" class="form-control is-invalid" name="resume" rows={3} placeholder="Resumé"></textarea>
                                            <div class="invalid-feedback">
                                                Invalid.
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Lieu</label>
                                            <input type="text" class="form-control" name="place" placeholder="Lieu de l'évènement" required/>
                                        </div>
                                        <div className="row align-items-start py-3">
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <div class="form-group">
                                                    <label for="name">Date et Heure de l'évènement</label><br/>
                                                    <DatePicker locale="es" showTimeSelect dateFormat="Pp" class="form-control" selected={this.state.date} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <label for="name">Importer une image</label><br/>
                                                <div class="custom-file">
                                                    <input type="file" accept="image/*" class="custom-file-input" id="customImgFile" />
                                                    <label class="custom-file-label" for="customImgFile">Choisir</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <label for="name">Importer une video</label><br/>
                                                <div class="custom-file">
                                                    <input type="file" accept="video/*" class="custom-file-input" id="customVideoFile" />
                                                    <label class="custom-file-label" for="customVideoFile">Choisir</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Autres informations</label>
                                            <textarea type="text" class="form-control" name="resume" rows={3} placeholder="Autres informations"></textarea>
                                        </div>
                                        <input className="mt-4" type="submit" name="Valider" value="Ajouter l'Evenement"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({showNewEv: false})}>
                        Fermer
                    </Button>
                    </Modal.Footer>
                </Modal>

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
                                        <div class="form-group">
                                            <label for="name">Nom du Service</label>
                                            <input type="text" class="form-control is-valid" name="title" placeholder="Nom du Service" required/>
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="category">Catégorie</label>
                                            <select id="category" class="form-control">
                                                <option selected>Choisir...</option>
                                                <option>Catégorie 1</option>
                                                <option>Catégorie 2</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Problème</label>
                                            <textarea type="text" class="form-control is-invalid" name="resume" rows={3} placeholder="Problème"></textarea>
                                            <div class="invalid-feedback">
                                                Invalid.
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Offre</label>
                                            <textarea type="text" class="form-control is-invalid" name="offre" rows={3} placeholder="Entrer votre offre"></textarea>
                                            <div class="invalid-feedback">
                                                Invalid.
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Cible</label>
                                            <input type="text" class="form-control is-valid" name="target" placeholder="Entrer votre cible" required/>
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Durée du service</label>
                                            <input type="text" class="form-control is-valid" name="duration" placeholder="Exemple: 1 Mois" required/>
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label for="name">Importer une image</label><br/>
                                                <div class="custom-file">
                                                    <input type="file" accept="image/*" class="custom-file-input" id="customImgFile" />
                                                    <label class="custom-file-label" for="customImgFile">Choisir</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label for="name">Importer une video</label><br/>
                                                <div class="custom-file">
                                                    <input type="file" accept="video/*" class="custom-file-input" id="customVideoFile" />
                                                    <label class="custom-file-label" for="customVideoFile">Choisir</label>
                                                </div>
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

export default Dashboard;