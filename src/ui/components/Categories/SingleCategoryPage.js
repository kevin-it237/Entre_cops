import React, { Component } from 'react';
import Header from '../../globalComponent/Header';
import Hoc from '../../globalComponent/Hoc';
import Categories from './Categories';
import Events from '../Events/Events';
import Footer from '../../globalComponent/Footer';
import './Categories.scss';

class Home extends Component {
    render() {
        return (
            <Hoc>
                <Header />
                <Categories />
                <Events eventType="Category 1" isHomePage={false} />
                <Footer />
            </Hoc>
        );
    }
}

export default Home;