import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../globalComponent/Header';
import Loader from '../../globalComponent/Loader';
import './Reservations.scss';

class Reservation extends Component {

    state = {
        loading: true,
        notifications: [],
        error: ''
    }

    componentDidMount() {
        const authData = JSON.parse(localStorage.getItem("authData"))
        this.setState({ notifications: authData.user.recommandations, loading: false })
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
                                {
                                    this.state.loading ? <div className="d-block ml-auto mr-auto text-center"><Loader /></div> :
                                        this.state.notifications.map((notification, id) => (
                                            <a key={id} href={notification.link} className={(id + 1) % 2 !== 0 ? "noti-link d-flex justify-content-between notvisited" : "noti-link d-flex justify-content-between"}>
                                                <div>
                                                    <h3>{notification.title}</h3>
                                                    <span>{notification.name}</span>
                                                </div>
                                                <h6>{notification.date ? notification.date : null}</h6>
                                            </a>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
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
