import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import './Categories.scss';
import axios from 'axios';
import Loader from '../../globalComponent/Loader';
import { faAllergies, faAd, faAddressBook, faAdjust, faAirFreshener, faAnchor } from '@fortawesome/free-solid-svg-icons';

class Categories extends Component {
    state = {
        selected: false,
        categories: null,
        loading: true,
        error: null
    }

    componentDidMount() {
        //get the categories
        axios.get('/api/category/all')
        .then(res => {
            localStorage.setItem("categories", JSON.stringify(res.data.categories));
            this.setState({
                categories: res.data.categories,
                loading: false
            })
        })
        .catch(err => {
            this.setState({
                error: "Une erreur s'est produite"
            })
        })
    }
    render() {
        const { categories, loading } = this.state;
        let content = <Loader />;
        if(!loading) {
            content = categories.map(category => (
                <CategoryItem key={category._id} category={category} icon={faAirFreshener} />
            ));
        }
        return (
            <section className="categories">
                <div className="container pb-4">
                    <div className="row py-5">
                        <div className="col">
                            <center><h1 className="pt-4 service-header">Parcourir par catégorie</h1></center>
                        </div>
                    </div>
                    <div className="row pb-5 justify-content-around categories-wrapper">
                        {content}
                    </div>
                </div>
            </section>
        );
    }
}

export default Categories;