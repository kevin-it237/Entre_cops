import React from 'react';
import './Gallery.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {rootUrl} from '../../../configs/config';

const GalleryItem = (props) => {
        if(props.images.length) {
            let className = "col";
            if (props.images.length > 4 && props.images.length < 9) {
                className = "col-sm-4";
            } else if (props.images.length >= 9) {
                className = "col-sm-3";
            }
            const images = props.images.map(image => (
                <div className={className}>
                    <img src={rootUrl + '/' +image} className="img-fluid" alt="" />
                </div>
            ));
            return (
                <div className="gallery-item">
                    <div className="header d-flex align-items-center">
                        <FontAwesomeIcon icon={faUserCircle} size={"3x"} />
                        <div className="name">
                            <h5>Entrecops</h5>
                            <span>{props.date}</span>
                        </div>
                    </div>
                    <div className="description">
                        <div className="mb-4 mt-3">
                            <h4>{props.content}</h4>
                        </div>
                    </div>
                    <div className="body">
                        <div className="row justify-content-lg-center">
                            {images}
                        </div>
                    </div>
                </div>
            );
        }
}

export default GalleryItem;
