import React, { Component } from "react";
import { connect } from "react-redux";
import CoverFlowComponent from './coverFlow';

import { hello } from "../actions/index";

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
    	    something: 0
        };
        this.hello = this.hello.bind(this);
    }

    hello() {
  	    this.props.hello(this.props.something);
    }

    render() {

        return(
            <div className="mainContainer">
                <CoverFlowComponent />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { something: state.something };
}

export default connect(mapStateToProps, { hello })(App);
