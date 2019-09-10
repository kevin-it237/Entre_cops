import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Dashboard.scss';
import axios from 'axios';

import Hoc from '../../globalComponent/Hoc';
import Header from '../../globalComponent/Header';
import ReviewItem from '../../components/Reviews/ReviewItem';
import Stars from '../../components/Stars/Stars';
import EventModal from './EventModal';
import ServiceModal from './ServiceModal';

class Dashboard extends Component {
    
    state = {
        showNewEv: false,
        showNewAn: false,
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

    componentDidMount() {
        
    }

    render() {
        return (
            <Hoc>
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
                        <div className="row mt-4 pb-5">
                            <div className="col-sm-12 col-md-12 col-lg-4 mt-2">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                                        After Work - Prestation (3)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">
                                        Miss & Master Etudiant 2020 (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                                        Formation Wordpress débutant (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">
                                        Cours d'Allemand rapide (1)
                                        <br/>
                                        <Stars isSupplierDashboard />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 mt-2 d-flex flex-column justify-content-between">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>@Otto.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>@Thornton.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>theBird.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>@Otto.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Larry</td>
                                                <td>theBird.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <td>Jacob</td>
                                                <td>@Thornton.com</td>
                                                <td>655881562</td>
                                                <td className="date">05 Sep 2019</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="deleteWrapper d-flex">
                                    <button className="btn btn-danger ml-auto mt-3">Supprimer l'Evenement/Service</button>
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