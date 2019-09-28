import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ServiceModal from '../../suppliers/Dashboard/ServiceModal';
import Loader from '../../globalComponent/Loader';

class AdminService extends Component {

    state = {
        showModal: false,
        servicesLoading: true,
        services: [],
        error: '',
        service: null,
        loading: false,
        showCreationModal: false
    }

    componentDidMount() {
        this.getAllServices();
    }

    getAllServices = () => {
        //Get all services
        axios.get('/api/service/all')
            .then(res => {
                this.setState({ services: res.data.services, servicesLoading: false, error: '' })
            })
            .catch(err => {
                this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", servicesLoading: false })
            })
    }

    refreshServiceList = () => {
        this.setState({ servicesLoading: true })
        this.getAllServices();
    }

    getSingleEvent = (id) => {
        this.setState({ loading: true, showModal: true })
        axios.get('/api/service/' + id)
            .then(res => {
                this.setState({
                    loading: false,
                    service: res.data.service,
                    'error': ''
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    'error': 'Erreur survenue, veuillez actualiser'
                })
            })
    }

    // Refresh view when delete or validate service/service
    refreshList = (list, name) => {
        this.setState({
            [name]: list
        })
    }

    closeModal = () => {
        this.setState({ showModal: false, showCreationModal: false });
    }

    render() {
        const { error, services, servicesLoading } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12 text-center d-flex justify-content-between align-items-center mb-5">
                            <h3 className="title">TOUS LES SERVICES</h3>
                            <button onClick={() => this.setState({ showCreationModal: true })} className="button">Ajouter un service</button>
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
                                                        <td>{event.place}</td>
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
                        </div>
                    </div>
                </div>

                {/* View/Update An Event */}
                <ServiceModal
                    user={null}
                    isEditing={true}
                    service={this.state.service}
                    refreshList={this.refreshList}
                    services={this.state.services}
                    loadingAn={this.state.loading}
                    show={this.state.showModal}
                    closeModal={this.closeModal} />

                {/* New Service */}
                <ServiceModal
                    user={this.props.user}
                    show={this.state.showCreationModal}
                    closeModal={this.closeModal}
                    refreshServiceList={this.refreshServiceList} />

            </Fragment>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapPropsToState)(AdminService);