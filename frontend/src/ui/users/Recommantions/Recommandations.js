import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Recommandations.scss';

class Recommandation extends Component {
    render() {
        return (
            <div className="recommandations d-flex flex-column">
                <div className="rec-item">
                    <a href="/service/details/1">
                        <h4>Formation complète Wordpress</h4>
                        <div className="d-flex">
                            <div className="d-flex flex-row align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} size={"1x"} />
                                <h6 className="ml-2 mb-0">@kevin</h6>
                            </div>
                            <label className="ml-auto">New</label>
                        </div>
                    </a>
                </div>
                <div className="rec-item">
                    <a href="/service/details/1">
                        <h4>Prestation Ko-C Sanza Night Club</h4>
                        <div className="d-flex">
                            <div className="d-flex flex-row align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} size={"1x"} />
                                <h6 className="ml-2 mb-0">@kevin</h6>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Recommandation;