import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import './Categories.scss';
import { faAllergies, faAd, faAddressBook, faAdjust, faAirFreshener, faAnchor } from '@fortawesome/free-solid-svg-icons';

class Categories extends Component {
    state = {
        selected: false
    }
    render() {
        
        return (
            <section className="categories">
                <div className="container pb-4">
                    <div className="row py-5">
                        <div className="col">
                            <center><h1 className="pt-4 service-header">Parcourir par catégorie</h1></center>
                        </div>
                    </div>
                    <div className="row pb-5 justify-content-around">
                            <CategoryItem categoryName={"Concert de Musique"} icon={faAllergies} />
                            <CategoryItem categoryName={"Cours d'informatique"} icon={faAd} />
                            <CategoryItem categoryName={"Snack / Bar"} icon={faAddressBook} />
                            <CategoryItem categoryName={"Restaurant"} icon={faAdjust} />
                            <CategoryItem categoryName={"Foire / Divertissement"} icon={faAirFreshener} />
                            <CategoryItem categoryName={"Film / Cinéma"} icon={faAnchor} />
                    </div>
                </div>
            </section>
        );
    }
}

export default Categories;