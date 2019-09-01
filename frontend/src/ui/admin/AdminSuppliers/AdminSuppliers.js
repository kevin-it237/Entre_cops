import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class AdminSupplier extends Component {

    state = {
        showModal: false
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
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
                                    <th>Création</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Kev</td>
                                        <td>@kev</td>
                                        <td>655487925</td>
                                        <td className="date">05 Sep 2019</td>
                                        <td className="actions">
                                            <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.setState({showModal: !this.state.showModal})}>Afficher</button>
                                            <button className="btn btn-dark btn-md ml-3">Valider</button>
                                            <button className="btn btn-danger btn-md ml-3">Supprimer</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>

                 {/* Add a new Supplier Popup */}
                 <Modal show={this.state.showModal} size="lg" onHide={() => this.setState({showModal: !this.state.showModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Détails</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="danger" onClick={() => this.setState({showModal: !this.state.showModal})}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminSupplier;