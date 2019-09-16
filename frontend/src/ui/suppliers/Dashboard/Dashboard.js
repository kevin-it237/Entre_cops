import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Hoc from '../../globalComponent/Hoc';
import Header from '../../globalComponent/Header';
import ReviewItem from '../../components/Reviews/ReviewItem';
import Stars from '../../components/Stars/Stars';
import EventModal from './EventModal';
import ServiceModal from './ServiceModal';
import Footer from '../../globalComponent/Footer';
import Loader from '../../globalComponent/Loader';

class Dashboard extends Component {
    
    state = {
        showNewEv: false,
        showNewAn: false,

        services: [],
        events: [],
        servicesLoading: true,
        eventsLoading: true,
        error: '',
        error2: ''
    }
    
    handleChange = (date) => {
        this.setState({
            date: date
        });
    }

    setFile(name, file) {
        this.setState({
            [name]: file,
            profileImageValid: true,
            error: ''
        }, this.validateForm);
    }

    closeEventModal = () => {
        this.setState({showNewEv: false, showNewAn: false});
    }

    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user) {
            // get events
            this.fetchServices()
            // get services
            this.fetchEvents()
        }
    }

    componentDidMount() {
        if(this.props.user) {
            // get events
            this.fetchServices()
            // get services
            this.fetchEvents()
        }
    }

    fetchEvents = () => {
        axios.get('/api/event/supplier/'+ this.props.user._id)
        .then(res => {
            this.setState({events: res.data.events, eventsLoading: false, error: ''});
        })
        .catch(err => {
            this.setState({eventsLoading: false, error: 'Une erreur s\'est produite. Veuillez reéssayer.'});
            })
    }

    fetchServices = () => {
        axios.get('/api/service/supplier/'+ this.props.user._id)
        .then(res => {
            this.setState({services: res.data.services, servicesLoading: false, error: ''});
        })
        .catch(err => {
            this.setState({servicesLoading: false, error: 'Une erreur s\'est produite. Veuillez reéssayer.'});
        })
    }

    render() {
        const { events, services, eventsLoading, servicesLoading, error, error2 } = this.state;
        const {user} = this.props;
        return (
            <Hoc>
                {user&&user.role !== "supplier" ? <Redirect to="/" />:null }
                <Header />
                <section className="dashboard mt-5">
                    <div className="container p-5">
                        <div className="row pt-3">
                            <div className="col-sm-12 d-flex mb-3 add-buttom-wrapper">
                                <h2 className="py-3 mr-auto align-align-self-end">TOUTES LES RESERVATIONS</h2>
                                <button className="button" onClick={() => this.setState({showNewEv: true})}>NOUVEL EVENEMENT</button>
                                <button className="button" onClick={() => this.setState({showNewAn: true})}>NOUVEAU SERVICE</button>
                            </div>
                            <div className="col-sm-12">
                                <hr/>
                            </div>
                        </div>
                        {/* Events */}
                        <div className="row mt-2"><div className="col-sm-12 mt-2"><h3>MES EVENEMENTS</h3></div></div>
                        <div className="row mt-4 pb-5">
                            <div className="col-sm-12 col-md-12 col-lg-4 mt-2">
                            {
                                eventsLoading ? <div className="d-flex justify-content-center"><Loader /></div>:
                                    events && events.length ? 
                                        <div className="list-group" id="list-tab" role="tablist">
                                        {
                                            events.map((event, i) => (
                                                <a key={event._id} className={i===0 ?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"} id={event._id+"list-home-list"} data-toggle="list" href={event._id} role="tab" aria-controls="home">
                                                    {event.title} ({event.reservations&&event.reservations.length ? event.reservations.length: 0})
                                                    <br/>
                                                    <Stars isSupplierDashboard />
                                                </a>
                                            ))
                                        }
                                        </div>
                                    : <h5 className="">Vous n'avez aucun Evènement actif</h5>
                            }
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 mt-2 d-flex flex-column justify-content-between">
                                {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                                <div className="tab-content" id="nav-tabContent">
                                    {
                                        eventsLoading ? null :
                                            events && events.length ?
                                                events.map((event, i) => (
                                                    event.reservations && event.reservations.length ?
                                                    (
                                                        <div key={i} className={i===0 ?"tab-pane fade show active":"tab-pane fade show"} id={event._id} role="tabpanel" aria-labelledby="list-home-list">
                                                            <table className="table">
                                                            <tbody>
                                                                {events.reservations.map((event, i) => (
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>Mark</td>
                                                                        <td>@Otto.com</td>
                                                                        <td>655881562</td>
                                                                        <td className="date">05 Sep 2019</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            </table>
                                                        </div>
                                                    ): 
                                                    <div key={i} className={i===0 ?"tab-pane fade show active":"tab-pane fade show"} id={event._id} role="tabpanel" aria-labelledby="list-home-list">
                                                        <h3 className="text-center">Aucune reservation sur cet évènement.</h3>
                                                    </div>
                                                ))
                                            : null
                                    }
                                </div>
                                <div className="deleteWrapper d-flex">
                                    {
                                        events.reservations && events.reservations.length ?
                                        <button className="btn btn-dark ml-auto mt-3">Télécharger la liste&nbsp; 
                                            <FontAwesomeIcon icon={faDownload} size={"1x"} /></button>:null
                                    }
                                    {
                                        events&&events.length ? 
                                        <button className={events.reservations && events.reservations.length?"btn btn-danger ml-3 mt-3":"btn btn-danger ml-auto mt-3" }>Supprimer l'évenement</button>:null
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Services */}
                        <div className="row mt-2"><div className="col-sm-12 mt-2"><h3>MES SERVICES</h3></div></div>
                        <div className="row mt-4 pb-5">
                            <div className="col-sm-12 col-md-12 col-lg-4 mt-2">
                            {
                                servicesLoading ? <div className="d-flex justify-content-center"><Loader /></div>:
                                    services && services.length ? 
                                        <div className="list-group" id="list-tab" role="tablist">
                                        {
                                            services.map((service, i) => (
                                                <a key={service._id} className={i===0 ?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"} id={service._id+"list-home-list"} data-toggle="list" href={service._id} role="tab" aria-controls="home">
                                                    {service.title} ({service.reservations&&service.reservations.length ? service.reservations.length: 0})
                                                    <br/>
                                                    <Stars isSupplierDashboard />
                                                </a>
                                            ))
                                        }
                                        </div>
                                    : <h5 className="">Vous n'avez aucun Service actif</h5>
                            }
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 mt-2 d-flex flex-column justify-content-between">
                                {error2 && error2.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                                <div className="tab-content" id="nav-tabContent">
                                {
                                    servicesLoading ? null :
                                        services && services.length ?
                                            services.map((service, i) => (
                                                service.reservations && service.reservations.length ?
                                                (
                                                    <div key={i} className={i===0 ?"tab-pane fade show active":"tab-pane fade show"} id={service._id} role="tabpanel" aria-labelledby="list-home-list">
                                                        <table className="table">
                                                        <tbody>
                                                            {services.reservations.map((service, i) => (
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>Mark</td>
                                                                    <td>@Otto.com</td>
                                                                    <td>655881562</td>
                                                                    <td className="date">05 Sep 2019</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                ): 
                                                <div key={i} className={i===0 ?"tab-pane fade show active":"tab-pane fade show"} id={service._id} role="tabpanel" aria-labelledby="list-home-list">
                                                    <h3 className="text-center">Aucune reservation sur cet évènement.</h3>
                                                </div>
                                            ))
                                            : null
                                    }
                                </div>
                                <div className="deleteWrapper d-flex">
                                    {
                                        services.reservations && services.reservations.length ?
                                        <button className="btn btn-dark ml-auto mt-3">Télécharger la liste&nbsp; 
                                            <FontAwesomeIcon icon={faDownload} size={"1x"} /></button>:null
                                    }
                                    {
                                        services&&services.length ? 
                                        <button className={services.reservations && services.reservations.length?"btn btn-danger ml-3 mt-3":"btn btn-danger ml-auto mt-3" }>Supprimer le service</button>:null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* messages */}
                    <div className="container mt-5 p-5 mb-5">
                        <div className="row pt-3 align-items-start">
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <h3 className="pt-3 mb-5">Messages sur l'évènement</h3>
                                <ReviewItem/>
                                <ReviewItem/>
                                <ReviewItem/>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <h2>Other things here</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />

                {/* New Event/Annonce */}
                <EventModal 
                    user={this.props.user}
                    show={this.state.showNewEv} 
                    closeModal={this.closeEventModal}  />

                {/* New Service */}
                <ServiceModal 
                    user={this.props.user}
                    show={this.state.showNewAn}
                    closeModal={this.closeEventModal} />
            </Hoc>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapPropsToState)(Dashboard);