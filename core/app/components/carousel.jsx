import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectMedia from './projectMedia';
import { moveProjectMedia } from '../actions/index';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselHeight: '0px',
            numberOfSlides: 3
        };
        this.renderProjectMedia = this.renderProjectMedia.bind(this);
        this.leftArrowClicked = this.leftArrowClicked.bind(this);
        this.rightArrowClicked = this.rightArrowClicked.bind(this);
        this.renderLeftArrow = this.renderLeftArrow.bind(this);
        this.renderRightArrow = this.renderRightArrow.bind(this);
    }

    componentWillReceiveProps(props) {
        for (var prop in props.carouselDimensions) {
            if (prop === props.data._id) {
                // console.log(props.carouselDimensions[prop].height + 20);
                this.setState({
                    carouselHeight: props.carouselDimensions[prop].height + 20 + 'px'
                });
            }
        }
    }

    leftArrowClicked() {
        this.props.moveProjectMedia(this.props.data._id, 'left');
    }

    renderLeftArrow() {
        if (this.props.data.media && this.props.data.media.length > 1) {
            return (
                <div className="leftArrow" style={{height: this.state.carouselHeight}}>
                    <i className="fa fa-angle-left fa-3x" aria-hidden="true" onClick={this.leftArrowClicked}/>
                </div>
            );
        }

    }

    renderRightArrow() {
        if (this.props.data.media && this.props.data.media.length > 1) {
            return (
                <div className="rightArrow" style={{height: this.state.carouselHeight}}>
                    <i className="fa fa-angle-right fa-3x" aria-hidden="true" onClick={this.rightArrowClicked}/>
                </div>
            );
        }
    }

    renderProjectMedia() {
        let slideWidth = 0;
        let projectDimensions = this.props.projectDimensions;
        let dataSetLength = 0;
        let centerPosition = 0;
        if (this.props.data && this.props.data.media) {
            dataSetLength = this.props.data.media.length - 1;
        }
        if (dataSetLength) {
            centerPosition = dataSetLength % 2 === 0 ? dataSetLength / 2 : Math.ceil(dataSetLength / 2);
        }
        if (this.props.projectDimensions) {
            slideWidth = (this.props.projectDimensions.width / this.state.numberOfSlides) - 10;
        }
        if (this.props.data.media) {
            let projectId = this.props.data._id;
            let projectMediaArrayLength = this.props.data.media.length;
            return this.props.data.media.map(function (dataSet, index) {
                return (
                    <ProjectMedia key={index} dataSet={dataSet} centerPosition={centerPosition} index={index} projectDimensions={projectDimensions} slideWidth={slideWidth} projectId={projectId}
                       projectMediaArrayLength={projectMediaArrayLength}
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
        this.props.moveProjectMedia(this.props.data._id, 'right');
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
            <div>
                <div className="projectTitle">
                    {this.props.data.title}
                </div>
                <div className="carousel" style={{height: this.state.carouselHeight, marginBottom: this.setCarouselMarginBottom()}}>
                    {this.renderLeftArrow()}
                    {this.renderProjectMedia()}
                    {this.renderRightArrow()}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        projectDimensions: state.projectComponent,
        carouselDimensions: state.carouselComponent
    };
}

export default connect(mapStateToProps, { moveProjectMedia })(Carousel);