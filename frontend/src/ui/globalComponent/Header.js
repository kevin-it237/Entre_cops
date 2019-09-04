import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import logo from '../../assets/images/logo.png';

import Recommandations from '../users/Recommantions/Recommandations';

class Header extends Component {
    render() {
        return (
            <nav  className={this.props.home ? "navbar navbar-expand-lg navbar-light bg-light": "navbar navbar-expand-lg navbar-light bg-light navbar-shadow" }>
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="form-inline d-lg-none my-2 my-lg-0 navbar-brand">
                        <input className="form-control mr-sm-2" type="search" placeholder="Rechercher..." aria-label="Rechercher..."/>
                        <FontAwesomeIcon icon={faSearch} size={"2x"} />
                    </form>
                    <div className="dropdown-mobile mt-2">
                        <a href="/recommandations" className=""  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faBookmark} size={"1x"}/><sup className="ml-1">1</sup>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Recommandations />
                        </div>
                    </div>
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} width="110" height="100%" alt="Logo" />
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <form className="form-inline d-none d-lg-block my-2 my-lg-0 ml-auto mr-4">
                            <input className="form-control mr-sm-2" type="search" placeholder="Rechercher..." aria-label="Rechercher..."/>
                            <FontAwesomeIcon icon={faSearch} size={"2x"} />
                        </form>
                        <ul className="navbar-nav  mt-2 mt-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/home">Admin</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard/reservations">Réservations</NavLink>
                            </li>
                            <li className="nav-item rec-item-desktop">
                                <div className="dropdown mt-2">
                                    <a href="/recommandations" className=""  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faBookmark} size={"1x"}/><sup className="ml-1">1</sup>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Recommandations />
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/auth"><i className="fa fa-user"></i>Se connecter</NavLink>
                            </li>
                        </ul>
                        <div className="dropdown">
                            <p className="dropbtn">Ngaleu Kevin</p>
                            <div className="dropdown-content">
                                <a href="#logout"><i className="fa fa-sign-out"></i>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        username: state.auth.username,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => (data) => dispatch()
    }
}

export default connect(mapStateToProps)(Header);