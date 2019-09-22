import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import { connect } from 'react-redux';
import UploadImage from './UploadImage';
import GalleryList from './GalleryList';



class Gallery extends Component {

    state = {};

    componentDidMount() {
       
    }

    render() {
        return (
            <Fragment>
                <Header />
                <UploadImage />
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
