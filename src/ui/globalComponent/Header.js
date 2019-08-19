import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <nav  className={this.props.home ? "navbar navbar-expand-lg navbar-light bg-light": "navbar navbar-expand-lg navbar-light bg-light navbar-shadow" }>
                <div class="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">
                        <img src="img/mlogo.png" width="50" height="50" alt="" />
                        <h3 class="d-inline align-middle">LOGO</h3>
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <form className="form-inline my-2 my-lg-0 ml-auto mr-4">
                            <input className="form-control mr-sm-2" type="search" placeholder="Rechercher..." aria-label="Rechercher..."/>
                            <FontAwesomeIcon icon={faSearch} size={"2x"} />
                        </form>
                        <ul className="navbar-nav  mt-2 mt-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard/reservations">Réservations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="#recommadations"><FontAwesomeIcon icon={faBookmark} size={"1x"}/><sup>new</sup></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/auth"><i class="fa fa-user"></i>Se connecter</NavLink>
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

export default Header;