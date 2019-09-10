import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ServiceModal from '../../suppliers/Dashboard/ServiceModal';
import Loader from '../../globalComponent/Loader';

class AdminService extends Component {

    state = {
        showModal: false,
        servicesLoading: true,
        services: [],
        error: '',
        service: null,
        loading: false
    }

    componentDidMount() {
        //Get 5 services
        axios.get('/api/service/all')
        .then(res => {
            this.setState({ services: res.data.services, servicesLoading: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", servicesLoading: false })
        })
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
        this.setState({ showModal: false });
    }

    render() {
        const { error, services, servicesLoading } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12 text-center">
                            <h3 className="title">TOUS LES SERVICES</h3>
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
            </Fragment>
        );
    }
}

export default AdminService;