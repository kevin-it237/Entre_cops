import React from 'react';
import img from '../../../assets/images/bg.jpg';
import { Link } from 'react-router-dom';

const ServiceItem = (props) => {
    return (
        <Link to="/service/details/2">
            <div class="card">
                <div class="box">
                    <div class="img">
                        <img src={img} alt="Service" />
                    </div>
                    <h2>Catégorie<br/>
                    <span>Web Graphic Designer</span></h2>
                    <p>Description du service...</p>
                </div>
            </div>
        </Link>
    );
}

export default ServiceItem;