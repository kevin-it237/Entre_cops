import React from 'react';
import img from '../../../assets/images/bg.jpg';

const ServiceItem = (props) => {
    return (
        <a href="/service/details/2">
            <div className="card">
                <div className="box">
                    <div className="img">
                        <img src={img} alt="Service" />
                    </div>
                    <h2>Catégorie<br/>
                    <span>Web Graphic Designer</span></h2>
                    <p>Description du service...</p>
                </div>
            </div>
        </a>
    );
}

export default ServiceItem;