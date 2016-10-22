import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from './header';
import ProfileInfo from './profileInformation';
import Measure from 'react-measure';
import Carousel from './carousel';
import Carousel2 from './carousel2';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

import { browserHistory } from 'react-router';

import { clearLink, getData, setProjectDimensions, setModalContent } from "../actions/index";

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
        this.setBackgroundState();
        this.props.clearLink();
    }

    checkForDataAndRender() {
        if (this.state.data && this.state.data.length > 0) {
            return (
                <Measure onMeasure={(dimensions) => {this.props.setProjectDimensions(dimensions);}}>
                    <div className="carouselContainer">
                        <div className="carouselHeader">
                            Projects
                            <img src="./assets/images/decorativeLine2.png" alt=""/>
                        </div>
                        {this.renderProjects()}
                    </div>
                </Measure>
            );
        } else {
            return (
                <div className="carouselContainer">
                    <div className="carouselHeader">
                        No projects to display
                    </div>
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

    renderModalVideo() {
        if (this.state.modalContent.hasOwnProperty('content') && this.state.modalContent.content.mediaVideoLink) {
            return (
                <div className="videoWrapper">
                    <iframe width="560" height="349" src={ this.state.modalContent.content.mediaVideoLink} frameBorder="0" allowFullScreen></iframe>
                </div>
            );
        }
    }

    /*renderProjects() {
        let dataLength = this.state.data.length - 1;
        return this.state.data.map(function (project, index) {
            return (
                <Carousel key={index} data={project} dataLength={dataLength} index={index}/>
            );
        });
    }*/

    renderProjects() {
        let dataLength = this.state.data.length - 1;
        return this.state.data.map(function (project, index) {
            return (
                <Carousel2 key={index} data={project} dataLength={dataLength} index={index}/>
            );
        });
    }

    setBackgroundState() {
        let index = Math.floor(Math.random() * (this.state.backgrounds.length - 1));
        this.setState({
            background: this.state.backgrounds[index]
        });
    }

    render() {
        return(
            <div className="pageBody">
                <div className="pageBodyBackground" style={{backgroundImage: this.state.background}}></div>
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
                                {this.renderModalVideo()}
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

export default connect(mapStateToProps, { clearLink, getData, setProjectDimensions, setModalContent })(MainView);
