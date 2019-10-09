import React, { Component, Fragment } from 'react';
import './Supplier.scss';
import img from '../../../assets/images/b2.png';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <section className="supplier-view-page bannerwrapper">
                    <div className="container py-5 banner">
                        <div className="row py-5 justify-content-between align-items-center">
                            <div className="col-sm-12 d-none d-md-block col-md-6 align-self-end text-center">
                                <img src={img} className="img-fluid " alt="" />
                            </div>
                            <div className="col-sm-12 col-md-6 d-md-center">
                                <h1><b>Vous avez des services ou</b> </h1>
                                <h1><b>des actualités à communiquer ?</b></h1>
                                <a className="btn btn-outline-light btn-lg mt-4 supplierdemand" href="/supplier">Devenez un Partenaire Maintenant</a>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Home;