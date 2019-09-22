import React, { Component } from 'react';
import './Gallery.scss';
import GalleryItem from './GalleryItem';

import img1 from '../../../assets/images/art-birthday-bright-796605.jpg';
import img from '../../../assets/images/bg3.jpg';
import img2 from '../../../assets/images/bg2.jpg';

class GalleryList extends Component {

    state = {
        publications: '',
        error: '',
    };

    componentDidMount() {

    }



    render() {
        return (
            <section className="publications-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <GalleryItem image={[img1, img2]} />
                            <GalleryItem image={[img]} />
                            <GalleryItem image={[img, img1, img2]} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default GalleryList;
