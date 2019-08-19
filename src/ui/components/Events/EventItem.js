import React from 'react';
import img from '../../../assets/images/bg.jpg';
import { Link } from 'react-router-dom';

const EventItem = (props) => {
    return (
        <div class="home">
            <img src={img} alt="" class="home__img"/>
            <h5 class="home_name">Beautiful Family House</h5>
            <div class="home_content">
                <center>
                    <p>infos...</p>
                </center>
            </div>
            <Link className="btn home__btn" to="/service/details/1">Contact realtors</Link>
        </div>
    );
}

export default EventItem;