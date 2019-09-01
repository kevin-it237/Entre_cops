import React, { Component } from 'react';
import EventItem from './EventItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Events.scss';

class Events extends Component {

    render() {
        return (
            <section className="events" id="events">
                <div className="container pb-5 pt-3">
                    <div className="row py-5">
                        <div className="col">
                            <center><h1 className="pt-3 event-header">{this.props.eventType}</h1></center>
                        </div>
                    </div>
                    <div className="row pb-5 mb-2">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <EventItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <EventItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <EventItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <EventItem />
                        </div>
                    </div>
                    <div className="row pb-5">
                        {
                            this.props.isHomePage ?
                            <div className="col all_events">
                                <a href="/annonces">Tous les Evènements</a>
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