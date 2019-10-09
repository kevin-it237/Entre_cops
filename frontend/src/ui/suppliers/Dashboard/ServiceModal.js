import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Upload from '../../components/Forms/Upload';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Loader from '../../globalComponent/Loader';
import { rootUrl } from '../../../configs/config';
import './EventForm.scss';

class ServiceModal extends Component {
    state = {
        title: '',
        category: '',
        cible: '',
        probleme: '',
        serviceVideo: '',
        youtubeVideoLink: '',
        offre: '',
        duration: '',
        place: '',
        isTyping: false,
        formValid: false,
        previewImages: null,
        images: null,
        titleValid: false,
        categoryValid: false,
        cibleValid: false,
        placeValid: false,
        offreValid: false,
        problemeValid: false,
        serviceImageValid: false,
        loading: false,
        error: '',
        categories: [],
        validated: false,
        validating: false,
        deleting: false,
        loadingAn :false
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, error: '' },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let { titleValid, problemeValid, cibleValid, serviceImageValid, 
            categoryValid, offreValid, placeValid } = this.state;

        switch (fieldName) {
            case 'title':
                titleValid = value.length > 0;
                break;
            case 'probleme':
                problemeValid = value.length > 0;
                break;
            case 'cible':
                cibleValid = value.length > 0;
                break;
            case 'category':
                categoryValid = value.length > 0;
                break;
            case 'offre':
                offreValid = value.length > 0;
                break;
            case 'place':
                placeValid = value.length > 0;
                break;
            default:
                break;
        }
        this.setState({
            titleValid: titleValid,
            problemeValid: problemeValid,
            cibleValid: cibleValid,
            serviceImageValid: serviceImageValid,
            categoryValid: categoryValid,
            offreValid: offreValid,
            placeValid: placeValid,
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({
            formValid:
                this.state.titleValid &&
                this.state.problemeValid &&
                this.state.cibleValid &&
                this.state.categoryValid &&
                this.state.serviceImageValid &&
                this.state.offreValid &&
                this.state.placeValid
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            const formData = new FormData();
            const { title, probleme, cible, category, images, serviceVideo, offre, duration, place, youtubeVideoLink } = this.state;
            formData.append('title', title);
            formData.append('category', category);
            formData.append('cible', cible);
            formData.append('problem', probleme);
            formData.append('youtubeVideoLink', youtubeVideoLink);
            formData.append('offre', offre);
            formData.append('duration', duration);
            formData.append('place', place);
            formData.append('user', JSON.stringify(this.props.user));
            Array.from(images).forEach(file => {
                formData.append('images', file);
            });
            if (serviceVideo !== "") {
                formData.append('serviceVideo', serviceVideo);
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            // Add the service
            this.setState({ loading: true });
            try {
                axios.post('/api/service/new', formData, config)
                    .then(res => {
                        this.setState({
                            loading: false,
                            error: '',
                            title: '',
                            cible: '',
                            category: '',
                            probleme: '',
                            serviceVideo: '',
                            offre:'',
                            duration: '',
                            place: ''
                        });
                        // For admin when he creates service
                        if (this.props.refreshServiceList) {
                            this.props.refreshServiceList();
                        }
                        this.props.closeModal();
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({ error: "Une érreur s'est produite. Veuillez reéssayer.", loading: false });
                    })
            } catch (error) {
                this.setState({ error: "Erreur de connexion. Veuillez reéssayer", loading: false });
            }
        } else {
            this.setState({ error: "Veuillez remplir tous les champs", isTyping: true });
        }
    }

    // preview image
    preview = (e) => {
        let images = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        this.setState({ previewImages: images, images: e.target.files, serviceImageValid: true });
    }

    setFile = (name, file) => {
        this.setState({
            [name]: file,
            error: ''
        }, this.validateForm);
    }

    componentWillMount() {
        //Charge categories on form
        this.initCategories();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.service !== this.props.service) {
            const { isEditing, loadingAn, service } = this.props;
            if (isEditing && !loadingAn) {
                let images = service.images.map(image => rootUrl + '/' + image);
                this.setState({
                    title: service.title,
                    category: service.category,
                    cible: service.target,
                    offre: service.offre,
                    place: service.place,
                    probleme: service.problem,
                    serviceVideo: service.video.length ? rootUrl + "/" + service.video : null,
                    previewImages: images,
                    duration: service.duration,
                    validated: service.validated,
                    youtubeVideoLink: service.youtubeVideoLink
                })
            }
        }
    }

    // Fetch categories on the server and update if there is a new one
    fetchCategories = () => {
        let categories = JSON.parse(localStorage.getItem("categories"));
        axios.get("/api/category/all")
        .then(res => {
            if(JSON.stringify(categories) !== JSON.stringify(res.data.categories)) {
                this.setState({ categories: res.data.categories })
            }
        })
        .catch(err => {
            this.setState({ error: "Erreur de chargement des catégories. Veuillez reéssayer." })
        })
    }

    initCategories = () => {
        let categories = JSON.parse(localStorage.getItem("categories"));
        if (categories && categories.length) {
            this.setState({ categories: categories });
            // Verify is there is a new category
            this.fetchCategories();
        } else {
            try {
                this.fetchCategories();
            } catch (error) {
                this.setState({ error: "Erreur de chargement des catégories. Veuillez reéssayer." })
            }
        }
    }

    updateService = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const { images } = this.state;
        if (images) {
            Array.from(images).forEach(file => {
                formData.append('images', file);
            });
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            this.setState({ loading: true });
            try {
                axios.patch('/api/service/' + this.props.service._id, formData, config)
                    .then(res => {
                        this.setState({ 
                            loading: false,
                         });
                        this.props.closeModal();
                    })
                    .catch(err => {
                        this.setState({ error: "Veuillez faire une modification avant d'enregistrer", loading: false });
                    })
            } catch (error) {
                this.setState({ error: "Erreur de connexion. Veuillez reéssayer", loading: false });
            }
        } else {
            alert("Aucune modification éffectuée")
        }
    }

    validateservice = (service) => {
        this.setState({ validating: true, service: service })
        axios.patch('/api/service/validate/' + service._id)
            .then(res => {
                let services = this.props.services.map(service => {
                    let newservice = { ...service };
                    if (service._id === this.props.service._id) {
                        newservice.validated = true;
                    }
                    return newservice;
                })
                this.props.refreshList(services, "services");
                this.props.closeModal();
                this.setState({
                    validating: false,
                    'error': ''
                })
                // Send a notification
                const not = {
                    to: "all",
                    title: service.title,
                    image: rootUrl + '/' + service.image,
                    link: '/annonce/service/' + service._id,
                    name: "Le Fournisseur",
                    visited: false,
                    projectId: service._id,
                    date: new Date()
                }
                axios.patch('/api/user/recommand/to/all', { rec: not })
                    .then(res => {
                        const socket = socketIOClient(rootUrl);
                        socket.emit("new anounce notification", not);
                    })
                    .catch(err => {
                        this.setState({ recError: 'Une érreur s\'est produite. Veuillez recharger la page.' })
                    })
                // Send Email to Supplier 
            })
            .catch(err => {
                this.setState({
                    validating: false,
                    'error': 'Erreur survenue, veuillez actualiser'
                })
            })
    }

    deleteservice = (service) => {
        this.setState({ deleting: true, service: service })
        axios.delete('/api/service/' + service._id)
            .then(res => {
                let services = this.props.services.filter(service => {
                    return JSON.stringify(service) !== JSON.stringify(this.props.service)
                })
                this.props.refreshList(services, "services");
                this.props.closeModal();
                this.setState({
                    deleting: false,
                    'error': ''
                })
            })
            .catch(err => {
                this.setState({
                    deleting: false,
                    error: err
                })
            })
    }

    render() {
        const { serviceVideo, title, probleme, cible, problemeValid, youtubeVideoLink,
            category, serviceImageValid, titleValid, cibleValid, categoryValid, offre, place, placeValid,
            error, loading, isTyping, categories, validating, deleting, duration, offreValid } = this.state;
        const { show, closeModal, loadingAn, isEditing, service } = this.props;
        return (
            <Modal show={show} onHide={() => closeModal()} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouveau Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    {
                                        loadingAn ? <div className="d-flex justify-content-center"><Loader /></div> :
                                            <Fragment>
                                                {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                                                <div className="form-group">
                                                    <label for="name">Nom du Service</label>
                                                    <input disabled={isEditing} type="text" className={isTyping && !titleValid ? "form-control is-invalid" : "form-control"} value={title} onChange={(e) => this.handleInputChange(e)} name="title" placeholder="Nom du Service" required />
                                                    {isTyping && !titleValid ? <div className="invalid-feedback">Invalide</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="category">Catégorie</label>
                                                    <select disabled={isEditing} id="category" name="category" value={category} onChange={(e) => this.handleInputChange(e)} className={isTyping && !categoryValid ? "form-control is-invalid" : "form-control"} >
                                                        <option>Choisir...</option>
                                                        {
                                                            categories && categories.length ?
                                                                categories.map(category => (
                                                                    <option key={category._id}>{category.name}</option>
                                                                )) : <option>Loading...</option>
                                                        }
                                                    </select>
                                                    {isTyping && !categoryValid ? <div className="invalid-feedback">Sélectionnez une catégorie</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="name">Problème</label>
                                                    <textarea disabled={isEditing} type="text" value={probleme} className={isTyping && !problemeValid ? "form-control is-invalid" : "form-control"} onChange={(e) => this.handleInputChange(e)} name="probleme" rows={3} placeholder="Problème"></textarea>
                                                    {isTyping && !problemeValid ? <div className="invalid-feedback">Invalide</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="name">Offre</label>
                                                    <textarea disabled={isEditing} type="text" value={offre} className={isTyping && !offreValid ? "form-control is-invalid" : "form-control"} onChange={(e) => this.handleInputChange(e)} name="offre" rows={3} placeholder="Offre"></textarea>
                                                    {isTyping && !offreValid ? <div className="invalid-feedback">Invalide</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="name">Cible</label>
                                                    <input disabled={isEditing} type="text" value={cible} onChange={(e) => this.handleInputChange(e)} className={isTyping && !cibleValid ? "form-control is-invalid" : "form-control"} name="cible" placeholder="Cible" required />
                                                    {isTyping && !cibleValid ? <div className="invalid-feedback">Invalide</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="name">Lieux&Adresse</label>
                                                    <input disabled={isEditing} type="text" value={place} onChange={(e) => this.handleInputChange(e)} className={isTyping && !placeValid ? "form-control is-invalid" : "form-control"} name="place" placeholder="Lieu & Adresse" required />
                                                    {isTyping && !placeValid ? <div className="invalid-feedback">Invalide</div> : null}
                                                </div>
                                                <div className="form-group">
                                                    <label for="name">Durée du service/ Dates d'ouverture</label>
                                                    <input disabled={isEditing} type="text" value={duration} onChange={(e) => this.handleInputChange(e)} className= "form-control" name="duration" placeholder="Exple: 2 Mois" required />
                                                </div>
                                                <div className="row align-items-start py-3">
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <label for="name">Importer des images</label><br />
                                                        <div className="custom-file">
                                                            <input disabled={this.state.validated} onChange={(e) => this.preview(e)} type="file" className="custom-file-input" accept="image/*" id="customFile" multiple />
                                                            <label className="custom-file-label" for="customFile">Choisir les images</label>
                                                        </div>
                                                        {isTyping && !serviceImageValid ? <p className="alert alert-danger">Image Requise</p> : null}
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
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <label for="name">Importer une vidéo</label><br />
                                                        <Upload isEditing={isEditing} type="video" oldUrl={serviceVideo} setFile={(name, file) => this.setFile(name, file)} name="serviceVideo" label={"Importer depuis votre ordinateur"} />
                                                        <span>Ou bien insérez le lien youtube.</span>
                                                        <input type="text" disabled={isEditing} value={youtubeVideoLink} onChange={(e) => this.handleInputChange(e)} className="form-control" name="youtubeVideoLink" placeholder="Lien youtube" />
                                                        {
                                                            youtubeVideoLink&&youtubeVideoLink.length ?
                                                                <iframe width="100%" title="video"
                                                                    src={youtubeVideoLink}>
                                                                </iframe> : null
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                !isEditing ?
                                                    <div className="d-flex justify-content-end">
                                                        <button disabled={loading} type="submit" onClick={(e) => this.handleSubmit(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "Ajouter l'Evenement"}</button>
                                                    </div> :
                                                    !this.state.validated ?
                                                        <div className="d-flex justify-content-end">
                                                            <button disabled={loading} type="submit" onClick={(e) => this.updateService(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "Enregistrer la modification"}</button>
                                                        </div> : null
                                                }
                                            </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        isEditing ?
                            <Fragment>
                                {!this.state.validated ? <Button disabled={validating} variant="dark" className="mr-3" onClick={() => this.validateservice(service)}>{validating ? <Loader color="white" /> : "Valider le service"}</Button> : null}
                                <Button variant="danger" disabled={deleting} className="mr-3" onClick={() => this.deleteservice(service)}>{deleting ? <Loader color="white" /> : "Supprimer"}</Button>
                            </Fragment> : null
                    }
                    <Button variant="default" onClick={() => closeModal()}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ServiceModal;