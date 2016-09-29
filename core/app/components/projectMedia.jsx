import React, { Component } from "react";
import { connect } from "react-redux";
import Measure from 'react-measure';
import { setCarouselHeight, moveProjectMedia, setModalContent } from '../actions/index';
import { Button } from 'react-bootstrap';

class ProjectMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animateTo: 20,
            buttonDisplay: 'none',
            dimensions: {},
            rotation: 0,
            centerRotation: 0,
            currentPosition: 0,
            position: 0,
            zIndex: 1
        };
        this.selectProjectMedia = this.selectProjectMedia.bind(this);
        this.setModalContent = this.setModalContent.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.moveProjectMediaState.hasOwnProperty('direction')) {
            if (props.moveProjectMediaState.projectId === this.props.projectId && props.moveProjectMediaState.direction === 'left') {
                let position = (this.state.currentPosition - 1) < 0 ? (props.projectMediaArrayLength - 1) : (this.state.currentPosition - 1);
                this.setRotationAndPosition(position, this.state.centerPosition, props.projectDimensions.width, props.slideWidth,  1);
            } else if (props.moveProjectMediaState.projectId === this.props.projectId && props.moveProjectMediaState.direction === 'right') {
                let position = (this.state.currentPosition + 1) > (props.projectMediaArrayLength - 1) ? 0 : (this.state.currentPosition + 1);
                this.setRotationAndPosition(position, this.state.centerPosition, props.projectDimensions.width, props.slideWidth, 1);
            }
        } else {
            this.setRotationAndPosition(props.index, props.centerPosition, props.projectDimensions.width, props.slideWidth);
        }
    }

    getBackground() {
        return 'url(' + this.props.dataSet.mediaUrl + ')';
    }

    selectProjectMedia(event) {
        console.log(this.state.dimensions);
    }

    setCarouselHeight(dimensions) {
        // console.log(dimensions, this.props.dataSet.mediaUrl);
        this.setState({
            dimensions: dimensions
        });

        if (this.state.currentPosition === this.props.centerPosition) {
            this.props.setCarouselHeight(this.props.projectId, dimensions);
        }
    }

    setModalContent() {
        this.props.setModalContent(true, this.props.dataSet);
    }

    setRotationAndPosition(currentPosition, centerPosition, projectWidth, slideWidth, afterInitial) {
        if (currentPosition === centerPosition) {
            this.setState({
                buttonDisplay: 'block',
                centerPosition: centerPosition,
                currentPosition: currentPosition,
                rotation: 'rotate3d(0, 1, 0, ' + 0 + 'deg) scale(1, 1)',
                position: ((projectWidth / 2) - (slideWidth / 2)) + 'px',
                width: this.state.width,
                zIndex: 100
            });
        } else if (currentPosition < centerPosition) {
            this.setState({
                buttonDisplay: 'none',
                centerPosition: centerPosition,
                currentPosition: currentPosition,
                rotation: 'rotate3d(0, 1, 0, ' + this.state.animateTo + 'deg) scale(.75, .75)',
                position: (((projectWidth / 2) - (slideWidth / 2)) - ((slideWidth - 100) * (centerPosition - currentPosition))) + 'px',
                zIndex: (100 - (centerPosition - currentPosition))
            });
        } else if (currentPosition > centerPosition) {
            this.setState({
                buttonDisplay: 'none',
                centerPosition: centerPosition,
                currentPosition: currentPosition,
                rotation: 'rotate3d(0, 1, 0, ' + (-1 * this.state.animateTo) + 'deg) scale(.75, .75)',
                position: (((projectWidth / 2) - (slideWidth / 2)) + ((slideWidth - 100) * (currentPosition - centerPosition))) + 'px',
                zIndex: (100 - (currentPosition - centerPosition))
            });
        }
    };

    render() {
        return(
            <Measure onMeasure={(dimensions) => this.setCarouselHeight(dimensions)}>
                <div className="projectMediaContainer" style={{left: this.state.position, zIndex: this.state.zIndex}}>
                    <div className="projectSlide" style={{transform: this.state.rotation, width: this.props.slideWidth, height: (this.props.slideWidth * .8), backgroundImage: this.getBackground()}}>
                        <Button bsStyle="success" bsSize="xsmall" className="viewButton" style={{display: this.state.buttonDisplay}} onClick={this.setModalContent}>View Media</Button>
                    </div>
                </div>
            </Measure>
        );
    }
}

function mapStateToProps(state) {
    return {
        moveProjectMediaState: state.moveProjectMedia
    };
}

export default connect(mapStateToProps, { setCarouselHeight, moveProjectMedia, setModalContent })(ProjectMedia);