import React, { Component } from 'react';
import './Gallery.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Upload from '../../components/Forms/Upload';


class UpdloadImage extends Component {

    state = {
        userMessage: '',
        error: '',
        loading: false,
        showModal: false,
        images: null
    };

    componentDidMount() {

    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, this.validate);
    }
    
    setFile(name, file) {
        this.setState({
            [name]: file,
            error: ''
        });
    }

    render() {
        return (
            <section className="updload-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="upload d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} size={"5x"} />
                                <textarea placeholder="Exprimez vous" 
                                    value={this.state.userMessage} name="userMessage" 
                                    className="form-control" onChange={(e) => this.handleInputChange(e)} rows="2"></textarea>
                                <button onClick={() => this.setState({showModal: true})} className="button">Importer &nbsp;<FontAwesomeIcon icon={faCamera} size={"1x"} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload modal */}
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>Importer des Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row text-center">
                            <div className="col-sm-12">
                                <Upload type="image" oldUrl={this.state.images} setFile={(name, file) => this.setFile(name, file)} name="images" label={"Importer des Images"} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="py-3">
                            <Button variant="danger" onClick={() => this.setState({ showModal: false })}>
                                Publier
                            </Button>
                            <Button variant="default" onClick={() => this.setState({ showModal: false })}>
                                Fermer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </section>
        );
    }
}


export default UpdloadImage;
