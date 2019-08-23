import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import Footer from '../../globalComponent/Footer';
import SuplierForm from '../Forms/SuplierForm';
import './Supplier.scss';

class SupplierRegistration extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <SuplierForm />
                <Footer />
            </Fragment>
        );
    }
}

export default SupplierRegistration;