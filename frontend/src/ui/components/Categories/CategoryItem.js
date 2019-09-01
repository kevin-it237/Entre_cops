import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryItem = (props) => {
    return (
        <div class="wrimagecard wrimagecard-topimage">
            <Link to="/category/1">
                <div class="wrimagecard-topimage_header">
                    <center><FontAwesomeIcon icon={props.icon} size={"3x"} /></center>
                </div>
                <div class="wrimagecard-topimage_title">
                    <p className="text-center">{props.categoryName}</p>
                </div>
            </Link>
        </div>
    );
}

export default CategoryItem;