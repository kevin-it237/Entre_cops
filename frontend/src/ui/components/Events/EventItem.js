import React from 'react';
import {rootUrl} from '../../../configs/config';

const EventItem = (props) => {
    const textLength = props.event.description.length;
    const description = textLength <= 95 ? props.event.description:
        props.event.description.slice(0, 93) + '...';
    return (
        <a href={"/annonce/event/" + props.event._id} className="home mt-5">
            <img src={rootUrl+'/'+props.event.image} alt="" className="home__img"/>
            <h5 className="home_name">{props.event.title}</h5>
            <div className="home_content">
                <center>
                    <p>{description}</p>
                </center>
            </div>
            <button className="btn home__btn">Consulter</button>
        </a>
    );
}

export default EventItem;