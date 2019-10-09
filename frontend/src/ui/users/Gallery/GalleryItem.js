import React, { Component, Fragment } from 'react';
import Gallery from 'react-grid-gallery';
import './Gallery.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {rootUrl} from '../../../configs/config';
import logo from '../../../assets/images/logo.png';

let images = [];

class GalleryItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false, user: JSON.parse(localStorage.getItem("authData")).user, currentImage: 0
        };

        this.importTomyGallery = this.importTomyGallery.bind(this);
    }

    importTomyGallery() {
        // Saving in gallery
        alert(images[this.state.currentImage].src)
        if(this.state.user.gallery) {
            if (this.state.user.gallery.includes(images[this.state.currentImage].src)) {
                alert("Cette image est déja incluse dans votre Galerie.")
            } else {
                // axios.patch('/api/user/' + this.state.user._id + '/galleryimages/save', { gallery: [images[this.state.currentImage].src]})
                // .then(res => {
                //     alert("Image importée avec succès!!")
                // })
                // .catch(err => {
                //     console.log(err)
                // })
            }
        }
    }


    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    render() {
        if(this.props.images.length) {
            images = this.props.images.map((image, id) => (
                {
                    src: rootUrl + '/' + image,
                    thumbnail: rootUrl + '/' + image,
                    thumbnailWidth: 768,
                    thumbnailHeight: 520,
                    isSelected: false,
                }
            ));
        }
        
        
        return (
            <Fragment>
                <div className="gallery-item d-block">
                    <div className="header d-flex">
                        <img src={logo} width="70px" height="50px" className="mr-3" alt="" />
                        <div className="name">
                            <h5>Entrecops</h5>
                            <span>{this.props.date}</span>
                            <div className="description" onClick={this.toggleModal}>
                                <div className="mb-4 mt-3">
                                    <h4>{this.props.content}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="body">
                        <Gallery
                            enableLightbox={true}
                            enableImageSelection={false}
                            images={images}
                            currentImageWillChange={this.onCurrentImageChange}
                            customControls={[<i></i>,
                                <button style={{position: "absolute", right: "0", bottom: "40px", borderRadius: "0"}} 
                                className="btn btn-danger btn-lg" key="deleteImage" onClick={this.importTomyGallery}>
                                <FontAwesomeIcon size="1x" icon={faDownload} /> Impoter dans ma Galerie</button>
                            ]}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default GalleryItem;
