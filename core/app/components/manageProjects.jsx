import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { addMediaAdds, addProject } from '../actions/index';

class ManageProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaAdds: 0,
            formFields: {}
        };
        this.addMediaAdds = this.addMediaAdds.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.watchChange = this.watchChange.bind(this);
    }

    componentWillMount() {
        this.addMediaAdds();
    }

    componentWillReceiveProps(props) {
        this.setState({
            mediaAdds: props.mediaAddsQuantity
        });
    }

    addMediaAdds() {
        this.props.addMediaAdds(this.state.mediaAdds);
    }

    renderMediaAdds() {
        if (this.props.mediaAddsQuantity > 0) {
            let array = [];
            for (var i = 0; i < this.props.mediaAddsQuantity; i++) {
                array.push(
                    <div key={'index' + i}>
                        <label htmlFor="">
                            Media Url
                            <input type="text" name={'mediaUrl' + i} onChange={this.watchChange} required/>
                        </label>
                        <label htmlFor="">
                            Media Title
                            <input type="text" name={'mediaTitle' + i} onChange={this.watchChange} required/>
                        </label>
                        <label htmlFor="">
                            Media Description
                            <textarea type="text" name={'mediaDescription' + i} onChange={this.watchChange} required/>
                        </label>
                        <label htmlFor="">
                            Media Vide Link
                            <textarea type="text" name={'mediaVideoLink' + i} onChange={this.watchChange}/>
                        </label>
                    </div>
                );
            }
            return array;
        }
    }

    submitProject(event) {
        event.preventDefault();
        this.props.addProject(this.state.formFields);

    }

    watchChange(event) {
        event.preventDefault();
        let stateObj = {};
        for (var prop in this.state.formFields) {
            stateObj[prop] = this.state.formFields[prop];
        }
        stateObj[event.target.name] = event.target.value;
        this.setState({
            formFields: stateObj
        });
    }

    render() {
        return(
            <div>
                <h3>Add Project</h3>
                <Link to="/">Link</Link>
                <form onSubmit={this.submitProject}>
                    <div>
                        <label htmlFor="">
                            Title
                            <input type="text" onChange={this.watchChange} name="title" required/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Description
                            <input type="text" onChange={this.watchChange} name="description" required/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Url
                            <input type="text" onChange={this.watchChange} name="url" />
                        </label>
                    </div>
                    <div>Add Media <i className="fa fa-plus-square-o cursorPointer" aria-hidden="true" onClick={this.addMediaAdds}/></div>
                    {this.renderMediaAdds()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

ManageProjects.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state) {
    return {
        mediaAddsQuantity: state.manageProjects.mediaAddsQuantity
    };
}
export default connect(mapStateToProps, { addMediaAdds, addProject })(ManageProjects);