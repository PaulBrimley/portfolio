import React, { Component } from "react";
import { connect } from "react-redux";
import Measure from 'react-measure';
import { setCarouselHeight } from '../actions/index';

class ProjectMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animateTo: 20,
            rotation: 0,
            centerRotation: 0,
            position: 0,
            scale: 'scale(1, 1)',
            zIndex: 1
        };
    }

    componentWillReceiveProps(props) {
        this.setRotationAndPosition(props.index, props.centerPosition, props.projectDimensions.width, props.slideWidth);
    }

    setRotationAndPosition(index, centerPosition, projectWidth, slideWidth) {
        if (index === centerPosition) {
            this.setState({
                rotation: 'rotate3d(0, 1, 0, ' + 0 + 'deg)',
                position: ((projectWidth / 2) - (slideWidth / 2)) + 'px',
                zIndex: 99999
            });
        } else if (index < centerPosition) {
            this.setState({
                rotation: 'rotate3d(0, 1, 0, ' + this.state.animateTo + 'deg)',
                position: (((projectWidth / 2) - (slideWidth / 2)) - ((slideWidth - 100) * (centerPosition - index))) + 'px',
                scale: 'scale(.75, .75)',
                zIndex: (99999 - (centerPosition - index))
            });
        } else if (index > centerPosition) {
            console.log(99999 - (index - centerPosition));
            this.setState({
                rotation: 'rotate3d(0, 1, 0, ' + (-1 * this.state.animateTo) + 'deg)',
                position: (((projectWidth / 2) - (slideWidth / 2)) + ((slideWidth - 100) * (index - centerPosition))) + 'px',
                scale: 'scale(.75, .75)',
                zIndex: (99999 - (index - centerPosition))
            });
        }

    };

    render() {
        return(
            <div className="projectMediaContainer" style={{left: this.state.position, transform: this.state.scale, zIndex: this.state.zIndex}}>
                <Measure onMeasure={(dimensions) => this.props.setCarouselHeight(dimensions)}>
                    <div className="projectSlide" style={{transform: this.state.rotation, width: this.props.slideWidth}}>
                        <img src={this.props.dataSet.imageUrl} alt=""/>
                    </div>
                </Measure>
            </div>
        );
    }
}

function mapStateToProps() {
    return {

    };
}

export default connect(mapStateToProps, { setCarouselHeight })(ProjectMedia);