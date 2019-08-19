import React, { Component, Fragment } from 'react';
import { NavLink, Route } from 'react-router-dom';
import AdminCoupons from './AdminCoupons/AdminCoupons';
import AdminHome from './Home/Home';
import './Admin.scss';


class Admin extends Component {

    state = {
        showModal: false
    }

    render() {
        return (
            <Fragment>
                <section className="admin">
                    <div className="main-container">
                        <div className="left-content d-flex flex-column">
                            <div className="logoWrapper">
                                <h1>Logo</h1>
                            </div>
                            <div className="menu mt-5">
                                <NavLink className="navbar-brand" to="/admin/home">
                                    <h3 className="d-inline align-middle">ACCUEIL</h3>
                                </NavLink> 
                                <NavLink className="navbar-brand" to="/admin/coupons">
                                    <h3 className="d-inline align-middle">COUPONS</h3>
                                </NavLink> 
                                <NavLink className="navbar-brand" to="/admin/suppliers">
                                    <h3 className="d-inline align-middle">FOURNISSEURS</h3>
                                </NavLink> 
                                <NavLink className="navbar-brand" to="/admin/users">
                                    <h3 className="d-inline align-middle">UTILISATEURS</h3>
                                </NavLink>
                                <a href="/admin/login" className="mt-auto btn btn-outline-light btn-lg logout">Logout</a> 
                            </div>
                        </div>
                        <div className="right-content">
                            {/* Admin Component */}
                            <Route exact path="/admin/home" component={AdminHome} />
                            <Route exact path="/admin/coupons" component={AdminCoupons} />
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Admin;