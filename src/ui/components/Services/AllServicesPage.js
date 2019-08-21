import React, { Component } from 'react';
import Hoc from '../../globalComponent/Hoc';
import Header from '../../globalComponent/Header';
import Services from './Services';
import Categories from '../Categories/Categories';
import Footer from '../../globalComponent/Footer';

class AllServicesPage extends Component {

    render() {
        return (
            <Hoc>
                <Header />
                <Categories />
                <Services eventType="Tous les Services" isHomePage={false} />
                <Footer />
            </Hoc>
        );
    }
}

export default AllServicesPage;