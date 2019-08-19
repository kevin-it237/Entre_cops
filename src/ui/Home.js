import React, { Component } from 'react';
import Header from '../ui/globalComponent/Header';

import Hoc from './globalComponent/Hoc';
import Events from '../ui/components/Events/Events';
import Services from '../ui/components/Services/Services';
import Categories from '../ui/components/Categories/Categories';
import Caroussel from '../ui/components/Caroussel/Caroussel';

class Home extends Component {
    render() {
        return (
            <Hoc>
                <Header home={true} />
                <Caroussel />
                <Categories />
                <Events eventType="Annonces" isHomePage={true} />
                <Services eventType="Services" isHomePage={true} />
            </Hoc>
        );
    }
}

export default Home;