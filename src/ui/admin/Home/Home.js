import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
                                    <p className="card-text">Créer un nouveau Fournisseur.</p>
                                    <a href="#supplier" onClick={() => this.setState({showModal: true})} className="btn btn-dark btn-block">Ajouter un Fournisseur</a>
                                </div>
                            </div>
                        </div>
                    
                    
                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Evènements</h5>
                                    <p className="card-text">Valider/Supprimer Evènements.</p>
                                    <Link className="btn btn-dark btn-block" to="/admin/annonces">Gérer les Annonces</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Services</h5>
                                    <p className="card-text">Valider/Supprimer un Service.</p>
                                    <Link className="btn btn-dark btn-block" to="/admin/services">Gérer les Services</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 col-sm-6 mb-2">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Créer des coupons</h5>
                                    <p className="card-text">Créer des coupons de réduction.</p>
                                    <Link to='/admin/coupons' className="btn btn-dark btn-block">Générer des coupons</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">EVENEMENTS</h3>
                        </div>
                        <div className="col-sm-12">
                            <table class="table table-bordered">
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Lieux</th>
                                    <th>Date</th>
                                    <th>Création</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Concert Dadju</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Concert Dadju</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Concert Dadju</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Concert Dadju</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Concert Dadju</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <Link className="btn btn-outline-dark" to="/admin/annonces">Afficher tous</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">SERVICES</h3>
                        </div>
                        <div className="col-sm-12">
                            <table class="table table-bordered">
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Lieux</th>
                                    <th>Date</th>
                                    <th>Création</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Cours d'Anglais</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Cours d'Anglais</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Cours d'Anglais</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Cours d'Anglais</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Cours d'Anglais</td>
                                        <td>Yaounde</td>
                                        <td>12 Juin 2020</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <Link className="btn btn-outline-dark" to="/admin/services">Afficher tous</Link>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Add a new Supplier Popup */}
                 <Modal show={this.state.showModal} size="lg" onHide={() => this.setState({showModal: !this.state.showModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Nouveau Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
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
                                            <input type="text" class="form-control" name="location" id="name" placeholder="Localisation"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Services (Séparez par des virgules:",")</label>
                                            <textarea type="text" class="form-control is-invalid" name="resume" rows={3} placeholder="Resumé"></textarea>
                                            <div class="invalid-feedback">
                                                {/* Invalid. */}
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
                                        <div className="row align-items-start py-3">
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <label for="name">Image du Fournisseur</label><br/>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="customImgFile" />
                                                    <label class="custom-file-label" for="customImgFile">Choisir</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Autres informations</label>
                                            <textarea type="text" class="form-control" name="resume" rows={3} placeholder="Autres informations"></textarea>
                                        </div>
                                        <input className="mt-4" type="submit" value="Ajouter le Fournisseur" name="submit"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="outline" onClick={() => this.setState({showModal: !this.state.showModal})}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminHome;