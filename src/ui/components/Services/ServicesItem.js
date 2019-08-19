import React from 'react';
import img from '../../../assets/images/bg.jpg';

const ServiceItem = (props) => {
    return (
        <div class="card">
            <div class="box">
                <div class="img">
                    <img src={img} alt="Service" />
                </div>
                <h2>Prakash Prajapati<br/><span>Web Graphic Designer</span></h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>
            </div>
        </div>
    );
}

export default ServiceItem;