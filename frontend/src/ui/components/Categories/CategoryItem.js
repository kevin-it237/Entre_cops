import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryItem = (props) => {
    const {category} = props;
    return (
        <div className="wrimagecard wrimagecard-topimage">
            <Link to={"/category/" + category._id}>
                <div className="wrimagecard-topimage_header">
                    <center><FontAwesomeIcon icon={props.icon} size={"3x"} /></center>
                </div>
                <div className="wrimagecard-topimage_title">
                    <p className="text-center">{category.name}</p>
                </div>
            </Link>
        </div>
    );
}

export default CategoryItem;