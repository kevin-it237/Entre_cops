import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Loader from '../../globalComponent/Loader';


class AdminEmails extends Component {

    state = {
        users: [],
        suppliers: [],
        loading: true,
        selectedUsers: [],
        content: '',
        object: '',
        error: ''
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(e.target.type === "checkbox") {
            const {selectedUsers} = this.state;
            if(selectedUsers.includes(value)) {
                let users = selectedUsers.filter(user => (user !== value))
                this.setState({selectedUsers: users});
            } else {
                this.setState(state => ({selectedUsers: [...state.selectedUsers, value]}));
            }
        } else {
            this.setState({[name]: value});
        }
    }

    componentDidMount() {
        //get user list
        axios.get('/api/user')
        .then(res => {
            this.setState({loading: false, users: res.data.users, error: ''})
        })
        .catch(err => {
            this.setState({loading: false,  error: 'Erreur, Veuillez reéssayer'})
        })
        //get suoolier list
        axios.get('/api/supplier/all')
        .then(res => {
            this.setState({loading: false, suppliers: res.data.suppliers, error: ''})
        })
        .catch(err => {
            this.setState({loading: false,  error: 'Erreur, Veuillez reéssayer'})
        })
    }

    selectAllUsers = (e, inputClass, toggleBtn) => {
        let usersCheckboxToggleAll = document.getElementsByClassName(toggleBtn)
        let usersCheckboxes = document.getElementsByClassName(inputClass)
        if(usersCheckboxToggleAll[0].checked) {
            let users = [];
            for (const input of usersCheckboxes) {
                input.checked = true
                users.push(input.value)
            }
            this.setState({selectedUsers: [...this.state.selectedUsers, ...users]})
        } else {
            let users = [...this.state.selectedUsers]
            for (const input of usersCheckboxes) {
                input.checked = false;
                users = users.filter(user => (user !== input.value))
            }
            this.setState({selectedUsers: users})
        }
    }

    render() {
        const {loading, users, suppliers, error, selectedUsers, content, object} = this.state;
        return (
            <Fragment>
                <div className="container mt-4">
                    <div className="row pt-5 pb-3">
                        <div className="col-sm-12">
                            <h2>Envoi des Emails</h2>
                        </div>
                        {error&&error.length ? <div className="alert alert-danger">{error}</div>:null}
                        {
                            loading ? <div className="col-sm-12"><div className="d-flex justify-content-center"><Loader /></div></div>:
                            <Fragment>
                                <div className="col-sm-12 user-list">
                                    <h4 className="mb-4 mt-4">Liste des utilisateurs</h4>
                                    <table className="table table-bordered reservations-list">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Actions <input onChange={(e) => this.selectAllUsers(e, "user-check", "user-check-verify")} type="checkbox" className="form-check-inline user-check-verify" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.map((user, i) => (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td><input onChange={(e) => this.handleInputChange(e)} type="checkbox" className="form-check-inline user-check" value={user.email} /></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-sm-12 supplier-list">
                                    <h4 className="mb-4 mt-4">Liste des Fournisseurs</h4>
                                    <table className="table table-bordered reservations-list">
                                        <thead className="thead-inverse thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Actions <input onChange={(e) => this.selectAllUsers(e, "supplier-check", "supplier-check-verify")} type="checkbox" className="form-check-inline supplier-check-verify" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            suppliers.map((supplier, i) => (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{supplier.name}</td>
                                                    <td>{supplier.email}</td>
                                                    <td><input onChange={(e) => this.handleInputChange(e)} type="checkbox" className="form-check-inline supplier-check" name={supplier.email} value={supplier.email} /></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <button onClick={() => this.setState({showModal: true})} className="button send-email-btn">Envoyer un Email ({this.state.selectedUsers.length})</button>
                            </Fragment>
                        }
                    </div>
                </div>

                {/* Envoyer les mail */}
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: !this.state.showModal})} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Envoi du mail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                               <div className="col">
                                    <div className="d-flex mb-4 flex-wrap">
                                        {
                                            selectedUsers.map((user, i) => <p className="user-email-item" key={i}>{user}</p>)
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Objet</label>
                                        <input  type="text" className="form-control" value={object} onChange={(e) => this.handleInputChange(e)} name="object" placeholder="Objet" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Contenu</label>
                                        <textarea style={{fontSize: "1.5rem"}} type="text" className="form-control" value={content} onChange={(e) => this.handleInputChange(e)} name="content" rows={5} placeholder="Contenu de l'email"></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button my-4">Envoyer ({selectedUsers.length}) {loading&&<Loader color="white"/>}</button>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminEmails;