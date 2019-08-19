import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Categories.scss';

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

class Categories extends Component {
    state = {
        selected: false
    }
    render() {
        let menu = [
            (<div className="col">
                <CategoryItem icon={"check-square"} />
            </div>),
           ( <div className="col">
                <CategoryItem icon={"check-square"} />
            </div>),
            (<div className="col">
                <CategoryItem icon={"check-square"} />
            </div>),
            (<div className="col">
                <CategoryItem icon={"check-square"} />
            </div>),
            (<div className="col">
                <CategoryItem icon={"check-square"} />
            </div>),
            (<div className="col">
                <CategoryItem icon={"check-square"} />
            </div>)
        ]
        return (
            <section className="categories">
                <div className="container pb-4">
                    <div className="row py-5">
                        <div className="col">
                            <center><h1 className="pt-4 service-header">Parcourir par catégorie</h1></center>
                        </div>
                    </div>
                    <div className="row pb-5 justify-content-center">
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={this.state.selected}
                        onSelect={this.onSelect}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default Categories;