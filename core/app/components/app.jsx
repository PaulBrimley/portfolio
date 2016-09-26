import React, { Component } from "react";
import { connect } from "react-redux";
import CoverFlowComponent from './coverFlow';
import Header from './header';
import ProfileInfo from './profileInformation';
import Measure from 'react-measure';
import Carousel from './carousel';

import { getData, setProjectDimensions } from "../actions/index";

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            counter: 0,
    	    width: '90%',
            projectDimensions: {}
        };
    }

    componentWillMount() {
  	    this.props.getData('/getTempData');
    }

    renderProjects() {
        let dataLength = this.props.data.length - 1;
        return this.props.data.map(function (project, index) {
            return (

                <Carousel key={index} data={project} dataLength={dataLength} index={index}/>
            );
        });
    }

    render() {
        if (this.props.data && this.props.data.length > 0) {
            return(
                <div>
                    <div className="headerContainerHolder">
                        <div className="headerContainer" style={{width: this.state.width}}>
                            <Header />
                        </div>
                    </div>
                    <div className="mainContainerHolder">
                        <div className="mainContainer" style={{width: this.state.width}}>
                            <div className="profileInfo">
                                <ProfileInfo />
                            </div>
                            <Measure onMeasure={(dimensions) => {this.props.setProjectDimensions(dimensions);}}>
                                <div ref='projectContainer' className="carouselContainer">
                                    {this.renderProjects()}
                                </div>
                            </Measure>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Nothing here
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { data: state.data };
}

export default connect(mapStateToProps, { getData, setProjectDimensions })(App);
