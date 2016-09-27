import React, { Component } from "react";
import { Link, browserHistory } from "react-router";
let name = 'Paul Brimley';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: name.split('')
        };
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
        console.log(letter);
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
                <Link to="manage">Link</Link>
            </div>
        );
    }
}

export default Header;