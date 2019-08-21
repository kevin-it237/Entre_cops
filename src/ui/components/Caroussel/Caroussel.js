import React from 'react';
import bg from '../../../assets/images/bg.jpg';
import bg1 from '../../../assets/images/image1.jpg';
import './Caroussel.scss';

const Caroussel = (props) => {
    return (
        <section id="showcase">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={bg1} alt="First slide"/>
                        <div class="container">
                            <div class="carousel-caption d-none d-sm-block text-bottom mb-5">
                                <h1 class="display-3">Heading 1</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <a href="#events" class="btn btn-danger btn-lg">Parcourir les Evènements</a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={bg} alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={bg} alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </section>
    );
}

export default Caroussel;