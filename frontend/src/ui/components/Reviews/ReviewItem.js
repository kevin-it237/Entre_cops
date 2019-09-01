import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ReviewItem.scss';

const ReviewItem = (props) => {
    return (
        <div className="row review-item">
            <div className="col">
                <div className="box-head d-flex">
                    <FontAwesomeIcon icon={faUserCircle} size={"3x"} />
                    <div className="box-body">
                        <h5>@kevinit</h5>
                        <p className="mt-3 pb-3">I hate loosing my music when I can’t pay and this just so happened
                        to come up worked with no issues to come up worked with no issues</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;