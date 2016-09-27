import React, { Component } from "react";
import { Link, browserHistory } from "react-router";

class Header extends Component {


    clickTest() {
        browserHistory.push('manage');
    }

    render() {
        return(
            <div className="header">
                <Link to="manage" onClick={this.clickTest}>Link</Link>
                Header here
            </div>
        );
    }
}

export default Header;