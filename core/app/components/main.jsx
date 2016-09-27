import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from './header';
import ProfileInfo from './profileInformation';
import Measure from 'react-measure';
import Carousel from './carousel';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

import { browserHistory } from 'react-router';

import { getData, setProjectDimensions, setModalContent } from "../actions/index";

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            modalContent: {},
            width: '90%',
            projectDimensions: {}
        };
        this.close = this.close.bind(this);
    }

    close() {
        this.props.setModalContent(false, {});
    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({
            modalContent: props.modalContent,
            data: props.data
        });
    }

    componentWillMount() {
        this.props.getData('/getProjects');
    }

    checkForDataAndRender() {
        if (this.state.data && this.state.data.length > 0) {
            return (
                <Measure onMeasure={(dimensions) => {this.props.setProjectDimensions(dimensions);}}>
                    <div className="carouselContainer">
                        {this.renderProjects()}
                    </div>
                </Measure>
            );
        } else {
            return (
                <div className="carouselContainer">
                    No projects to display
                </div>
            );
        }
    }

    renderModalMedia() {
        if (this.state.modalContent.hasOwnProperty('content')) {
            return (
                <div>
                    <img className="modalMedia" src={this.state.modalContent.content.mediaUrl} alt=""/>
                </div>
            );
        }
    }

    renderModalMediaDescription() {
        if (this.state.modalContent.hasOwnProperty('content')) {
            return (
                <div>
                    {this.state.modalContent.content.mediaDescription}
                </div>
            );
        }
    }

    renderModalTitle() {
        if (this.state.modalContent.hasOwnProperty('content')) {
            return (
                <div>
                    {this.state.modalContent.content.mediaTitle}
                </div>
            );
        } else {
            return (
                <div>
                    Project Media
                </div>
            );
        }
    }

    renderProjects() {
        let dataLength = this.state.data.length - 1;
        return this.state.data.map(function (project, index) {
            return (
                <Carousel key={index} data={project} dataLength={dataLength} index={index}/>
            );
        });
    }

    render() {
        return(
            <div>
                <div className="headerContainerHolder">
                    <div className="headerContainer" style={{width: this.state.width}}>
                        <Header />
                    </div>
                </div>
                <div className="mainContainerHolder">
                    <div className="mainContainer" style={{width: this.state.width}}>
                        <Modal show={this.state.modalContent.showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {this.renderModalTitle()}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.renderModalMedia()}
                                {this.renderModalMediaDescription()}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="profileInfo">
                            <ProfileInfo />
                        </div>

                        {this.checkForDataAndRender()}

                    </div>
                </div>
            </div>
        );
        /*if (this.state.data && this.state.data.length > 0) {

        } else {
            return (
                <div>
                    Nothing here
                </div>
            );
        }*/
    }
}

MainView.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        data: state.data,
        modalContent: state.modalContent
    };
}

export default connect(mapStateToProps, { getData, setProjectDimensions, setModalContent })(MainView);
