import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Upload from '../../components/Forms/Upload';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../../globalComponent/Loader';
import './Form.scss';

class EventForm extends Component {

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
            const { title, description, place, category, eventImage, eventVideo, otherInfos ,date } = this.state;
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
                        this.setState({ loading: false, error:'' });
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
        this.setState({date: date})
    }

    render() {
        const { eventImage, eventVideo, title, description, place, otherInfos, date,
                category, imageValid, titleValid, descriptionValid, placeValid, categoryValid,
                error, loading, isTyping } = this.state;
        return (
            <Fragment>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                {error && error.length ? <div className="alert alert-danger" style={{ fontSize: "1.3rem" }}>{error}</div> : null}
                                <div className="form-group">
                                    <label for="name">Titre</label>
                                    <input type="text" className={isTyping && !titleValid ? "form-control is-invalid" : "form-control"} value={title} onChange={(e) => this.handleInputChange(e)} name="title" placeholder="Titre de l'évènement" required />
                                    {isTyping && !titleValid ? <div className="invalid-feedback">Invalide</div> : null}
                                </div>
                                <div className="form-group">
                                    <label for="category">Catégorie</label>
                                    <select id="category" name="category" value={category} onChange={(e) => this.handleInputChange(e)} className={isTyping && !categoryValid ? "form-control is-invalid" : "form-control"} >
                                        <option>Catégorie 1</option>
                                        <option>Catégorie 2</option>
                                    </select>
                                    {isTyping && !categoryValid ? <div className="invalid-feedback">Sélectionnez une catégorie</div> : null}
                                </div>
                                <div className="form-group">
                                    <label for="name">Description</label>
                                    <textarea type="text" value={description} className={isTyping && !descriptionValid ? "form-control is-invalid" : "form-control"} onChange={(e) => this.handleInputChange(e)} name="description" rows={3} placeholder="Resumé"></textarea>
                                    {isTyping && !descriptionValid ? <div className="invalid-feedback">Sélectionnez une catégorie</div> : null}
                                </div>
                                <div className="form-group">
                                    <label for="name">Lieu</label>
                                    <input type="text" value={place} onChange={(e) => this.handleInputChange(e)} className={isTyping && !placeValid ? "form-control is-invalid" : "form-control"} name="place" placeholder="Lieu de l'évènement" required />
                                    {isTyping && !placeValid ? <div className="invalid-feedback">Invalide</div> : null}
                                </div>
                                <div className="row align-items-start py-3">
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <div className="form-group">
                                            <label for="name">Date et Heure de l'évènement</label><br />
                                            <DatePicker showTimeSelect dateFormat="Pp" className="form-control" selected={date} onChange={date => this.pickDate(date)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <Upload type="image" oldUrl={eventImage} setFile={(name, file) => this.setFile(name, file)} name="eventImage" label={"Importer une image"} />
                                        {isTyping && !imageValid ? <p className="alert alert-danger">Image Requise</p>:null }
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <Upload type="video" oldUrl={eventVideo} setFile={(name, file) => this.setFile(name, file)} name="eventVideo" label={"Importer une video"} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="name">Autres informations</label>
                                    <textarea type="text" className="form-control" value={otherInfos} onChange={(e) => this.handleInputChange(e)} name="otherInfos" rows={3} placeholder="Autres informations"></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button disabled={loading} type="submit" onClick={(e) => this.handleSubmit(e)} className="button fourth mt-4 mb-5">{loading ? <Loader color="white" /> : "Ajouter l'Evenement"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default EventForm;