import React from 'react';
import img from '../../../assets/images/bg.jpg';
import { Link } from 'react-router-dom';

const EventItem = (props) => {
    return (
        <div class="home">
            <img src={img} alt="" class="home__img"/>
            <h5 class="home_name">Prestation Petit pays à la Sanza</h5>
            <div class="home_content">
                <center>
                    <p>Description de l'évènement...</p>
                </center>
            </div>
            <Link className="btn home__btn" to="/service/details/1">Consulter</Link>
        </div>
    );
}

export default EventItem;