import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../../globalComponent/Header';
import Loader from '../../globalComponent/Loader';
import {Tab, Tabs, Modal, Button} from 'react-bootstrap';
import {CouponPreview} from '../../components/CouponSchema/CouponPreview'
import {ReservationItem} from './ReservationItem';
import {CouponItem} from './CouponItem';
import './Reservations.scss';
import Hoc from '../../globalComponent/Hoc';

class Reservation extends Component {

    state = {
        loading: true,
        showModal: false,
        error: '',
        reservations: [],
        coupons: [],
        selectedCoupon: null,
        selectedReservations: [],
        deleting: false
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        const {selectedReservations} = this.state;
        // When uncheck
        if (selectedReservations.filter(res => JSON.stringify(res) === value).length > 0) {
            let reservations = selectedReservations.filter(res => (JSON.stringify(res) !== value))
            this.setState({selectedReservations: reservations});
        // When checked
        }else {
            this.setState(state => ({selectedReservations: [...state.selectedReservations, JSON.parse(value)]}));
        }
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

    deleteReservation = () => {
        this.setState({deleting: true})
        axios.patch('/api/announce/reservations/delete', {reservations: this.state.selectedReservations})
        .then(res => {
            // Update view
            let newReservations = []
            this.state.reservations.forEach(resa => {
                this.state.selectedReservations.forEach(reservation => {
                    if(JSON.stringify(resa) !== JSON.stringify(reservation)) {
                        newReservations.push(resa);
                    }
                });
            });
            this.setState({deleting: false, reservations: newReservations, selectedReservations: []});
        })
        .catch(err => {
            this.setState({ error: "Une érreur s'est produite. Veuillez recharger", loading: false })
        })
    }

    displayCoupon = (coupon) => {
        this.setState({showModal: true, selectedCoupon: coupon})
    }

    render() {
        const {deleting} = this.state;
        return (
            <Hoc>
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
                                                    <CouponItem key={id} coupon={coupon} />
                                                ))
                                        }
                                    </Tab>
                                    <Tab eventKey="home" title="Mes réservations">
                                        {
                                            this.state.loading ? <div className="d-block ml-auto mr-auto text-center mt-5"><Loader /></div> :
                                                this.state.reservations.map((notification, id) => (
                                                    <ReservationItem handleInputChange={this.handleInputChange} key={id} notification={notification} />
                                                ))
                                        }
                                        <div className="d-flex justify-content-end pt-3">
                                            {this.state.selectedReservations.length > 0&&
                                            <button disabled={deleting} onClick={this.deleteReservation} className="btn btn-danger">{deleting ? <Loader color="white" />:"Supprimer"}</button>}
                                        </div>
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
            </Hoc>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}


export default connect(mapPropsToState)(Reservation);
