import React from 'react';
import img from '../../../assets/images/bg.jpg';

const EventItem = (props) => {
    return (
        <a href="/service/details/1" className="home">
            <img src={img} alt="" class="home__img"/>
            <h5 class="home_name">Prestation Petit pays à la Sanza</h5>
            <div class="home_content">
                <center>
                    <p>Description de l'évènement...</p>
                </center>
            </div>
            <a className="btn home__btn" href="/service/details/1">Consulter</a>
        </a>
    );
}

export default EventItem;