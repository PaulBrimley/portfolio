import React, { Component } from "react";
import Coverflow from 'react-coverflow';
import Slider from 'react-slick';
import { connect } from "react-redux";


class CoverFlowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.renderImages = this.renderImages.bind(this);
    }

    renderImages() {
        return this.props.data.data.map(function (dataObj, index) {
            return (
                <img key={index} src={dataObj.imageUrl} alt={dataObj.imageTitle} />
            );
        });
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    render() {
        const settings = {
            className: 'center',
            centerMode: true,
            infinite: true,
            centerPadding: '60px',
            slidesToShow: 3,
            speed: 500
        };
        let marginBottom = this.props.index !== this.props.dataLength ? '10px' : '0px';
        if (this.props.projectDimensions && this.props.projectDimensions.hasOwnProperty('width')) {
            return(
                <div className="project" style={{marginBottom: marginBottom, }}>
                    <div className="coverflowTitle">{this.props.data.title}</div>
                    {/*<Slider {...settings}>
                        {this.renderImages()}
                    </Slider>*/}
                    {/*<Coverflow
                        width={this.props.projectDimensions.width}
                        height={150}
                        displayQuantityOfSide={2}
                        navigation={true}
                        enableHeading={true}>
                        {this.renderImages()}
                     </Coverflow>*/}

                </div>
            );
        } else {
            return(
              <div>Getting Dimensions</div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        projectDimensions: state.projectComponent
    };
}

export default connect(mapStateToProps,{})(CoverFlowComponent);