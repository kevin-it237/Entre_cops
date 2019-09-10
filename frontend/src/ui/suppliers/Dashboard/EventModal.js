import React, {Component, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import Upload from '../../components/Forms/Upload';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../../globalComponent/Loader';
import {rootUrl} from '../../../configs/config';
import './EventForm.scss';

class EventModal extends Component {
    state = {
        title: '',
        category: '',
        place: '',
        description: '',
        date: new Date(),
        eventVideo: '',
        eventImage: '',
        otherInfos: '',
        isTyping: false,
        formValid: false,
        titleValid: false,
        categoryValid: false,
        placeValid: false,
        descriptionValid: false,
        imageValid: false,
        loading: false,
        error: '',
        categories: [],
        validated: false,
        validating: false,
        deleting: false
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, error: '' },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let { titleValid, descriptionValid, placeValid, imageValid, categoryValid } = this.state;

        switch (fieldName) {
            case 'title':
                titleValid = value.length > 0;
                break;
            case 'description':
                descriptionValid = value.length > 0;
                break;
            case 'place':
                placeValid = value.length > 0;
                break;
            case 'eventImage':
                imageValid = value.length > 0;
                break;
            case 'category':
                categoryValid = value.length > 0;
                break;
            default:
                break;
        }
        this.setState({
            titleValid: titleValid,
            descriptionValid: descriptionValid,
            placeValid: placeValid,
            imageValid: imageValid,
            categoryValid: categoryValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({
            formValid:
                this.state.titleValid &&
                this.state.placeValid &&
                this.state.descriptionValid &&
                this.state.imageValid &&
                this.state.categoryValid
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            const formData = new FormData();
            const { title, description, place, category, eventImage, eventVideo, otherInfos, date } = this.state;
            formData.append('title', title);
            formData.append('category', category);
            formData.append('place', place);
            formData.append('description', description);
            formData.append('eventImage', eventImage);
            formData.append('eventVideo', eventVideo);
            formData.append('otherInfos', otherInfos);
            formData.append('date', date);
            formData.append('user', JSON.stringify(this.props.user));
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            // Add the service
            this.setState({ loading: true });
            try {
                axios.post('/api/event/new', formData, config)
                    .then(res => {
                        this.setState({ 
                            loading: false, 
                            error: '',
                            title: '',
                            place: '',
                            category: '',
                            otherInfos: '',
                            description: '',
                            eventImage: '',
                            eventVideo: ''
                         });
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

    setFile = (name, file) => {
        this.setState({
            [name]: file,
            imageValid: true,
            error: ''
        }, this.validateForm);
    }

    pickDate = (date) => {
        this.setState({ date: date })
    }

    componentWillMount() {
        //Charge categories on form
        this.getCategories();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.event !== this.props.event) {
            const { isEditing, loadingEv, event } = this.props;
            if (isEditing && !loadingEv) {
                this.setState({
                    title: event.title,
                    category: event.category,
                    place: event.place,
                    description: event.description,
                    date: new Date(event.date),
                    eventVideo: event.video ? event.video : null,
                    eventImage: rootUrl+"/"+event.image,
                    otherInfos: event.otherInfos ? event.otherInfos : null,
                    validated: event.validated
                })
            }
        }
    }

    getCategories = () => {
        let categories = JSON.parse(localStorage.getItem("categories"));
        if (categories && categories.length) {
            this.setState({ categories: categories });
        } else {
            try {
                axios.get("/api/category/all")
                    .then(res => {
                        this.setState({ categories: res.data.categories })
                    })
                    .catch(err => {
                        this.setState({ error: "Erreur de chargement des catégories. Veuillez reéssayer." })
                    })
            } catch (error) {
                this.setState({ error: "Erreur de chargement des catégories. Veuillez reéssayer." })
            }
        }
    }

    validateEvent = (event) => {
        this.setState({ validating: true, event: event })
        axios.patch('/api/event/validate/' + event._id)
            .then(res => {
                let events = this.props.events.map(event => {
                    let newEvent = { ...event };
                    if (event._id === this.props.event._id) {
                        newEvent.validated = true;
                    }
                    return newEvent;
                })
                this.props.refreshList(events, "events");
                this.props.closeModal();
                this.setState({
                    validating: false,
                    'error': ''
                })
                // Send Email to Supplier with link to set his password
            })
            .catch(err => {
                this.setState({
                    validating: false,
                    'error': 'Erreur survenue, veuillez actualiser'
                })
            })
    }

    deleteEvent = (event) => {
        this.setState({ deleting: true, event: event })
        axios.delete('/api/event/' + event._id)
            .then(res => {
                let events = this.props.events.filter(event => {
                    return JSON.stringify(event) !== JSON.stringify(this.props.event)
                })
                this.props.refreshList(events, "events");
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
        const { eventImage, eventVideo, title, description, place, otherInfos, date,
            category, imageValid, titleValid, descriptionValid, placeValid, categoryValid,
            error, loading, isTyping, categories, validating, deleting } = this.state;
        const { show, closeModal, loadingEv, isEditing, event} = this.props;
        return (
            <Modal show={show} onHide={() => closeModal()} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouvel Evènement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    {
                                        loadingEv ? <div className="d-flex justify-content-center"><Loader /></div> :
                                        <Fragment>
                                          {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                                            <div className="form-group">
                                                <label for="name">Titre</label>
                                                    <input disabled={isEditing} type="text" className={isTyping && !titleValid ? "form-control is-invalid" : "form-control"} value={title} onChange={(e) => this.handleInputChange(e)} name="title" placeholder="Titre de l'évènement" required />
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
                                                <label for="name">Description</label>
                                                    <textarea disabled={isEditing} type="text" value={description} className={isTyping && !descriptionValid ? "form-control is-invalid" : "form-control"} onChange={(e) => this.handleInputChange(e)} name="description" rows={3} placeholder="Resumé"></textarea>
                                                {isTyping && !descriptionValid ? <div className="invalid-feedback">Invalide</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label for="name">Lieu</label>
                                                    <input disabled={isEditing} type="text" value={place} onChange={(e) => this.handleInputChange(e)} className={isTyping && !placeValid ? "form-control is-invalid" : "form-control"} name="place" placeholder="Lieu de l'évènement" required />
                                                {isTyping && !placeValid ? <div className="invalid-feedback">Invalide</div> : null}
                                            </div>
                                            <div className="row align-items-start py-3">
                                                <div className="col-sm-12 col-md-4 col-lg-4">
                                                    <div className="form-group">
                                                        <label for="name">Date et Heure de l'évènement</label><br />
                                                            <DatePicker disabled={isEditing} showTimeSelect dateFormat="Pp" className="form-control" selected={date} onChange={date => this.pickDate(date)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-4 col-lg-4">
                                                    <Upload type="image" oldUrl={eventImage} setFile={(name, file) => this.setFile(name, file)} name="eventImage" label={"Importer une image"} />
                                                    {isTyping && !imageValid ? <p className="alert alert-danger">Image Requise</p> : null}
                                                </div>
                                                <div className="col-sm-12 col-md-4 col-lg-4">
                                                    <Upload type="video" oldUrl={eventVideo} setFile={(name, file) => this.setFile(name, file)} name="eventVideo" label={"Importer une video"} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="name">Autres informations</label>
                                                <textarea disabled={isEditing} type="text" className="form-control" value={otherInfos} onChange={(e) => this.handleInputChange(e)} name="otherInfos" rows={3} placeholder="Autres informations"></textarea>
                                            </div>
                                            {
                                                !isEditing ? 
                                                <div className="d-flex justify-content-end">
                                                    <button disabled={loading} type="submit" onClick={(e) => this.handleSubmit(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "Ajouter l'Evenement"}</button>
                                                </div>:
                                                    !this.state.validated ?
                                                    <div className="d-flex justify-content-end">
                                                        <button disabled={loading} type="submit" onClick={(e) => this.handleSubmit(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "Enregistrer la modification"}</button>
                                                    </div>:null
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
                            {!this.state.validated ? <Button disabled={validating} variant="dark" className="mr-3" onClick={() => this.validateEvent(event)}>{validating ? <Loader color="white" /> : "Valider le service"}</Button>: null}
                            <Button variant="danger" disabled={deleting} className="mr-3" onClick={() => this.deleteEvent(event)}>{deleting ? <Loader color="white" /> : "Supprimer"}</Button>
                        </Fragment>:null
                    }
                    <Button variant="default" onClick={() => closeModal()}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EventModal;