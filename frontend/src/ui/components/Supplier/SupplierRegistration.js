import React, { Component, Fragment } from 'react';
import Header from '../../globalComponent/Header';
import SuplierForm from '../Forms/SuplierForm';
import './Supplier.scss';

class SupplierRegistration extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <section className="supplier-view-page">
                    <div className="container my-5">
                        <div className="row justify-content-center mt-5">
                            <div className="col-sm-11 col-md-10 col-lg-8 mb-5 supplier-registration-form">
                                <div className="row mb-5">
                                    <div className="col-sm-12">
                                        <h2 className="text-center mb-5">DEVINIR UN PARTENAIRE</h2>
                                        <hr />
                                    </div>
                                </div>
                                <SuplierForm />
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default SupplierRegistration;