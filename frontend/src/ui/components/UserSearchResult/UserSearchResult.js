import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import './UserSearchResult.scss';

class UserSearchResult extends Component {

    state = {
        recommand: this.props.recommanded
    }

    applyRecommandation = () => {
        this.setState({ recommand: true })
        this.props.makeRecommandation();
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-between userSearchResult-item">
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
                    <h6>{this.props.name}</h6>
                </div>
                {
                    this.state.recommand ?
                    <button className="btn btn-outline-dark" disabled>Recommandé <FontAwesomeIcon icon={faCheck} /></button>:
                    <button className="btn btn-dark" onClick={this.applyRecommandation}>Recommander</button>
                }
            </div>
        );
    }
}

export default UserSearchResult;