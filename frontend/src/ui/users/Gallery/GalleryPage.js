import React, { Component } from 'react';
import Header from '../../globalComponent/Header';
import { connect } from 'react-redux';
import GalleryList from './GalleryList';
import Hoc from '../../globalComponent/Hoc';

class Gallery extends Component {

    state = {};

    componentDidMount() {
       
    }

    render() {
        return (
            <Hoc>
                <Header />
                <GalleryList />
            </Hoc>
        );
    }
}

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapPropsToState)(Gallery);
