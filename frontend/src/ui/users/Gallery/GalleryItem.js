import React from 'react';
import './Gallery.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const GalleryItem = (props) => {
        if(props.image.length) {
            const images = props.image.map(image => (
                <div className="col">
                    <img src={image} className="img-fluid" alt="" />
                </div>
            ));
            return (
                <div className="gallery-item">
                    <div className="header d-flex align-items-center">
                        <FontAwesomeIcon icon={faUserCircle} size={"3x"} />
                        <div className="name">
                            <h5>Abel Kevin</h5>
                            <span>Il ya 2 heures</span>
                        </div>
                    </div>
                    <div className="description">
                        <div className="mb-4 mt-3">
                            <h4>React Redux Node MongoDB JWT Authentication Example is the today’s leading topic. We use React and Redux for the frontend, Node.js as a platform, express as a web framework and MongoDB as a NoSQL database.</h4>
                        </div>
                    </div>
                    <div className="body">
                        <div className="row">
                            {images}
                        </div>
                    </div>
                </div>
            );
        }
}

export default GalleryItem;
