import React from 'react';
import img from '../../../assets/images/bg.jpg';

const EventItem = (props) => {
    return (
        <a href="/service/details/1" className="home">
            <img src={img} alt="" className="home__img"/>
            <h5 className="home_name">Prestation Petit pays à la Sanza</h5>
            <div className="home_content">
                <center>
                    <p>Description de l'évènement...</p>
                </center>
            </div>
            <button className="btn home__btn">Consulter</button>
        </a>
    );
}

export default EventItem;