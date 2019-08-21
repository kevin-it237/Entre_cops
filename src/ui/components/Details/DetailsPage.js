import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../globalComponent/Footer';
import { faStar, faClock, faCalendar, faMapMarked, faPaperPlane, 
    faSearch, faComment, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './DetailsPage.scss';

import Header from '../../globalComponent/Header';
import Hoc from '../../globalComponent/Hoc';
import ReviewItem from '../Reviews/ReviewItem';
import SearchResultItem from '../UserSearchResult/UserSearchResult';

import img from '../../../assets/images/bg.jpg';

class DetailsPage extends Component {
    state = {
        showReservationModal: false,
        showRecModal: false,
        showCouponModal: false,
        couponGenerated: false,
        showVideo: false,
        showToast: false
    }

    displayToast = () => {
        this.setState({showToast: true});
        setTimeout(() => {
            this.setState({showToast: false});
        }, 2000)
    }

    render() {
        return (
            <Hoc>
                <Header />
                <section className="project-details">
                    <div className="container" id="projectdetails">
                        <div className="row pb-5 pt-3">
                            <div className="col-sm-12 col-md-8 col-lg-8 left">
                                <div className="infos pb-4">
                                    <img src={img} alt="service" />

                                    <div className="otherinfos">
                                        <h2>Nom du service</h2>
                                        <h5 className="py-2">Catégorie</h5>
                                        <hr/>
                                    </div>

                                    <div className="otherinfos">
                                        <div className="d-flex flex-column">
                                            <h3>Description</h3>
                                            <p>I hate loosing my music when I can’t pay and this just so happened to 
                                            come up worked with no issues to come up worked with no issues</p>
                                        </div>
                                    </div>
                                    <div className="otherinfos">
                                        <div className="d-flex flex-column">
                                            <h3>Offre</h3>
                                            <p>I hate loosing my music when I can’t pay and this just so happened to 
                                            come up worked with no issues to come up worked with no issues</p>
                                        </div>
                                        <hr/>
                                    </div>

                                    <div className="moreinfos d-flex justify-content-between mb-3">
                                        <div className="headers d-flex align-items-center py-4">
                                            <FontAwesomeIcon icon={faComment} size={"2x"} />
                                            <h3 className="ml-3 mb-0">Reviews des clients</h3>
                                        </div>
                                        <div className="stars">
                                            <FontAwesomeIcon icon={faStar} size={"2x"} />
                                            <FontAwesomeIcon icon={faStar} size={"2x"} />
                                            <FontAwesomeIcon icon={faStar} size={"2x"} />
                                            <FontAwesomeIcon icon={faStar} size={"2x"} />
                                            <FontAwesomeIcon icon={faStar} size={"2x"} />
                                            <span className="votes">(100 votes)</span>
                                        </div>
                                    </div>
                                    <div className="moreinfos">
                                        <div className="content">
                                            <ReviewItem />
                                            <ReviewItem />
                                        </div>
                                    </div>
                                    <div className="form-content mb-5">
                                        <form className="input__form">
                                            <div className="form-group">
                                                <textarea placeholder="Entrer un commentaire" className="form-control" onChange={(e) => this.setState({message: e.target.value})} id="textmessage" rows="2"></textarea>
                                            </div>
                                            <button className="btn btn-danger send-btn" type="submit">Send <FontAwesomeIcon icon={faPaperPlane} size={"1x"} /></button>
                                        </form>
                                    </div>
                                </div>
                            
                            </div>

                            <div className="col-sm-12 col-md-4 col-lg-4 right">
                                <div className="stiky">
                                    <div className="infos">
                                        <div className="d-flex py-2">
                                            <FontAwesomeIcon icon={faCalendar} size={"2x"} />
                                            <h2>Date: 12 Juin</h2>
                                        </div>
                                        <hr />
                                        <div className="d-flex py-2">
                                            <FontAwesomeIcon icon={faClock} size={"2x"} />
                                            <h2>Heure: 12h</h2>
                                        </div>
                                        <hr />
                                        <div className="d-flex py-2">
                                            <FontAwesomeIcon icon={faMapMarked} size={"2x"} />
                                            <h2>Lieu: Yaounde</h2>
                                        </div>
                                        <hr />
                                        <button className="button mt-3 book" 
                                            onClick={() => this.setState({showReservationModal: !this.state.showRecModal})}>Reserver</button>
                                        <button className="button mt-3 reccommand" 
                                            onClick={() => this.setState({showRecModal: !this.state.showRecModal})}>Recommander</button>
                                    </div>

                                    <div className="other-infos mt-4">
                                        <div className="d-flex flex-column py-2">
                                            <h3>Coupon de réductions de 10% pour cet évènement.</h3><br/>
                                            <button className="button mt-2 book" onClick={() => this.setState({showCouponModal: true})}>Télécharger le Coupon</button>
                                        </div>
                                    </div>
                                    <div className="other-infos mt-4">
                                        <div className="d-flex flex-column">
                                            <h3 className="mb-3">Regardez l'aperçu en video</h3>
                                            <video width="100%" height="100%" controls onClick={() => this.setState({showVideo: true})}>
                                                <source src="movie.mp4" type="video/mp4"></source>
                                                <source src="movie.ogg" type="video/ogg"></source>
                                            </video>
                                        </div>
                                    </div>
                                    <div className="other-infos mt-4">
                                        <div className="d-flex flex-column">
                                            <h3>Autres informations</h3>
                                            <p>I hate loosing my music when I can’t pay and this just so happened to 
                                            come up worked with no issues to come up worked with no issues</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />

                {/* Reservation */}
                <Modal show={this.state.showReservationModal} onHide={() => this.setState({showReservationModal: !this.state.showReservationModal})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Faites votre réservation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    <div class="form-group">
                                        <label for="name">Nom complet</label>
                                        <input type="text" class="form-control" name="nom" id="name" placeholder="Nom complet"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" class="form-control" name="email" id="email" placeholder="Adresse Email"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="tel">Numero de Téléphone</label>
                                        <input type="tel" class="form-control" name="tel" id="tel" pattern="[0-9]{9}" placeholder="Numero de Téléphone"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="places">Nombre de places</label>
                                        <input type="number" class="form-control" name="numplaces" id="places" placeholder="Nombre de places"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="danger" onClick={() => this.setState({showReservationModal: !this.state.showReservationModal})}>
                                Valider la Reservation
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>

                {/* Recommandation */}
                <Modal show={this.state.showRecModal} onHide={() => this.setState({showRecModal: !this.state.showRecModal})} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Faire des recommandations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3">
                                    <div className="d-flex flex-row search align-items-center">
                                        <input type="text" className="form-control searchInput" name="search" placeholder="Rechercher un membre"/>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </div>
                                    {/* Results */}
                                    <div className="results py-5">
                                        <SearchResultItem/>
                                        <SearchResultItem/>
                                        <SearchResultItem/>
                                        <SearchResultItem/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.showToast ? <h4 className="mr-3">Lien de partage Copié !!!</h4> : null}
                        <Button variant="outline-dark" onClick={this.displayToast}>
                            Copier le lien de partage
                        </Button>
                        <Button variant="default" onClick={() => this.setState({showRecModal: !this.state.showRecModal})}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Coupon */}
                <Modal show={this.state.showCouponModal} onHide={() => this.setState({showCouponModal: false})} >
                    <Modal.Header closeButton>
                    <Modal.Title>Coupon de réduction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-sm-12 pl-4 pr-4 mt-4 mb-3 text-center">
                                    {
                                        this.state.couponGenerated ?
                                        <button className="btn btn-dark download-btn">Télécharger <FontAwesomeIcon icon={faFileDownload} size={"1x"} /></button>:
                                        <button className="button" onClick={() => this.setState({couponGenerated: true})}>Générer le Coupon</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="default" onClick={() => this.setState({showCouponModal: false})}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>

                {/* Video */}
                <Modal show={this.state.showVideo} onHide={() => this.setState({showVideo: false})} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <video width="100%" height="100%" controls>
                            <source src="movie.mp4" type="video/mp4"></source>
                            <source src="movie.ogg" type="video/ogg"></source>
                        </video>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="default" onClick={() => this.setState({showVideo: false})}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Hoc>
        );
    }
}

export default DetailsPage;