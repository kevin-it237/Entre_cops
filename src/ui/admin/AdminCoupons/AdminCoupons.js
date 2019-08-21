import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class AdminCoupons extends Component {

    state = {
        showModal: false
    }

    render() {
        return (
            <Fragment>
                <div className="container admin-coupons mt-4">
                    <div className="row">
                        <div className="col">
                            <h1>Genérer des coupons de réduction</h1>
                            <h4 className="mt-3">Liste des Services/Annonces</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <input type="text" placeholder="Rechercher" id="searchbar" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <table class="table table-bordered">
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                    <th>#</th>
                                    <th>Nom du service / Evenement</th>
                                    <th>Coupons Restants</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Formation Wordpress</td>
                                        <td>5</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-lg mr-3" onClick={() => this.setState({showModal: true})}>Générer des coupons</button>
                                            <button className="btn btn-dark btn-lg">Annuler coupons</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Concert Dadju</td>
                                        <td>0</td>
                                        <td className="date">
                                            <button className="btn btn-danger btn-lg mr-3" onClick={() => this.setState({showModal: true})}>Générer des coupons</button>
                                            <button className="btn btn-dark btn-lg">Annuler coupons</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Générer des coupons */}
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: !this.state.showModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Générer des coupons</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    <div class="form-group">
                                        <label for="name">Code</label>
                                        <input type="text" class="form-control" name="code" id="code" placeholder="Code"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="ncoupons">Numero de Téléphone</label>
                                        <input type="number" class="form-control" name="ncoupons" id="ncoupons"  placeholder="Nombre de coupons"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="danger" onClick={() => this.setState({showModal: !this.state.showModal})}>
                                Générer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminCoupons;