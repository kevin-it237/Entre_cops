import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import Services from './Services';
import Categories from '../Categories/Categories';

class AllServicesPage extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                <Categories />
                <Services eventType="Tous les Services" isHomePage={false} />
            </Fragment>
        );
    }
}

export default AllServicesPage;