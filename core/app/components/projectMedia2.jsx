import React, { Component } from "react";
import { connect } from "react-redux";
import { setCarouselHeight, moveProjectMedia, setModalContent } from '../actions/index';
import { Button } from 'react-bootstrap';

class ProjectMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisplay: 'none',
        };
        this.setModalContent = this.setModalContent.bind(this);
    }

    componentWillReceiveProps(props) {

    }

    displayButton() {
        if (this.props.index === this.props.activeSlide) {
            return 'block';
        } else {
            return 'none';
        }
    }

    getBackground() {
        return 'url(' + this.props.dataSet.mediaUrl + ')';
    }

    getHeight() {
        if (this.props.index === this.props.activeSlide) {
            return '60%';
        } else if (this.props.projectMediaArrayLength > 1) {
            return '30%';
        }
    }

    getTransform() {
        if (this.props.index === this.props.activeSlide) {
            return 'rotateY( ' + (this.props.projectMediaRotation * this.props.index) + 'deg ) translateX( -80% )';
        } else if (this.props.projectMediaArrayLength > 1) {
            return 'rotateY( ' + (this.props.projectMediaRotation * this.props.index) + 'deg ) translateX( -5px )';
        }
    }

    getWidth() {
        if (this.props.index === this.props.activeSlide) {
            return '120%';
        } else if (this.props.projectMediaArrayLength > 1) {
            return '70%';
        }
    }

    setModalContent() {
        this.props.setModalContent(true, this.props.dataSet);
    }

    setRotationAndPosition() {

    };

    render() {
        return(
            <figure className="projectSlide2" style={{transform: this.getTransform(), background: this.getBackground(), backgroundSize: 'cover', width: this.getWidth(), height: this.getHeight()}}>
                <div className="buttonHolder">
                    <Button bsStyle="success" bsSize="xsmall" className="viewButton2" style={{display: this.displayButton()}} onClick={this.setModalContent}>View Media</Button>
                </div>
            </figure>
        );
    }
}

function mapStateToProps(state) {
    return {
        moveProjectMediaState: state.moveProjectMedia
    };
}

export default connect(mapStateToProps, { setCarouselHeight, moveProjectMedia, setModalContent })(ProjectMedia);