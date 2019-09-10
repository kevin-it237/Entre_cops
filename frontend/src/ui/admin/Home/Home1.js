import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SupplierForm from '../../components/Forms/SuplierForm';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';
import EventModal from '../../suppliers/Dashboard/EventModal';

class AdminHome extends Component {

    state = {
        showModal: false,
        eventsLoading: true,
        events: [],
        servicesLoading: true,
        services: [],
        error: '',
        showEventModal: false,
        showServiceModal: false,
        loadinSingleEv: false,
        loadinSingleAn: false,
        event: null,
        service: null
    }

    closeSupplierModal = () => {
        this.setState({showModal: false, showEventModal: false, showServiceModal: false});
    }

    componentDidMount() {
        //Get 5 events
        axios.get('/api/event/5')
        .then(res => {
            this.setState({ events: res.data.events, eventsLoading: false, error:'' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", eventsLoading: false })
        });

        //Get 5 services
        axios.get('/api/service/5')
        .then(res => {
            this.setState({ services: res.data.services, servicesLoading: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", servicesLoading: false })
        })
    }

    getSingleEvent = (id) => {
        this.setState({ loadinSingleEv: true, showEventModal: true })
        axios.get('/api/event/' + id)
        .then(res => {
            this.setState({
                loadinSingleEv: false,
                event: res.data.event,
                'error': ''
            })
        })
        .catch(err => {
            this.setState({
                loadinSingleEv: false,
                'error': 'Erreur survenue, veuillez actualiser'
            })
        })
    }

    // Refresh view when delete or validate event/service
    refreshList = (list, name) => {
        this.setState({
            [name]: list
        })
    }

    render() {
        const {events, eventsLoading, services, servicesLoading, error,} = this.state;
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
                                    <Link className="btn btn-dark btn-block" to="/admin/annonces">Gérer les Evènements</Link>
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
                            <h3 className="title">EVENEMENTS RECENTS</h3>
                        </div>
                        <div className="col-sm-12 text-center">
                            {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                eventsLoading ? <Loader />:
                                events&&events.length ?
                                    <table className="table table-bordered">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Lieux</th>
                                            <th>Date</th>
                                            <th>Catégorie</th>
                                            <th>Etat</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            events.map((event, i) => (
                                                <tr key={event._id}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{event.title}</td>
                                                    <td>{event.place}</td>
                                                    <td>{event.date}</td>
                                                    <td>{event.category}</td>
                                                    <td>{event.validated ? <span style={{ color: "green" }}>Validé</span> : <b style={{ color: "red" }}>En attente</b>}</td>
                                                    <td className="actions">
                                                        <button onClick={() => this.getSingleEvent(event._id)} className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>:null
                            }
                            <div className="d-flex justify-content-end">
                                <Link className="btn btn-dark" to="/admin/annonces">Afficher tous</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">SERVICES RECENTS</h3>
                        </div>
                        <div className="col-sm-12 text-center">
                            {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                servicesLoading ? <Loader /> :
                                    services && services.length ?
                                    <table className="table table-bordered">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Titre</th>
                                                <th>Lieu</th>
                                                <th>Cible</th>
                                                <th>Durée</th>
                                                <th>Etat</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                services.map((event, i) => (
                                                    <tr key={event._id}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{event.title}</td>
                                                        <td>{event.target}</td>
                                                        <td>{event.target}</td>
                                                        <td>{event.duration}</td>
                                                        <td>{event.validated ? <span style={{ color: "green" }}>Validé</span> : <b style={{ color: "red" }}>En attente</b>}</td>
                                                        <td className="actions">
                                                            <button onClick={() => this.getSingleEvent(event._id)} className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table> : null
                            }
                            <div className="d-flex justify-content-end">
                                <Link className="btn btn-dark" to="/admin/services">Afficher tous</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View/Update An Event */}
                <EventModal
                    user={null}
                    isEditing={true}
                    event={this.state.event}
                    refreshList={this.refreshList}
                    events={this.state.events}
                    loadingEv={this.state.loadinSingleEv}
                    show={this.state.showEventModal}
                    closeModal={this.closeSupplierModal} />

                {/* View/Update a Service */}

                 {/* Add a new Supplier Popup */}
                 <Modal show={this.state.showModal} size="lg" onHide={() => this.setState({showModal: !this.state.showModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Nouveau Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container supplier-form">
                            <SupplierForm closeModal={this.closeSupplierModal} />
                        </div>
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