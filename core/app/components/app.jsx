import React from "react";
import { Component } from "react";
// import HeaderBar from "./header";
import { connect } from "react-redux";

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

  showHeader() {
    if (this.props.user && this.props.user._id)
    {
      return <HeaderBar user={this.props.user} />;
    } else {
      this.props.getUser();
      return <HeaderBar />;
    }
  }

  /*render() {
    return(
      <div className="mainContainer">
        {this.showHeader()}
        {this.props.children}
      </div>
    );
  }*/

  hello() {
  	this.props.hello(this.props.something);
  }

  renderNumbers() {
  	return this.props.something.map(function(number) {
  		return (
  			<div key={number}>{number}</div>
  		);
  	});
  }

  render() {
  	return(
  	  <div className="mainContainer">
  	    <div>Hello World from React with numbers:</div>
  	    <div>{this.props.something}</div>
  	    <button onClick={this.hello}>Click Me</button>
  	  </div>
  	);    
  }
}

function mapStateToProps(state) {
  return { something: state.something };
}

export default connect(mapStateToProps, { hello })(App);
