import React, { Component, Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import { faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/images/logo.png';
import socketIOClient from 'socket.io-client';

import Notifications from '../users/Notifications/Notifications';
import { rootUrl } from '../../configs/config';
import {autoSignIn} from '../../store/actions'

class Header extends Component {

    state = {
        user: null,
        name: "",
        token: null,
        role: "",
        accountValidated: null,
        redirect: false
    }

    componentDidMount() {
        const socket = socketIOClient(rootUrl);
        socket.on('display notification', data => {
            const authData = JSON.parse(localStorage.getItem("authData"));
            if (authData&&authData.user) {
                if (authData.user._id === data.to) {
                    this.props.onAutoSign();
                }
            }
        })

        socket.on('display anounce notification', data => {
            const authData = JSON.parse(localStorage.getItem("authData"));
            if (authData && authData.user) {
                try {
                    // save in database
                    axios.patch('/api/user/' + authData.user._id + '/recommand', { rec: data })
                        .then(res => {
                            this.props.onAutoSign();
                        })
                        .catch(err => {
                            this.setState({ recError: 'Une érreur s\'est produite. Veuillez recharger la page.' })
                        })
                } catch (error) {
                    this.setState({ recError: 'Une érreur s\'est produite. Veuillez recharger la page.' })
                }
            }
        })
    }

    componentWillMount() {
        const authData = JSON.parse(localStorage.getItem("authData"));
        if(authData&&authData.user) {
            this.setState({
                user: authData.user,
                name: authData.user.name,
                token: authData.token,
                role: authData.user.role,
                accountValidated: authData.user.accountValidated
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user !== this.props.user) {
            this.setState({
                user: this.props.user,
                name: this.props.name, 
                token: this.props.token, 
                role: this.props.role, 
                accountValidated: this.props.accountValidated
            })
        }
    }
    
    logout = () => {
        this.props.onLogout();
        this.setState({redirect: true})
    }

    render() {
        const { name, token, role, accountValidated, user } = this.state;
        let nNotifications = 0;
        if (user && user.recommandations && user.recommandations.length) {
            let unOpened = user.recommandations.filter(rec => {
                return rec.visited === false;
            })
            nNotifications = unOpened.length;
        }
        return (
            <nav className={this.props.home ? "navbar navbar-expand-lg navbar-light bg-light navbar-shadow": "navbar navbar-expand-lg navbar-light bg-light navbar-shadow" }>
                {this.state.redirect ? <Redirect to="/" />: null}
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="form-inline d-lg-none my-2 my-lg-0 navbar-brand form-mobile">
                        <input className="form-control mr-sm-2" type="search" placeholder="Rechercher..." aria-label="Rechercher..."/>
                        <FontAwesomeIcon icon={faSearch} size={"2x"} />
                    </form>
                    {
                        token ?
                        <div className="dropdown-mobile mt-2">
                            <a href="/recommandations" className=""  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faBookmark} size={"1x"} /><sup className="ml-1">{user.recommandations && user.recommandations.length ? user.recommandations.length:0}</sup>
                            </a>
                                {user.recommandations && user.recommandations.length ? 
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Notifications recommandations={user.recommandations.reverse()} />
                                        <div className="notifications-link py-2">
                                            <a id="notifications-link" className="notifications-link pt-3 text-center" href="/user/notifications">Voir toutes les notifications</a>
                                        </div>
                                    </div> : null
                                }
                        </div>:null
                            
                    }
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="110" height="100%" alt="Logo" />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <form className="form-inline d-none d-lg-block my-2 my-lg-0 ml-auto mr-4 form-desktop">
                            <input className="form-control mr-sm-2" type="search" placeholder="Rechercher..." aria-label="Rechercher..."/>
                            <FontAwesomeIcon icon={faSearch} size={"2x"} />
                        </form>
                        <ul className="navbar-nav  mt-2 mt-lg-0">
                            {
                                token && role === "admin" ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/home">Admin</NavLink>
                                </li>:null
                            }
                            {
                                token && role === "supplier" && accountValidated ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/reservations">Réservations</NavLink>
                                </li>:null
                            }
                            {
                                token && role === "user" ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/user/reservations">Mes réservations</NavLink>
                                </li>:null
                            }
                            {
                                token ?
                                <li className="nav-item rec-item-desktop">
                                    <div className="dropdown mt-2">
                                        <a href="/recommandations" className=""  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <FontAwesomeIcon icon={faBookmark} size={"1x"} /><sup className="ml-1">{nNotifications}</sup>
                                        </a>
                                        {user.recommandations && user.recommandations.length ?
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Notifications recommandations={user.recommandations.reverse()} />
                                                <div className="notifications-link py-2">
                                                    <a id="notifications-link" className="notifications-link pt-3 text-center" href="/user/notifications">Voir toutes les notifications</a>
                                                </div>
                                            </div> : null
                                        }
                                    </div>
                                </li>: null
                                    
                            }
                            {
                                !token ?
                                    <Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/auth/signup"><i className="fa fa-user"></i>Créer un compte</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/auth/login"><i className="fa fa-user"></i>Se connecter</NavLink>
                                        </li>
                                    </Fragment>
                                    :null
                            }
                        </ul>
                            {
                                token ?
                                <div className="dropdown">
                                    <p className="dropbtn">{name}</p>
                                    <div className="dropdown-content">
                                        <NavLink className="nav-link" to="/user/profile"><i className="fa fa-user"></i>Mon profil</NavLink>
                                        <a href="#logout" onClick={this.logout}><i className="fa fa-sign-out"></i>Logout</a>
                                    </div>
                                </div>: null
                            }
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.email,
        email: state.auth.email,
        name: state.auth.name,
        token: state.auth.token,
        role: state.auth.role,
        accountValidated: state.auth.accountValidated,
        user: state.auth.user
    }
}

const mapDispatchToState = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
        onAutoSign: () => dispatch(autoSignIn())
    }
}


export default connect(mapStateToProps, mapDispatchToState)(Header);