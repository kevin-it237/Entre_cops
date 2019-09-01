import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './Stars.scss';

class Stars extends Component {
    state = {}

    render() {
        return (
            <div className="stars">
                <FontAwesomeIcon icon={faStar} size={this.props.isSupplierDashboard ? "1x" : "2x"} />
                <FontAwesomeIcon icon={faStar} size={this.props.isSupplierDashboard ? "1x" : "2x"} />
                <FontAwesomeIcon icon={faStar} size={this.props.isSupplierDashboard ? "1x" : "2x"} />
                <FontAwesomeIcon icon={faStar} size={this.props.isSupplierDashboard ? "1x" : "2x"} />
                <FontAwesomeIcon icon={faStar} size={this.props.isSupplierDashboard ? "1x" : "2x"} />
                <span className={this.props.isSupplierDashboard ? "voteswhite" : "votes"}>(100 votes)</span>
            </div>
        )
    }
}

export default Stars;