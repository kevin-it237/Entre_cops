import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import {DateFormat} from '../../utils/DateFormat'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';


class AdminUser extends Component {

    state = {
        showModal: false,
        users: [],
        error: '',
        loading: true,
        deleting: false
    }

    componentWillMount() {
        try {
            axios.get('/api/user/')
            .then(res => {
                this.setState({ users: res.data.users, loading: false, error: '' })
            })
            .catch(err => {
                this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", loading: false })
            })
        } catch (error) {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", loading: false })
        }
    }

    deleteUser = (id) => {
        this.setState({ deleting: true, error: '' })
        axios.delete('api/user/' + id)
        .then(res => {
            let users = this.state.users.filter(user => {
                return user._id !== id;
            })
            this.setState({
                deleting: false,
                'error': '',
                users: users
            })
            this.setState({ deleting: false, error: '' })
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", deleting: false })
        })
    }

    render() {
        const {error, loading, deleting, users} = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title">UTILISATEURS</h3>
                        </div>
                        <div className="col-sm-12 text-center">
                            {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                loading ? <Loader />:
                                    users&&users.length ?
                                    <table className="table table-bordered">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Création</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.map((user, id) => (
                                                <tr key={id}>
                                                    <th scope="row">{id+1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td className="date"><DateFormat date={user.date} /></td>
                                                    <td className="actions">
                                                        <button onClick={() => this.deleteUser(user._id)} className="btn btn-danger btn-md ml-3">{deleting ? <Loader />:"Supprimer"}</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>:null
                            }
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

export default AdminUser;