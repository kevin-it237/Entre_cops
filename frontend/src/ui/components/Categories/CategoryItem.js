import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryItem = (props) => {
    const {category} = props;
    const categoryName = category.name.split(" ").join("-");
    let url = "";
    if (window.location.pathname.split('/')[1] === "events") {
        url = "/events/category/" + categoryName;
    } else if (window.location.pathname.split('/')[1] === "services") {
        url = "/services/category/" + categoryName;
    } else {
        url = "/category/" + categoryName;
    }
    return (
        <div className="wrimagecard wrimagecard-topimage">
            <NavLink to={url}>
                <div className="wrimagecard-topimage_header">
                    <center><FontAwesomeIcon icon={props.icon} size={"3x"} /></center>
                </div>
                <div className="wrimagecard-topimage_title">
                    <p className={props.selected ? "text-center selected": "text-center"}>{category.name}</p>
                </div>
            </NavLink>
        </div>
    );
}

export default CategoryItem;