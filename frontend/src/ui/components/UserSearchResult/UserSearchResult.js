import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import './UserSearchResult.scss';

class UserSearchResult extends Component {

    state = {
        recommand: false
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-between userSearchResult-item">
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
                    <h6>@yourname</h6>
                </div>
                {
                    this.state.recommand ?
                    <button className="btn btn-outline-dark">Recommandé <FontAwesomeIcon icon={faCheck} /></button>:
                    <button className="btn btn-dark" onClick={() => this.setState({ recommand: true})}>Recommander</button>

                }
            </div>
        );
    }
}

export default UserSearchResult;