import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import { connect } from 'react-redux';
import GalleryList from './GalleryList';

class Gallery extends Component {

    state = {};

    componentDidMount() {
       
    }

    render() {
        return (
            <Fragment>
                <Header />
                <GalleryList />
            </Fragment>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapPropsToState)(Gallery);
