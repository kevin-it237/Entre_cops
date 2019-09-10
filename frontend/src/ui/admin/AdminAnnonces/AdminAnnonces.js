import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';
import EventModal from '../../suppliers/Dashboard/EventModal';

class AdminAnnonce extends Component {

    state = {
        showModal: false,
        eventsLoading: true,
        events: [],
        error: '',
        event: null,
        loading: false
    }

    componentDidMount() {
        //Get 5 events
        axios.get('/api/event/all')
        .then(res => {
            this.setState({ events: res.data.events, eventsLoading: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", eventsLoading: false })
        })
    }

    getSingleEvent = (id) => {
        this.setState({ loading: true, showModal: true })
        axios.get('/api/event/' + id)
        .then(res => {
            this.setState({
                loading: false,
                event: res.data.event,
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

    // Refresh view when delete or validate event/service
    refreshList = (list, name) => {
        this.setState({
            [name]: list
        })
    }

    closeModal = () => {
        this.setState({showModal:false});
    }

    render() {
        const { error, events, eventsLoading} = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">TOUS LES EVENEMENTS</h3>
                        </div>
                        <div className="col-sm-12 text-center">
                            {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                eventsLoading ? <Loader /> :
                                    events && events.length ?
                                    <table className="table table-bordered">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Titre</th>
                                                <th>Lieux</th>
                                                <th>Date</th>
                                                <th>Categorie</th>
                                                <th>Etat</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            events.map((event, i) => (
                                                <tr key={event._id}>
                                                    <th scope="row">{i + 1}</th>
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
                                    </table> : null
                            }
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
                    loadingEv={this.state.loading}
                    show={this.state.showModal}
                    closeModal={this.closeModal} />

            </Fragment>
        );
    }
}

export default AdminAnnonce;