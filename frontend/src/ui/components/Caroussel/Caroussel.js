import React from 'react';
import bg1 from '../../../assets/images/photo.jpeg';
// import bg2 from '../../../assets/images/afterall05.png';
// import bg3 from '../../../assets/images/afterall06.png';
import './Caroussel.scss';

const Caroussel = (props) => {
    return (
        <section id="showcase">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> */}
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={bg1} alt="First slide"/>
                        <div className="container">
                            <div className="carousel-caption d-none d-sm-block text-bottom mb-5">
                                <h1 className="">SOYEZ A L'ACTU DE TOUS LES EVENEMENTS ET SERVICES</h1>
                                <p>Réservez directement vos places.</p>
                                <a href="#events" className="btn btn-danger btn-lg">Parcourir les Evènements</a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img className="d-block w-100" src={bg2} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={bg3} alt="Third slide"/>
                    </div> */}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </section>
    );
}

export default Caroussel;