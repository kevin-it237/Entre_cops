import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload} from '@fortawesome/free-solid-svg-icons';
import ServiceModal from '../../suppliers/Dashboard/ServiceModal';
import Loader from '../../globalComponent/Loader';

class AdminService extends Component {

    state = {
        showModal: false,
        servicesLoading: true,
        showReservationListModal: false,
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

    getSingleEvent = (id, info) => {
        if(info === "detail")
            this.setState({ loading: true, showModal: true})
        else 
            this.setState({ loading: true, showReservationListModal: true })
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

    generateCSV = (data, announce) => {
        let csvContent = "data:text/csv;charset=utf-8,";
        // Format our csv file content
        csvContent += "id , name, email, tel, places \r\n";
        data.forEach(function (rowArray, i) {
            let row = (i + 1) + " , " + rowArray.name + " , " + rowArray.email + " , " + rowArray.tel + " , " + rowArray.numberOfPlaces;
            csvContent += row + "\r\n";
        });

        // Creating the file
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        let fileName = announce.split(' ').join('-');
        link.setAttribute("download", fileName + ".csv");
        link.click();
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
                                                services.map((service, i) => (
                                                    <tr key={service._id}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{service.title}</td>
                                                        <td>{service.place}</td>
                                                        <td>{service.target}</td>
                                                        <td>{service.duration}</td>
                                                        <td>{service.validated ? <span style={{ color: "green" }}>Validé</span> : <b style={{ color: "red" }}>En attente</b>}</td>
                                                        <td className="actions">
                                                            <button onClick={() => this.getSingleEvent(service._id, "detail")} className="btn btn-outline-dark btn-md ml-3">Afficher</button>
                                                            <button onClick={() => this.getSingleEvent(service._id, "reservations")} className="btn btn-dark btn-md ml-3">Voir les réservations</button>
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

                {/* reservation list */}
                <Modal show={this.state.showReservationListModal} onHide={() => this.setState({showReservationListModal : false})} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>Liste des réservations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    {this.state.loading ? <div className="d-flex justify-content-center"><Loader /></div>:
                                    this.state.service&&this.state.service.reservations && this.state.service.reservations.length ?
                                            (
                                               <Fragment>
                                               <h3 className="mb-3">{this.state.service.title}</h3>
                                                    <table className="table table-bordered reservations-list">
                                                        <tbody>
                                                            {this.state.service.reservations.map((reservation, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">{i + 1}</th>
                                                                    <td>{reservation.name}</td>
                                                                    <td>{reservation.email}</td>
                                                                    <td>{reservation.tel}</td>
                                                                    <td>Places: {reservation.numberOfPlaces}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="deleteWrapper d-flex mt-auto">
                                                        <button className="btn btn-dark ml-auto mt-3" onClick={() => this.generateCSV(this.state.service.reservations, this.state.service.title)}>Télécharger la liste&nbsp;<FontAwesomeIcon icon={faDownload} size={"1x"} /></button>
                                                    </div>
                                               </Fragment>
                                            ): <div className="d-flex justify-content-center"><p>Aucune réservation.</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

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