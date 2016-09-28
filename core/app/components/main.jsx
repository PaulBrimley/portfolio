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
            backgrounds: ['url("./assets/images/001.jpg")', 'url("./assets/images/002.jpg")', 'url("./assets/images/003.jpg")', 'url("./assets/images/004.jpg")', 'url("./assets/images/005.jpg")', 'url("./assets/images/006.jpg")'],
            background: 'url("./assets/images/001.jpg")',
            backgroundIndex: 0,
            counter: 0,
            modalContent: {},
            width: '90%',
            projectDimensions: {}
        };
        this.close = this.close.bind(this);
        this.setBackgroundState = this.setBackgroundState.bind(this);
    }

    close() {
        this.props.setModalContent(false, {});
    }

    componentWillReceiveProps(props) {
        this.setState({
            modalContent: props.modalContent,
            data: props.data
        });
    }

    componentWillMount() {
        this.forceUpdate();
        this.props.getData('/getProjects');
        this.renderBackground();
    }

    checkForDataAndRender() {
        if (this.state.data && this.state.data.length > 0) {
            return (
                <Measure onMeasure={(dimensions) => {this.props.setProjectDimensions(dimensions);}}>
                    <div className="carouselContainer">
                        <div className="carouselHeader">
                            Projects
                        </div>
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

    renderBackground() {
        let setBackgroundState = this.setBackgroundState;
        setInterval(function () {
            setBackgroundState();
        }, 20000);
    }

    setBackgroundState() {
        let index = this.state.backgroundIndex;
        if (index >= this.state.backgrounds.length - 1) {
            index = 0;
            this.setState({
                background: this.state.backgrounds[index],
                backgroundIndex: index
            });
        } else {
            index++;
            this.setState({
                background: this.state.backgrounds[index],
                backgroundIndex: index
            });
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
            <div className="pageBody" style={{backgroundImage: this.state.background}}>
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

                        <ProfileInfo />

                        {this.checkForDataAndRender()}

                    </div>
                </div>
            </div>
        );
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
