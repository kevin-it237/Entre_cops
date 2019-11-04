import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../../globalComponent/Header';
import Loader from '../../globalComponent/Loader';
import {Tab, Tabs, Modal, Button} from 'react-bootstrap';
import {CouponPreview} from '../../components/CouponSchema/CouponPreview'
import { DateFormat } from '../../utils/DateFormat'
import './Reservations.scss';

class Reservation extends Component {

    state = {
        loading: true,
        showModal: false,
        error: '',
        reservations: [],
        coupons: [],
        selectedCoupon: null
    }

    componentDidMount() {
        const authData = JSON.parse(localStorage.getItem("authData"));
        // Events
        let reservations = [];
        let coupons = [];
        axios.get('/api/event/all')
        .then(res => {
            const datas = res.data.events;
            datas.forEach(event => {
                // Find user reservations
                event.reservations.forEach(res => {
                    if (res.userId === authData.user._id) {
                        reservations.push(res)
                    }
                });
                // Find user coupons
                if (event.coupons && event.coupons.clients) {
                    if (event.coupons.clients.includes(authData.user._id)) {
                        coupons.push(event.coupons)
                    }
                }
            });
            this.setState({
                reservations: [...this.state.reservations, ...reservations], 
                coupons: [...this.state.coupons, ...coupons],
                loading: false})
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez recharger", loading: false })
        })
        // Services
        let reservations2 = [];
        let coupons2 = [];
        axios.get('/api/service/all')
            .then(res => {
                const datas = res.data.services;
                datas.forEach(service => {
                    service.reservations.forEach(res => {
                        if (res.userId === authData.user._id) {
                            reservations2.push(res)
                        }
                    });
                    // Find user coupons
                    if (service.coupons && service.coupons.clients) {
                        if (service.coupons.clients.includes(authData.user._id)) {
                            coupons2.push(service.coupons)
                        }
                    }
                });
                this.setState({ 
                    reservations: [...this.state.reservations, ...reservations2], 
                    coupons: [...this.state.coupons, ...coupons2],
                    loading: false })
            })
            .catch(err => {
                this.setState({ error: "Une érreur s'est produite. Veuillez recharger", loading: false })
            })
    }

    displayCoupon = (coupon) => {
        this.setState({showModal: true, selectedCoupon: coupon})
    }

    render() {
        return (
            <Fragment>
                <Header />
                <section className="res-section">
                    <div className="container my-5">
                        <div className="row justify-content-between">
                            <div className="col-sm-12 py-4">
                                <h3 className="pb-1"><strong>Historique de mes Activités</strong></h3>
                            </div>
                            <div className="col-sm-12">
                                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                    <Tab eventKey="profile" title="Coupons Sauvegardés">
                                        {
                                            this.state.loading ? <div className="d-block ml-auto mr-auto text-center mt-5"><Loader /></div> :
                                                this.state.coupons.map((coupon, id) => (
                                                    <a key={id} onClick={() => this.displayCoupon(coupon) } href={coupon.link} className={coupon.visited ? "noti-link d-flex" : "noti-link d-flex notvisited"}>
                                                        <img src={coupon.image} className="rounded-circle img-fluid" alt="" />
                                                        <div className="d-flex d-flex justify-content-between flex-grow-1">
                                                            <div className="mr-auto">
                                                                <h4>{coupon.infos}</h4>
                                                                <h5><strong>{coupon.title}</strong></h5>
                                                                <span>Limite de Validité: {coupon.datelimite}</span>
                                                            </div>
                                                            <h5 className=""><span className="badge badge-danger">Réduction {coupon.montant}</span></h5>
                                                        </div>
                                                    </a>
                                                ))
                                        }
                                    </Tab>
                                    <Tab eventKey="home" title="Mes réservations">
                                        {
                                            this.state.loading ? <div className="d-block ml-auto mr-auto text-center mt-5"><Loader /></div> :
                                                this.state.reservations.map((notification, id) => (
                                                    <a key={id} href={notification.link} className={notification.visited ? "noti-link d-flex" : "noti-link d-flex notvisited"}>
                                                        <img src={notification.image} className="rounded-circle img-fluid" alt="" />
                                                        <div className="d-flex d-flex justify-content-between flex-grow-1">
                                                            <div className="mr-auto">
                                                                <h3>{notification.title}</h3>
                                                                <span>Date de l'activité: <DateFormat date={notification.date} /></span>
                                                            </div>
                                                            <h5 className="">Nombres de places réservées: <span className="badge badge-danger">{notification.numberOfPlaces}</span></h5>
                                                        </div>
                                                    </a>
                                                ))
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="md" >
                    <Modal.Header closeButton>
                        <Modal.Title>Coupon de réduction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3 text-center">
                                    {
                                        this.state.selectedCoupon&&
                                    <CouponPreview coupon={this.state.selectedCoupon} />
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="default" onClick={() => this.setState({ showModal: false })}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
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


export default connect(mapPropsToState)(Reservation);
