import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Loader from '../../globalComponent/Loader';
import Gallery from 'react-grid-gallery';
import axios from 'axios';
import { rootUrl } from '../../../configs/config';

class AdminSlider extends Component {

    state = {
        loading: true,
        showModal: false,
        imagesToUpload: [],
        currentBanner: [],
        images: [],
        previewImages: null,
        error: '',
        successUpload: false,
        imageToDelete: false
    }

    onSelectImage = (index, image) => {
        var images = this.state.images.slice();
        var img = images[index];
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });
    }

    onSelectImageToRemove = (index, image) => {
        var currentBanner = this.state.currentBanner.slice();
        var img = currentBanner[index];
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            currentBanner: currentBanner
        }, () => {
            const images = this.state.currentBanner.filter(image => image.isSelected === true)
            images.length ? this.setState({imageToDelete: true}): this.setState({imageToDelete: false})
        });
    }

    // preview image
    preview = (e) => {
        let images = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        this.setState({ previewImages: images, imagesToUpload: e.target.files });
    }

    getImages = () => {
         // get all banner images
         axios.get('/api/banner')
         .then(res => {
             let currentBanner = res.data.banners.filter(banner => banner.isCurrent === true)
             currentBanner = currentBanner.map(banner => {
                 return {
                     src: rootUrl + '/' + banner.link,
                     thumbnail: rootUrl + '/' + banner.link,
                     thumbnailWidth: 320,
                     thumbnailHeight: 213,
                     id: banner._id
                    }
                })
             const allImages = res.data.banners.map(banner => {
                 return {
                     src: rootUrl + '/' + banner.link,
                     thumbnail: rootUrl + '/' + banner.link,
                     thumbnailWidth: 320,
                     thumbnailHeight: 213,
                     id: banner._id
                 }
             })
             this.setState({loading: false, successUpload: true, images: allImages, currentBanner: currentBanner})
         })
         .catch(err => {
             this.setState({error: "Une erreur s'est produite, veuillez reéssayer", loading: false, successUpload: false})
         })
    }

    componentDidMount() {
       this.getImages();
    }

    //Upload images
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.imagesToUpload.length) {
            this.setState({loading: true, successUpload: false, error: ''})
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            Array.from(this.state.imagesToUpload).forEach((file, i) => {
                const formData = new FormData();
                formData.append('image', file);
                axios.post('/api/banner', formData, config)
                .then(res => {
                    if(this.state.imagesToUpload.length === i+1) {
                        this.setState({successUpload: true, error: '', showModal: false})
                        this.getImages()
                    }
                })
                .catch(err => {
                    if(this.state.imagesToUpload.length === i+1) {
                        this.setState({error: "Une erreur s'est produite, veuillez reéssayer", loading: false, successUpload: false})
                    }
                })
            });
        } else {
            alert("Choisissez des images à importer")
        }
    }

    // Configure banner
    setBanner = () => {
        const bannerImages = this.state.images.filter(banner => banner.isSelected === true);
        if(bannerImages.length) {
            this.setState({loading: true})
            axios.patch('/api/banner/set', {bannerImages: bannerImages})
            .then(res => {
                this.setState({error: ''})
                this.getImages();
            })
            .catch(err => {
                this.setState({loading: false, error: "Une erreur s'est produite, veuillez reéssayer",})
            })
        } else {
            alert("Sélectionnez des images à configurer sur la bannière")
        }
    }

    //Remove images to banner
    removeToBanner = () => {
        const bannerImages = this.state.currentBanner.filter(banner => banner.isSelected === true);
        if(bannerImages.length) {
            this.setState({loading: true})
            axios.patch('/api/banner/remove', {bannerImages: bannerImages})
            .then(res => {
                this.setState({error: '', imageToDelete: false})
                this.getImages();
            })
            .catch(err => {
                this.setState({loading: false, error: "Une erreur s'est produite, veuillez reéssayer", imageToDelete: false})
            })
        } else {
            alert("Sélectionnez des images à enlever de la bannière")
        }
    }

    render() {
        const {loading, showModal} = this.state;
        return (
            <Fragment>
                <div className="container mt-4 mb-5">
                    <div className="row pt-5 pb-3">
                        <div className="col d-flex justify-content-between align-items-center">
                            <h1>Configuration de la bannière</h1>
                            <button onClick={() => this.setState({showModal: true})} className="button">Importer des Images</button>
                        </div>
                    </div>
                    {this.state.error.length ? <div className="d-flex justify-content-center alert-danger alert">{this.state.error}</div>:null}
                    {this.state.loading ? <div className="d-flex justify-content-center"><Loader /></div> : 
                        <Fragment>
                            <div className="row mt-2">
                                <div className="col-sm-12 d-flex mt-5 mb-4">
                                    <h2>Images sur la Bannière actuelle</h2>
                                </div>
                                <div className="col-sm-12">
                                    <Gallery
                                        images={this.state.currentBanner}
                                        onSelectImage={this.onSelectImageToRemove}
                                        lightboxWidth={1536}
                                    />
                                </div>
                                {this.state.imageToDelete ?
                                    <div className="col-sm-12 d-flex justify-content-center mt-5 mb-4">
                                        <button onClick={this.removeToBanner} className="btn btn-danger">{loading ? <Loader color="white" /> :"Enlever de la bannière"}</button>
                                    </div>:null
                                }
                            </div>
                            <div className="row mt-5">
                                <div className="col-sm-12 mt-5 mb-4">
                                    <h2>Toutes les images importées</h2>
                                    <h5>Selectionnez des images et enregistrer pour configurer la bannière.</h5>
                                </div>
                                <div className="col-sm-12">
                                    <Gallery
                                        images={this.state.images}
                                        onSelectImage={this.onSelectImage}
                                        lightboxWidth={1536}
                                    />
                                </div>
                                <div className="col-sm-12 d-flex mt-5 justify-content-end">
                                    <button className="button" onClick={this.setBanner}>Ajouter à la bannière</button>
                                </div>
                            </div>
                        </Fragment>
                    }
                </div>

                <Modal show={showModal} onHide={() => this.setState({showModal : false})} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>Importer des Images de bannière</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                        <div className="row justify-content-center py-3">
                                            <div className="col-sm-12 col-md-10">
                                                <div className="custom-file">
                                                    <input disabled={this.state.validated} onChange={(e) => this.preview(e)} type="file" className="custom-file-input" accept="image/*" id="customFile" multiple />
                                                    <label className="custom-file-label" for="customFile">Choisir les images</label>
                                                </div>
                                                <div className="row justify-content-center mt-3">
                                                    {this.state.previewImages ?
                                                        this.state.previewImages.map((image, id) => (
                                                            <div key={id} className="col-sm-6 mt-2">
                                                                <img src={image} className="img-fluid" alt="" />
                                                            </div>
                                                        )) : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button disabled={loading} type="submit" onClick={(e) => this.handleSubmit(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "IMPORTER"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}

export default AdminSlider;