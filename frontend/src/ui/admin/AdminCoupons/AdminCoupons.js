import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loader from '../../globalComponent/Loader';

class AdminCoupons extends Component {

    state = {
        showModal: false,
        error: '',
        loading: false,
        
        event: null,
        events: [],
        eventsLoading: true,

        services: [],
        service: null,
        servicesLoading: true
    }

    componentDidMount() {
        //Get all validated events
        axios.get('/api/event/validated/all')
        .then(res => {
            this.setState({ events: res.data.events, eventsLoading: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", eventsLoading: false })
        })

        //Get all validated services
        axios.get('/api/service/validated/all')
        .then(res => {
            this.setState({ services: res.data.services, servicesLoading: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", servicesLoading: false })
        })
    }

    openModal = (id, type) => {
        this.setState({showModal: true, loading: true});
        let url = "";
        if(type === "event") {
            url = "/api/event/" + id;
        } else 
        if(type === "service") {
            url = "/api/service/" + id;
        }
    }

    render() {
        const { error, events, eventsLoading, services, servicesLoading } = this.state;
        return (
            <Fragment>
                <div className="container admin-coupons mt-4">
                    <div className="row pt-5 pb-3">
                        <div className="col">
                            <h1>Genérer des coupons de réduction</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <input type="text" placeholder="Rechercher un service / Evènement" id="searchbar" />
                        </div>
                    </div>
                    {/* Evenement */}
                    <div className="row mt-4">
                        <div className="col-sm-12 py-3">
                            <h4 className="mt-3">Liste des Evènements</h4>
                        </div>
                        <div className="col-sm-12">
                            {error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                eventsLoading ? <Loader /> :
                                    events && events.length ?
                                    <table className="table table-bordered">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                            <th>#</th>
                                            <th>Nom de l'évenement</th>
                                            <th>Coupons Restants</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                events.map((event, i) => (
                                                    <tr key={event._id}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{event.title}</td>
                                                        <td>{event.coupons ? event.coupons.length : 0}</td>
                                                        <td className="actions">
                                                            <button className="btn btn-danger btn-lg mr-3" onClick={() => this.openModal(event._id, "event")}>Générer des coupons</button>
                                                            <button className="btn btn-dark btn-lg">Annuler coupons</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>:null
                            }
                        </div>
                    </div>

                    {/* Services */}
                    <div className="row mt-4">
                        <div className="col-sm-12 py-3">
                            <h4 className="mt-3">Liste des Services</h4>
                        </div>
                        <div className="col-sm-12">
                            {error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                servicesLoading ? <Loader /> :
                                    services && services.length ?
                                        <table className="table table-bordered">
                                            <thead className="thead-inverse thead-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nom du service</th>
                                                    <th>Coupons Restants</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    services.map((service, i) => (
                                                        <tr key={service._id}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{service.title}</td>
                                                            <td>{service.coupons ? service.coupons.length : 0}</td>
                                                            <td className="actions">
                                                                <button className="btn btn-danger btn-lg mr-3" onClick={() => this.openModal(service._id, "service")}>Générer des coupons</button>
                                                                <button className="btn btn-dark btn-lg">Annuler coupons</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table> : null
                            }
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
                                    <div className="form-group">
                                        <label for="name">Code</label>
                                        <input type="text" className="form-control" name="code" id="code" placeholder="Code"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="ncoupons">Numero de Téléphone</label>
                                        <input type="number" className="form-control" name="ncoupons" id="ncoupons"  placeholder="Nombre de coupons"/>
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