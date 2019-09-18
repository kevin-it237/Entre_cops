import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Recommandations.scss';

class Recommandation extends Component {
    render() {
        return (
            <div className="recommandations d-flex flex-column">
            {
                this.props.recommandations.map((rec, i) =>(
                    <div key={i} className="rec-item">
                        <a href={rec.link}>
                            <h4>{rec.title}</h4>
                            <div className="d-flex">
                                <div className="d-flex flex-row align-items-center">
                                    <FontAwesomeIcon icon={faUserCircle} size={"1x"} />
                                    <h6 className="ml-2 mb-0">Par {rec.name}</h6>
                                </div>
                                {/* <label className="ml-auto">New</label> */}
                            </div>
                        </a>
                    </div>
                ))
            }
            </div>
        );
    }
}

export default Recommandation;