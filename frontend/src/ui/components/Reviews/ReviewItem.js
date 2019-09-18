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
                        <h5>@{props.comment.name}</h5>
                        <p className="mt-3 pb-3">{props.comment.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;