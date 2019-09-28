import React, { Component } from 'react';
import EventItem from './EventItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../globalComponent/Loader';
import axios from 'axios';
import './Events.scss';

class Events extends Component {

    state = {
        loading: true,
        events: [],
        error: ''
    }

    componentWillMount() {
        if(!this.props.isCategoryPage) {
            const url = this.props.isHomePage ? '/api/event/4': '/api/event/validated/all';
            axios.get(url)
            .then(res => {
                this.setState({loading: false, events: res.data.events, error: ''})
            })
            .catch(err => {
                this.setState({loading: false, error: 'Une erreur s\'est produite. Veuillez recharger la page'})
            })
        } else {
            this.setState({events: this.props.events, loading: false, error: ''})
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.events !== prevProps.events) {
            if(this.props.isCategoryPage) {
                this.setState({events: this.props.events, loading: false, error: ''})
            }
        }
    }

    render() {
        const {error, events, loading} = this.state;
        return (
            <section className="events pt-3" id="events">
                <div className="container pb-5 pt-3">
                    <div className="row pt-5">
                        {
                            this.props.isHomePage ?
                            <div className="col-sm-12">
                                <h3 className="pt-3 event-header text-center">{this.props.eventType}</h3>
                            </div>:
                            <div className="col-sm-12 d-flex align-items-center justify-content-between header-wrapper">
                                <h3 className="pt-3 event-header">{this.props.eventType}</h3>
                                <div className="d-flex align-items-center filter">
                                    <h6>Filtrer par: </h6>
                                    <select className="form-control">
                                        <option>Lieu</option>
                                        <option>Date</option>
                                    </select>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={loading || error.length || this.props.isHomePage? "row pb-5 mb-2 justify-content-center":"row pb-5 mb-2"}>
                        {error&&error.length ? <div className="alert alert-danger">{error}</div>:null}
                        {
                            loading ? <div className="d-block ml-auto mr-auto justify-content-center"><Loader/></div>:
                                events&&events.length ?
                                    events.map((event, id) => (
                                        <div key={id} className="col-sm-12 col-md-6 col-lg-3">
                                            <EventItem event={event} />
                                        </div>
                                    )): null
                        }
                        {!loading&&events.length === 0 &&!error.length ? <div className="d-block ml-auto mr-auto justify-content-center"><h5>Aucune Actualité</h5></div>:null}
                    </div>
                    <div className="row pb-5">
                        {
                            this.props.isHomePage&&events.length !==0 ?
                            <div className="col all_events">
                                <a href="/events">Voir plus</a>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div> : null
                        }
                    </div>
                </div>
            </section> 
        );
    }
}

export default Events;