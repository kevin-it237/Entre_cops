import React, { Component, Fragment } from 'react';
import './Gallery.scss';
import GalleryItem from './GalleryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';

class GalleryList extends Component {

    state = {
        publications: [],
        error: '',
        query: '',
        loading: true,
        haveSearched: false
    };

    componentDidMount() {
        axios.get('/api/gallery/all')
        .then(res => {
            this.setState({ loading: false, publications: res.data.publications })
        })
        .catch(err => {
            this.setState({ loading: false })
        })
    }

    filter = () => {
        this.setState({loading: true})
        axios.get('/api/gallery/'+ this.state.query +'/filter')
        .then(res => {
            this.setState({ loading: false, publications: res.data.publications, haveSearched: true })
        })
        .catch(err => {
            this.setState({ loading: false, haveSearched: true })
        })
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.filter()
        }
    }

    render() {
        return (
            <Fragment>
                <section className="publications-section-banner">
                    <div className="container">
                        <div className="row my-5">
                            <div className="col-12 text-center">
                                <h2>Galerie</h2>
                                <div className="form-group search mt-4">
                                    <input onKeyPress={this.keyPressed} onChange={(e) => this.setState({query: e.target.value})} className="form-control form-control-lg" type="text" name="query" value={this.state.query} placeholder="Rechercher dans la galerie" />
                                    <FontAwesomeIcon onClick={this.filter} icon={faSearch} size="2x" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="publications-section">
                    <div className="container">
                        {this.state.haveSearched &&<a href="/gallery" class="btn btn-danger">Rentrer sur la galerie</a>}
                        {
                        this.state.loading ? <div className="d-flex justify-content-center"><Loader /></div> :
                            this.state.publications.map((pub, id) => (
                                <div className="row pt-5 gallery-row pb-5">
                                    <div className="col-sm-12 mt-4 mb-3">
                                        <GalleryItem key={id} content={pub.content} images={pub.images} date={pub.date} />
                                    </div>
                                </div>
                            ))
                        }
                        {this.state.publications.length === 0 ? <p className="text-center py-5">Aucun contenu trouvé.</p>:null}
                    </div>
                </section>
            </Fragment>
        );
    }
}


export default GalleryList;
