import React, { Component } from 'react';
import ServiceItem from './ServicesItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Services.scss';

class Services extends Component {

    render() {
        return (
            <section className={this.props.isHomePage ? "services" : "services bg-white"}>
                <div className="container">
                    <div className="row py-5">
                        <div className="col">
                            <center><h1 className="pt-4 service-header">{this.props.eventType}</h1></center>
                        </div>
                    </div>
                    <div className="row pb-5 mb-2">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <ServiceItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <ServiceItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <ServiceItem />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <ServiceItem />
                        </div>
                    </div>
                    <div className="row pb-5">
                        {
                            this.props.isHomePage ?
                            <div className="col all_services">
                                <Link to="/services">Tous les Services</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>: null
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Services;