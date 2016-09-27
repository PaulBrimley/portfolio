import React, { Component } from "react";
import { connect } from "react-redux";

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };
        this.showHideModal = this.showHideModal.bind(this);
    }

    showHideModal() {
        console.log(this.props.modalContent);
        if (this.props.modalContent.showModal) {
            this.setState({
                opacity: 1
            });
            return 'block';
        } else {
            return 'none';
        }
    }

    render() {
        return(
            <div className="modalContent" style={{display: this.showHideModal(), opacity: this.state.opacity}}>
                {/*<img src={this.props.modalContent.mediaUrl} alt=""/>*/}
                <button>Close</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        modalContent: state.modalContent
    };
}

export default connect(mapStateToProps, {})(ModalComponent);