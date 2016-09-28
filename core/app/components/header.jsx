import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { nameTester } from '../actions/index';

let name = 'Paul Brimley';
let nameTest = '';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: name.split(''),
            nameTest: false
        };
        this.watchLetter = this.watchLetter.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            nameTest: props.nameChecker
        });
    }

    renderLink() {
        if (this.state.nameTest) {
            return (
                <div>
                    <Link to="manage">Link</Link>
                </div>
            );
        } else {
            return (
                <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            );
        }
    }

    renderName() {
        let watchLetter = this.watchLetter;
        return this.state.name.map(function (letter, index) {
            return (
                <span key={index} onClick={() => watchLetter(letter)}>{letter}</span>
            );
        });
    }

    watchLetter(letter) {
        nameTest += letter.toLowerCase();
        if (nameTest.indexOf('yyyy') > -1) {
            console.log('clearing');
            nameTest = '';
        }

        if (nameTest.length) {
            console.log('sending', nameTest);
            this.props.nameTester(nameTest);
        }
    }

    render() {
        return(
            <div className="header">
                <div className="headerTitle">
                    {this.renderName()}
                </div>
                <div>
                    <div className="headerInfoTitle">Developer:</div>
                    <div className="headerInfo">Angular - React - Node - Express - Mongo</div>
                </div>
                {this.renderLink()}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        nameChecker: state.nameTest
    };
}

export default connect(mapStateToProps, { nameTester })(Header);