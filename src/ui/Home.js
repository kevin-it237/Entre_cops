import React, { Component } from 'react';
import Header from '../ui/globalComponent/Header';
import Footer from '../ui/globalComponent/Footer';

import Hoc from './globalComponent/Hoc';
import Events from '../ui/components/Events/Events';
import Services from '../ui/components/Services/Services';
import Categories from '../ui/components/Categories/Categories';
import Caroussel from '../ui/components/Caroussel/Caroussel';
import SupplierBaner from '../ui/components/Supplier/SupplierBanner';

class Home extends Component {
    render() {
        return (
            <Hoc>
                <Header home={true} />
                <Caroussel />
                <Categories />
                <Events eventType="Evènements" isHomePage={true} />
                <Services eventType="Services" isHomePage={true} />
                <SupplierBaner />
                <Footer />
            </Hoc>
        );
    }
}

export default Home;