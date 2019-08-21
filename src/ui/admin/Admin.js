import React, { Component, Fragment } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import AdminCoupons from './AdminCoupons/AdminCoupons';
import AdminHome from './Home/Home';
import AdminAnnonces from './AdminAnnonces/AdminAnnonces';
import AdminServices from './AdminServices/AdminServices';
import AdminSuppliers from './AdminSuppliers/AdminSuppliers';
import AdminUsers from './AdminUsers/AdminUsers';
import './Admin.scss';
import logo from '../../assets/images/logo.png';


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
                                <img src={logo} width="110" height="50" alt="LOGO" />
                            </div>
                            <div className="menu mt-5">
                                <NavLink className="navbar-brand" to="/admin/home">
                                    <h3 className="d-inline align-middle">ACCUEIL</h3>
                                </NavLink> 
                                <NavLink className="navbar-brand" to="/admin/annonces">
                                    <h3 className="d-inline align-middle">EVENEMENTS</h3>
                                </NavLink> 
                                <NavLink className="navbar-brand" to="/admin/services">
                                    <h3 className="d-inline align-middle">SERVICES</h3>
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
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="col d-flex justify-content-end mb-3">
                                        <div className="stat-item">
                                            <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
                                            <h4>50 Fournisseurs</h4>
                                        </div>
                                        <div className="stat-item">
                                            <FontAwesomeIcon icon={faUserFriends} size={"2x"} />
                                            <h4>1250 Utilisateurs</h4>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            {/* Admin Component */}
                            <Route exact path="/admin/home" component={AdminHome} />
                            <Route exact path="/admin/coupons" component={AdminCoupons} />
                            <Route exact path="/admin/annonces" component={AdminAnnonces} />
                            <Route exact path="/admin/services" component={AdminServices} />
                            <Route exact path="/admin/suppliers" component={AdminSuppliers} />
                            <Route exact path="/admin/users" component={AdminUsers} />
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Admin;