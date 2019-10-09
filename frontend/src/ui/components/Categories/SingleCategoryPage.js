import React, { Component } from 'react';
import Header from '../../globalComponent/Header';
import Hoc from '../../globalComponent/Hoc';
import Categories from './Categories';
import Events from '../Events/Events';
import Services from '../Services/Services';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';
import './Categories.scss';

class Home extends Component {

    state = {
        loadingServices: true,
        loadingEvents: true,
        services: [],
        events: [],
        error: ''
    }

    componentDidMount() {
        this.getEventsByCategory();
        this.getServicesByCategory();
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.getEventsByCategory();
            this.getServicesByCategory();
        }
    }

    getEventsByCategory = () => {
        this.setState({ loadingEvents: true});
        const category = this.props.match.params.id.split("-").join(" ");
        // Fetch events/services
        axios.get('/api/event/category/' + category)
        .then(res => {
            let data = res.data.events;
            if (window.location.pathname.split('/')[1] !== "events") {
                data = data.slice(0, 8);
            }
            this.setState({events: data, error: '', loadingEvents: false});
        })
        .catch(err => {
            this.setState({ error: 'Une érreur s\'est produite. Veuillez recharger.', loadingEvents: false});
        })
    }

    getServicesByCategory = () => {
        this.setState({ loadingServices: true});
        const category = this.props.match.params.id.split("-").join(" ");
        // Fetch services/services
        axios.get('/api/service/category/' + category)
        .then(res => {
            let data = res.data.services;
            if (window.location.pathname.split('/')[1] !== "services") {
                data = data.slice(0, 8);
            }
            this.setState({services: data, error: '', loadingServices: false});
        })
        .catch(err => {
            this.setState({ error: 'Une érreur s\'est produite. Veuillez recharger.', loadingServices: false});
        })
    }

    render() {
        const {events, services, loadingEvents, loadingServices} = this.state;
        const category = this.props.match.params.id.split("-").join(" ");
        const isAllAnoucesPage = window.location.pathname.split('/')[1] === "category";
        return (
            <Hoc>
                <Header />
                <Categories selected={category} />
                {
                    this.props.match.params.AnounceType === "events" || isAllAnoucesPage ?
                        loadingEvents ? <div className="d-flex justify-content-center py-5"><Loader /></div> :
                        <Events showMore={isAllAnoucesPage} category={category}  events={events} isCategoryPage={true} eventType="Evènements" isHomePage={false} /> : null
                }
                {
                    this.props.match.params.AnounceType === "services" || isAllAnoucesPage ?
                        loadingServices ? <div className="d-flex justify-content-center py-5"><Loader /></div> :
                        <Services showMore={isAllAnoucesPage} category={category} services={services} isCategoryPage={true} eventType="Services" isHomePage={false} /> : null
                }
            </Hoc>
        );
    }
}

export default Home;