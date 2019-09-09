import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Loader from '../../globalComponent/Loader';
import {rootUrl} from '../../../configs/config';

class AdminSupplier extends Component {

    state = {
        showModal: false,
        suppliers: [],
        loading: true,
        supplier: null,
        validating: false,
        deleting: false,
        loadinSingle: false,
        error: '',
        fetcherror: ''
    }

    componentDidMount() {
        axios.get('/api/supplier/all')
        .then(res => {
            this.setState({
                loading: false,
                suppliers: res.data.suppliers.reverse(),
                'fetcherror': ''
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                'fetcherror': "Erreur survenue, veuillez actualiser"
            })
        })
    }

    getSingleSupplier = (id) => {
        this.setState({ loadinSingle: true, showModal: true })
        axios.get('/api/supplier/'+id)
        .then(res => {
            this.setState({
                loadinSingle: false,
                supplier: res.data.supplier,
                'error': ''
            })
        })
        .catch(err => {
            this.setState({
                loadinSingle: false,
                'error': 'Erreur survenue, veuillez actualiser'
            })
        })
    }

    validateSupplier = (supplier) => {
        this.setState({ validating: true, supplier: supplier })
        axios.patch('/api/supplier/validate/' +supplier._id)
        .then(res => {
            let suppliers = this.state.suppliers.map(supplier => {
                let newSupplier = { ...supplier};
                if (supplier._id === this.state.supplier._id) {
                    newSupplier.accountValidated = true;
                }
                return newSupplier;
            })
            this.setState({
                suppliers: suppliers,
                validating: false,
                showModal: false,
                'error': ''
            })
            // Send Email to Supplier with link to set his password
        })
        .catch(err => {
            this.setState({
                validating: false,
                'error': 'Erreur survenue, veuillez actualiser'
            })
        })
    }

    deleteSupplier = (supplier) => {
        this.setState({ deleting: true, supplier: supplier })
        axios.delete('/api/user/'+supplier._id)
        .then(res => {
            let suppliers = this.state.suppliers.filter(supplier => {
                return JSON.stringify(supplier) !== JSON.stringify(this.state.supplier)
            })
            this.setState({
                deleting: false,
                showModal: false,
                suppliers: suppliers
            })
        })
        .catch(err => {
            this.setState({
                deleting: false,
                error: err
            })
        })
    }



    render() {
        const { loading, suppliers, supplier, validating, deleting, error, fetcherror, loadinSingle } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3 className="title mb-5">FOURNISSEURS</h3>
                        </div>
                        <div className="col-sm-12">
                            {fetcherror && fetcherror.length ? <div className="alert alert-danger">{fetcherror}</div> : null}
                            {
                                loading ? <div className="p-4 text-center"><Loader /></div> :
                                    suppliers&&suppliers.length ?
                                    <table class="table table-bordered">
                                        <thead class="thead-inverse thead-dark">
                                            <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Tel</th>
                                            <th>Création</th>
                                            <th>Etat</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            suppliers.map((supplier, id) => (
                                                <tr key={supplier._id}>
                                                    <th scope="row">{id+1}</th>
                                                    <td>{supplier.name}</td>
                                                    <td>{supplier.email}</td>
                                                    <td>{supplier.tel}</td>
                                                    <td className="date">{supplier.date}</td>
                                                    <td className="date">{supplier.accountValidated ? <span style={{ color: "green" }}>Compte Validé</span> : <b style={{ color: "#DC3545" }}>En attente</b>}</td>
                                                    <td className="actions">
                                                        <button className="btn btn-outline-dark btn-md ml-3" onClick={() => this.getSingleSupplier(supplier._id)}>Afficher</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                            
                                        </tbody>
                                    </table>: null
                                }
                                
                        </div>
                    </div>
                </div>

                 {/* Add a new Supplier Popup */}
                 <Modal show={this.state.showModal} size="lg" onHide={() => this.setState({showModal: false})} >
                    <Modal.Header closeButton>
                        <Modal.Title>Détails sur le Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    {error && error.length ? <div className="alert alert-danger">{error}</div>: null }
                                    {
                                        loadinSingle ? <div className="text-center"><Loader /></div> :
                                            supplier ? 
                                            <table class="table table-bordered">
                                                <tbody class="thead-inverse">
                                                    <tr>
                                                        <th><h4><strong>Nom</strong></h4></th>
                                                        <th><h4>{supplier.name}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Email</strong></h4></th>
                                                            <th><h4>{supplier.email}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Tel</strong></h4></th>
                                                            <th><h4>{supplier.tel}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Localisation</strong></h4></th>
                                                            <th><h4>{supplier.location}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Services</strong></h4></th>
                                                            <th><h4>{supplier.services}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Autres Infos</strong></h4></th>
                                                            <th><h4>{supplier.otherInfos}</h4></th>
                                                    </tr>
                                                    <tr>
                                                        <th><h4><strong>Profile</strong></h4></th>
                                                            <th>
                                                            <img src={rootUrl+"/"+supplier.profileImage} alt="" width="250" height="250"  className="img-fluid" />
                                                        </th>
                                                    </tr>
                                                </tbody>
                                                </table> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            {supplier&&!supplier.accountValidated ?
                                <Button variant="dark" className="mr-3" onClick={() => this.validateSupplier(supplier)}>
                                    {validating ? <Loader color="white" /> :"Valider ce compte"}
                                </Button>:null
                            }
                            <Button variant="danger" className="mr-3" onClick={() => this.deleteSupplier(supplier)}>
                                {deleting ? <Loader color="white" /> : "Supprimer"}
                            </Button>
                            <Button variant="default" onClick={() => this.setState({showModal: false, error: ''})}>
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