import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectMedia from './projectMedia';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselHeight: '0px',
            numberOfSlides: 3
        };
        this.renderProjectMedia = this.renderProjectMedia.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            carouselHeight: props.carouselDimensions.height + 20 + 'px'
        });
    }

    renderProjectMedia() {
        let slideWidth = 0;
        let projectDimensions = this.props.projectDimensions;
        let dataSetLength = 0;
        let centerPosition = 0;
        if (this.props.data && this.props.data.data) {
            dataSetLength = this.props.data.data.length - 1;
        }
        if (dataSetLength) {
            centerPosition = dataSetLength % 2 === 0 ? dataSetLength / 2 : Math.ceil(dataSetLength / 2);
        }
        if (this.props.projectDimensions) {
            slideWidth = (this.props.projectDimensions.width / this.state.numberOfSlides) - 10;
        }
        return this.props.data.data.map(function (dataSet, index) {
            return (
                <ProjectMedia key={index} dataSet={dataSet} centerPosition={centerPosition} index={index} projectDimensions={projectDimensions} slideWidth={slideWidth}/>
            );
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
            <div className="carousel" style={{height: this.state.carouselHeight, marginBottom: this.setCarouselMarginBottom()}}>
                {this.renderProjectMedia()}
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

export default connect(mapStateToProps, {})(Carousel);