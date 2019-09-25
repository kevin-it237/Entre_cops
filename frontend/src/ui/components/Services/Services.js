import React, { Component } from 'react';
import ServiceItem from './ServicesItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../globalComponent/Loader';
import axios from 'axios';
import './Services.scss';

class Services extends Component {

    state = {
        loading: true,
        services: [],
        error: ''
    }

    componentWillMount() {
        if(!this.props.isCategoryPage) {
            const url = this.props.isHomePage ? '/api/service/4': '/api/service/validated/all';
            axios.get(url)
            .then(res => {
                this.setState({loading: false, services: res.data.services, error: ''})
            })
            .catch(err => {
                this.setState({loading: false, error: 'Une erreur s\'est produite. Veuillez recharger la page'})
            })
        } else {
            this.setState({services: this.props.services, loading: false, error: ''})
        }
       
    }

    componentDidUpdate(prevProps) {
        if(this.props.services !== prevProps.services) {
            if(this.props.isCategoryPage) {
                this.setState({services: this.props.services, loading: false, error: ''})
            }
        }
    }

    render() {
        const {error, services, loading} = this.state;
        return (
            <section className={this.props.isHomePage || this.props.isCategoryPage ? "services" : "services bg-white"}>
                <div className="container pt-3">
                    <div className="row pt-5">
                        <div className="col">
                            <center><h1 className="pt-4 pb-4 service-header">{this.props.eventType}</h1></center>
                        </div>
                    </div>
                    <div className={loading || error.length || this.props.isHomePage? "row pb-5 mb-2 justify-content-center":"row pb-5 mb-2"}>
                        {error.length ? <div className="alert alert-danger">{error}</div>:null}
                        {
                            loading ? <div className="d-block ml-auto mr-auto justify-content-center"><Loader/></div>:
                                services&&services.length ?
                                services.map((service, id) => (
                                        <div key={id} className="col-sm-12 col-md-6 col-lg-3">
                                            <ServiceItem service={service} />
                                        </div>
                                    )): null
                        }
                        {!loading&&services.length === 0 &&!error.length ? <div className="d-block ml-auto mr-auto justify-content-center"><h5>Aucun Service</h5></div>:null}
                    </div>
                    <div className="row pb-5">
                        {
                            this.props.isHomePage&&services.length !==0 ?
                            <div className="col all_services">
                                <a href="/services">Voir plus</a>
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