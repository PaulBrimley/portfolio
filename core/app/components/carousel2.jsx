import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectMedia2 from './projectMedia2';
import { moveProjectMedia } from '../actions/index';
import { Button } from 'react-bootstrap';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectMediaArrayLength: 0,
            projectMediaRotationAmount: 0,
            currentCarouselRotation: 0,
            activeSlide: 0
        };
        this.renderProjectMedia = this.renderProjectMedia.bind(this);
        this.leftArrowClicked = this.leftArrowClicked.bind(this);
        this.rightArrowClicked = this.rightArrowClicked.bind(this);
        this.renderLeftArrow = this.renderLeftArrow.bind(this);
        this.renderRightArrow = this.renderRightArrow.bind(this);
    }

    componentDidMount() {
        this.setState({
            projectMediaArrayLength: this.props.data.media.length,
            projectMediaRotationAmount: 360 / this.props.data.media.length
        });
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    leftArrowClicked() {
        this.setState({
            currentCarouselRotation: this.state.currentCarouselRotation - this.state.projectMediaRotationAmount,
            activeSlide: this.state.activeSlide + 1 > this.state.projectMediaArrayLength - 1 ? 0 : this.state.activeSlide + 1
        });
    }

    renderLeftArrow() {
        if (this.props.data.media && this.props.data.media.length > 1) {
            return (
                <div className="leftArrow2">
                    <i className="fa fa-angle-left fa-2x" aria-hidden="true" onClick={this.leftArrowClicked}/>
                </div>
            );
        }
    }

    renderRightArrow() {
        if (this.props.data.media && this.props.data.media.length > 1) {
            return (
                <div className="rightArrow2">
                    <i className="fa fa-angle-right fa-2x" aria-hidden="true" onClick={this.rightArrowClicked}/>
                </div>
            );
        }
    }

    renderProjectMedia() {
        if (this.props.data.media) {
            let activeSlide = this.state.activeSlide;
            let projectMediaArrayLength = this.state.projectMediaArrayLength;
            let projectMediaRotationAmount = this.state.projectMediaRotationAmount;
            return this.props.data.media.map(function (dataSet, index) {
                return (
                    <ProjectMedia2
                        key={index}
                        activeSlide={activeSlide}
                        dataSet={dataSet}
                        index={index}
                        projectMediaArrayLength={projectMediaArrayLength}
                        projectMediaRotation={projectMediaRotationAmount}
                    />
                );
            });
        } else {
            return (
                <div>No Media</div>
            );
        }
    }

    rightArrowClicked() {
        this.setState({
            currentCarouselRotation: this.state.currentCarouselRotation + this.state.projectMediaRotationAmount,
            activeSlide: this.state.activeSlide - 1 < 0 ? this.state.projectMediaArrayLength - 1 : this.state.activeSlide - 1
        });
    }

    setCarouselMarginBottom() {
        if (this.props.index === this.props.dataLength) {
            return '0px';
        } else {
            return '10px';
        }
    }

    render() {
        return(
            <div className="carouselHolder2">
                <div className="projectTitle2">
                    {this.props.data.title}
                </div>
                <div className="carousel2">

                    <div className="carouselContainerInside">
                        <div className="carouselContainerInsideInside" style={{transform: ('rotateY(' + this.state.currentCarouselRotation + 'deg)')}}>
                            {this.renderProjectMedia()}
                        </div>
                    </div>
                    <div className="carouselNavs">
                        {this.renderLeftArrow()}
                        {this.renderRightArrow()}
                    </div>

                </div>
                <div className="projectDescription2" style={{marginBottom: this.setCarouselMarginBottom()}}>
                    {this.props.data.description}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { moveProjectMedia })(Carousel);