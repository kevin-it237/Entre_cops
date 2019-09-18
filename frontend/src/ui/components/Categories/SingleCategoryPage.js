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
            this.setState({events: res.data.events, error: '', loadingEvents: false});
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
            this.setState({services: res.data.services, error: '', loadingServices: false});
        })
        .catch(err => {
            this.setState({ error: 'Une érreur s\'est produite. Veuillez recharger.', loadingServices: false});
        })
    }

    render() {
        const {events, services, loadingEvents, loadingServices} = this.state;
        const category = this.props.match.params.id.split("-").join(" ");
        return (
            <Hoc>
                <Header />
                <Categories selected={category} />
                {
                    loadingEvents ? <div className="d-flex justify-content-center py-5"><Loader/></div>:
                    <Events events={events} isCategoryPage={true} eventType="Evènements" isHomePage={false} />  
                }
                {
                    loadingServices ? <div className="d-flex justify-content-center py-5"><Loader/></div>:  
                    <Services services={services} isCategoryPage={true} eventType="Services" isHomePage={false} />
                }
            </Hoc>
        );
    }
}

export default Home;