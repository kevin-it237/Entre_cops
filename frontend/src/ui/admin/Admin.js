import React, { Component, Fragment } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import AdminCoupons from './AdminCoupons/AdminCoupons';
import AdminHome from './Home/Home';
import AdminAnnonces from './AdminAnnonces/AdminAnnonces';
import AdminServices from './AdminServices/AdminServices';
import AdminSuppliers from './AdminSuppliers/AdminSuppliers';
import AdminUsers from './AdminUsers/AdminUsers';
import Loader from '../globalComponent/Loader';
import { logout } from '../../store/actions'
import axios from 'axios';
import './Admin.scss';
import logo from '../../assets/images/logo.png';


class Admin extends Component {

    state = {
        showModal: false,
        nSuppliers: null,
        nUsers: null,
        loadingSuppliers: true,
        loadingUsers: true,
        error: ''
    }

    componentDidMount() {
        //Get number of supplier
        axios.get('/api/supplier/count/all')
            .then(res => {
                this.setState({ nSuppliers: res.data.n, loadingSuppliers: false, error: '' })
            })
            .catch(err => {
                this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", loadingSuppliers: false })
            })

        //Get number of users
        axios.get('/api/user/count/all')
            .then(res => {
                this.setState({ nUsers: res.data.n, loadingUsers: false, error: '' })
            })
            .catch(err => {
                this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", loadingUsers: false })
            })
    }

    render() {
        const {user} = this.props;
        const {nSuppliers, nUsers, loadingSuppliers, loadingUsers} = this.state;
        return (
            <Fragment>
                {user&&user.role !== "admin" ? <Redirect to="/" />:null }
                <section className="admin">
                    <div className="main-container">
                        <div className="left-content d-flex flex-column">
                            <div className="logoWrapper">
                                <a href="/"><img src={logo} width="110" height="50" alt="LOGO" /></a>
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
                                <a href="#logout" onClick={this.props.onLogout} className="mt-auto btn btn-outline-light btn-lg logout">Logout</a> 
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="col d-flex justify-content-end mb-3">
                                        <div className="stat-item">
                                            <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
                                            {loadingSuppliers ? <Loader /> : <h4>{nSuppliers} Fournisseurs</h4>}
                                        </div>
                                        <div className="stat-item">
                                            <FontAwesomeIcon icon={faUserFriends} size={"2x"} />
                                            {loadingUsers ? <Loader /> : <h4>{nUsers} Utilisateurs</h4>}
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

const mapPropsToState = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToState = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Admin);