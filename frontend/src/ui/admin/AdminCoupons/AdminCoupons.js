import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { rootUrl } from '../../../configs/config';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loader from '../../globalComponent/Loader';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import logo from '../../../assets/images/logo.png';
import {counponToPrint} from '../../components/CouponSchema/Coupon'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const image2base64 = require('image-to-base64');

class AdminCoupons extends Component {

    state = {
        showModal: false,
        error: '',
        loading: false,
        selectedAnnonce: null,
        eventType: '',
        
        event: null,
        events: [],
        eventsLoading: true,

        services: [],
        service: null,
        servicesLoading: true,

        nCoupons: '',
        infos: '',
        datelimite: '',
        montant: '',
        couponValid: false,
        couponError: '',
        removing: false
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, this.validate);
    }

    validate = () => {
        const { nCoupons, infos, datelimite, montant} = this.state;
        this.setState({
            couponValid: nCoupons.trim().length > 0
                        && infos.trim().length > 0
                        && datelimite.trim().length > 0
                        && montant.trim().length > 0
        })
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
        this.setState({showModal: true, loading: true, eventType: type});
        let url = "/api/" + type + "/" + id;
        axios.get(url)
        .then(res => {
            const data = type === "event" ? res.data.event : res.data.service;
            this.setState({ selectedAnnonce: data, loading: false })
        })
        .catch(err => {
            this.setState({error: 'Une erreur s\'est produite. Veuillez reéssayer.', loading: false})
        })
    }

    generateCoupon = () => {
        const {nCoupons, montant, datelimite, infos, eventType, selectedAnnonce} = this.state;
        let clients = [];
        if (selectedAnnonce.coupons) {
            if (selectedAnnonce.coupons.clients) {
                clients = [...selectedAnnonce.coupons.clients];
            }
        }
        this.setState({loading: true});
        const coupon = {
            nCoupons: nCoupons,
            montant: montant,
            datelimite: datelimite,
            title: selectedAnnonce.title,
            infos: infos,
            clients: clients,
            image: rootUrl + '/' + selectedAnnonce.image,
        };
        axios.patch(rootUrl + '/api/' + eventType + '/' + selectedAnnonce._id + '/add/coupon', { coupon: coupon })
        .then(res => {
            const data = eventType === "event" ? this.state.events : this.state.services;
            let newEvents = data.filter(event => {
                if (event._id === selectedAnnonce._id) {
                    event.coupons = coupon;
                }
                return event;
            })
            // generate the coupon
            image2base64(logo) // you can also to use url
            .then(response => {
                let docDefinition = counponToPrint(response, infos, montant, datelimite,
                    selectedAnnonce.title, "Entrecops", selectedAnnonce.title.split(' ').join('-'))
                pdfMake.createPdf(docDefinition).open();
                this.setState({ loading: false, showModal: false, [eventType+"s"]: newEvents })
            })
            .catch((error) => console.log(error))
        })
        .catch(err => {
            this.setState({ loading: false, couponError: 'Une erreur s\'est produite. Veuillez reéssayer.' });
        })
    }

    previewCoupon = (announce) => {
        const {infos, datelimite, montant} = announce.coupons;
        image2base64(logo) // you can also to use url
            .then(response => {
                let docDefinition = counponToPrint(response, infos, montant, datelimite,
                    announce.title, "Entrecops", announce.title.split(' ').join('-'))
                pdfMake.createPdf(docDefinition).open();
            })
            .catch((error) => console.log(error))
    }

    removeCoupon = (id, type) => {
        this.setState({ removing: true });
        let url = rootUrl + '/api/' + type + '/' + id + '/remove/coupon';
        axios.patch(url)
        .then(res => {
            const data = type === "event" ? this.state.events : this.state.services;
            let newEvents = data.filter(event => {
                if (event._id === id) {
                    event.coupons = null;
                }
                return event;
            })
            this.setState({ removing: false, [type + "s"]: newEvents })
        })
        .catch(err => {
            this.setState({ error: 'Une erreur s\'est produite. Veuillez reéssayer.', loading: false })
        })
    }


    render() {
        const { error, events, eventsLoading, services, servicesLoading, selectedAnnonce, loading } = this.state;
        return (
            <Fragment>
                <div className="container admin-coupons mt-4">
                    <div className="row pt-5 pb-3">
                        <div className="col">
                            <h1>Genérer des coupons de réduction</h1>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <input type="text" placeholder="Rechercher un service / Evènement" id="searchbar" />
                        </div>
                    </div> */}
                    {/* Evenement */}
                    <div className="row">
                        <div className="col-sm-12 py-3">
                            <h4 className="mt-3">Liste des Evènements</h4>
                        </div>
                        <div className="col-sm-12">
                            {error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                            {
                                eventsLoading ? <div className="d-block mr-auto ml-auto text-center"><Loader /></div> :
                                    events && events.length ?
                                    <table className="table table-bordered" id="thetable">
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
                                                        <td>{event.coupons ? event.coupons.nCoupons : 0}</td>
                                                        <td className="actions text-right">
                                                            {event.coupons ?
                                                            <Fragment>
                                                                <button className="btn btn-dark btn-lg mr-3" onClick={() => this.previewCoupon(event)}>Afficher le coupon</button>
                                                                <button className="btn btn-outline-danger btn-lg" onClick={() => this.removeCoupon(event._id, "event")}>Annuler coupons</button>
                                                            </Fragment>:
                                                            <button className="btn btn-danger btn-lg mr-3" onClick={() => this.openModal(event._id, "event")}>Générer des coupons</button>
                                                             }
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
                                servicesLoading ? <div className="d-block mr-auto ml-auto text-center"><Loader /></div> :
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
                                                            <td>{service.coupons ? service.coupons.nCoupons : 0}</td>
                                                            <td className="actions">
                                                                {
                                                                    service.coupons ?
                                                                    <Fragment>
                                                                        <button className="btn btn-dark btn-lg mr-3" onClick={() => this.previewCoupon(service)}>Afficher le coupon</button>
                                                                        <button className="btn btn-outline-danger btn-lg" onClick={() => this.removeCoupon(service._id, "service")}>Annuler coupons</button>
                                                                    </Fragment>:
                                                                    <button className="btn btn-danger btn-lg mr-3" onClick={() => this.openModal(service._id, "service")}>Générer des coupons</button>
                                                                }
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
                                {
                                    loading ? <div className="d-block mr-auto ml-auto text-center"><Loader /></div>:
                                    selectedAnnonce ?
                                    <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                        {!this.state.couponValid ? <div className="alert alert-danger mb-4">Veuillez remplis tous les champs</div>:null}
                                        <div className="pb-3">
                                            <h4>Coupons pour: &nbsp;<b>{selectedAnnonce.title}</b></h4>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Infos sur la réduction</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.infos} name="infos" className="form-control" placeholder="Informations"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Montant / Poucentage de reduction</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.montant} name="montant" className="form-control" placeholder="Montant / Pourcentage"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Date limite de validité</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.datelimite} name="datelimite" className="form-control" placeholder="Date limite de validité"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="ncoupons">Nombre de coupons</label>
                                            <input type="number" onChange={(e) => this.handleInputChange(e)} value={this.state.nCoupons} name="nCoupons" className="form-control" placeholder="Nombre de coupons"/>
                                        </div>
                                        <div className="couponwrap" id="couponwrap">

                                        </div>
                                    </div>:null
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button disabled={!this.state.couponValid} variant="danger" onClick={this.generateCoupon}>
                                Générer
                            </Button>
                            <Button variant="default" className="ml-4" onClick={() => this.setState({showModal: false})}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminCoupons;