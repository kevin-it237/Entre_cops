import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import Events from './Events';
import Categories from '../Categories/Categories';

class AllEventsPage extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                <Categories />
                <Events eventType="Toutes les Actualités" isHomePage={false} />
            </Fragment>
        );
    }
}

export default AllEventsPage;