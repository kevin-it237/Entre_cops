import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class AdminHome extends Component {

    state = {
        showModal: false
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row justify-content-end">
                            <div className="col d-flex justify-content-end">
                            <div className="stat-item">
                                <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
                                <h4>50 Fournisseurs</h4>
                            </div>
                            <div className="stat-item">
                                <FontAwesomeIcon icon={faUserFriends} size={"2x"} />
                                <h4>1250 Utilisateurs</h4>
                            </div>
                            </div>
                            <hr/>
                    </div>
                    <div className="row  pt-3 mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">ACTIONS RAPIDES</h3>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Ajouter un Fournisseur</h5>
                                    <p className="card-text">Créer un nouveau Fournisseur de service/ d'annonces.</p>
                                    <a href="#supplier" onClick={() => this.setState({showModal: true})} className="btn btn-dark btn-block">Ajouter un Fournisseur</a>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Créer des coupons</h5>
                                    <p className="card-text">Créer des coupons de réduction pour un service / Evènement.</p>
                                    <Link to='/admin/coupons' className="btn btn-dark btn-block">Générer des coupons</Link>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Annonces</h5>
                                    <p className="card-text">Manage Discussion Group, add a new Group here.</p>
                                    <a href="/admin" className="btn btn-dark btn-block"><i className="fa fa-plus"></i> Gérer les Annonces</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Services</h5>
                                    <p className="card-text">Manage Discussion Group, add a new Group here.</p>
                                    <a href="/admin" className="btn btn-dark btn-block"><i className="fa fa-plus"></i> Gérer les Services</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pt-4">
                        <div className="col-sm-12">
                                <h3 className="title">FOURNISSEURS</h3>
                        </div>
                        <div className="col-sm-12">
                            <table class="table table-bordered">
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Tel</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <a href="/admin/suppliers" className="btn btn-outline-dark">Afficher tous</a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                                <h3 className="title">UTILISATEURS</h3>
                        </div>
                        <div className="col-sm-12">
                            <table class="table table-bordered">
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Tel</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>@Otto.com</td>
                                        <td>655881562</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-md">Supprimer</button>
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <a href="/admin/users" className="btn btn-outline-dark">Afficher tous</a>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Add a new Supplier Popup */}
                 <Modal show={this.state.showModal} onHide={() => this.setState({showModal: !this.state.showModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Nouveau Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    <div class="form-group">
                                        <label for="name">Nom complet</label>
                                        <input type="text" class="form-control" name="nom" id="name" placeholder="Nom complet"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" class="form-control" name="email" id="email" placeholder="Adresse Email"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="tel">Numero de Téléphone</label>
                                        <input type="tel" class="form-control" name="tel" id="tel" pattern="[0-9]{9}" placeholder="Numero de Téléphone"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="danger" onClick={() => this.setState({showModal: !this.state.showModal})}>
                                Ajouter le Fourniseur
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminHome;