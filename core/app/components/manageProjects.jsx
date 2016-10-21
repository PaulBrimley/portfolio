import React, { Component, PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { addMediaAdds, addProject, checkLinkSet, getData, updateProject } from '../actions/index';
import { Button, ControlLabel, Form, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';

class ManageProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mediaAdds: 0,
            formFields: {
                title: '',
                url: '',
                description: ''
            },
            projectId: ''
        };
        this.addMediaAdds = this.addMediaAdds.bind(this);
        this.removeMediaAdds = this.removeMediaAdds.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.setProjectToEdit = this.setProjectToEdit.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.watchChange = this.watchChange.bind(this);
    }

    componentWillMount() {
        this.addMediaAdds(this.state.mediaAdds);
        this.props.getData('/getProjects');
        this.props.checkLinkSet().then(function (response) {
            if (!response.payload.data) {
                browserHistory.push('/');
            }
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
            mediaAdds: props.mediaAddsQuantity
        });
    }

    addMediaAdds(quantity) {
        quantity++;
        let stateObj = {};
        for (var prop in this.state.formFields) {
            stateObj[prop] = this.state.formFields[prop];
        }
        stateObj['mediaTitle' + (quantity - 1)] = '';
        stateObj['mediaUrl' + (quantity - 1)] = '';
        stateObj['mediaDescription' + (quantity - 1)] = '';
        stateObj['mediaVideoLink' + (quantity - 1)] = '';
        this.setState({
            formFields: stateObj
        });
        this.props.addMediaAdds(quantity);
    }

    clearForm() {
        this.setState({
            mediaAdds: 0,
            formFields: {
                title: '',
                url: '',
                description: '',
                mediaUrl0: '',
                mediaTitle0: '',
                mediaDescription0: '',
                mediaVideoLink0: ''
            },
            projectId: ''
        });
        this.props.addMediaAdds(1);
    }

    getValidationState(input) {
        if ((!this.state.formFields[input] || !this.state.formFields[input].length) && input.indexOf('mediaVideoLink') === -1) {
            return 'error';
        }
    }

    removeMediaAdds(index) {
        console.log(index);
        let stateObj = {};
        for (var prop in this.state.formFields) {
            if (prop.indexOf(index) > -1) {
                continue;
            } else {
                stateObj[prop] = this.state.formFields[prop];
            }
        }
        let count = this.state.mediaAdds - 1;
        console.log(stateObj, count);
        /*this.setState({
            mediaAdds: count,
            formFields: stateObj
        });
        this.props.addMediaAdds(count);*/
    }

    renderMediaAdds() {
        if (this.props.mediaAddsQuantity > 0) {
            let array = [];
            for (var i = 0; i < this.props.mediaAddsQuantity; i++) {
                array.push(
                    <Row key={'index' + i} className="manageProjectMediaRow">
                        <Col sm={3}>
                            <FormGroup validationState={this.getValidationState('mediaUrl' + i)}>
                                <ControlLabel>
                                    Media Url
                                </ControlLabel>
                                <FormControl
                                    name={'mediaUrl' + i}
                                    type="text"
                                    onChange={this.watchChange}
                                    value={this.state.formFields['mediaUrl' + i]}/>
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup validationState={this.getValidationState('mediaTitle' + i)}>
                                <ControlLabel>
                                    Media Title
                                </ControlLabel>
                                <FormControl
                                    name={'mediaTitle' + i}
                                    type="text"
                                    onChange={this.watchChange}
                                    value={this.state.formFields['mediaTitle' + i]}/>
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup validationState={this.getValidationState('mediaDescription' + i)}>
                                <ControlLabel>
                                    Media Description
                                </ControlLabel>
                                <FormControl
                                    name={'mediaDescription' + i}
                                    type="text"
                                    onChange={this.watchChange}
                                    value={this.state.formFields['mediaDescription' + i]}/>
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup validationState={this.getValidationState('mediaVideoLink' + i)}>
                                <ControlLabel>
                                    Media Video Link
                                </ControlLabel>
                                <FormControl
                                    name={'mediaVideoLink' + i}
                                    type="text"
                                    onChange={this.watchChange}
                                    value={this.state.formFields['mediaVideoLink' + i]}/>
                            </FormGroup>
                        </Col>
                        <div className="manageProjectRemoveMediaIcon"><i name={'indexHolder' + i} className="fa fa-times-circle cursorPointer" aria-hidden="true" onClick={this.removeMediaAdds.bind(null, i)}/></div>
                    </Row>
                );
            }
            return array;
        }
    }

    renderProjects() {
        let setProjectToEdit = this.setProjectToEdit;
        if (this.state.data && this.state.data.length > 0) {
            return this.state.data.map(function (project, index) {
                return (
                    <Row key={index} className="manageProjectProject" onClick={() => setProjectToEdit(project)}>
                        <Col xs={2}>
                            {project.title}
                        </Col>
                        <Col xs={6}>
                            {project.description}
                        </Col>
                        <Col xs={2}>
                            {project.media.length}
                        </Col>
                    </Row>
                );
            });
        }
    }

    setProjectToEdit(project) {
        let stateObj = {};
        stateObj.title = project.title;
        stateObj.description = project.description;
        if (project.url) {
            stateObj.url = project.url;
        } else {
            stateObj.url = '';
        }
        project.media.map(function (mediaItem, index) {
            stateObj['mediaTitle' + index] = mediaItem.mediaTitle;
            stateObj['mediaUrl' + index] = mediaItem.mediaUrl;
            stateObj['mediaDescription' + index] = mediaItem.mediaDescription;
            if (mediaItem.mediaVideoLink) {
                stateObj['mediaVideoLink' + index] = mediaItem.mediaVideoLink;
            } else {
                stateObj['mediaVideoLink' + index] = '';
            }
        });
        this.setState({
            mediaAdds: project.media.length,
            formFields: stateObj,
            projectId: project._id
        });
        this.props.addMediaAdds(project.media.length);
    }

    submitProject(event) {
        event.preventDefault();
        let complete = true;
        if (!this.state.formFields.title.length || !this.state.formFields.description.length) {
            complete = false;
        }
        for (var i = 0; i < this.props.mediaAddsQuantity; i++) {
            if ((!this.state.formFields['mediaUrl' + i] || !this.state.formFields['mediaUrl' + i].length) || (!this.state.formFields['mediaTitle' + i] || !this.state.formFields['mediaTitle' + i].length) || (!this.state.formFields['mediaDescription' + i] || !this.state.formFields['mediaDescription' + i].length)) {
                complete = false;
            }
        }
        if (complete) {
            console.log(this.state.projectId, this.state.projectId.length);
            if (!this.state.projectId.length) {
                this.props.addProject(this.state.formFields);
            } else {
                let getData = this.props.getData;
                this.props.updateProject(this.state.formFields, this.state.projectId).then(function () {
                    getData('/getProjects');
                });
            }
        }
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
        let addMediaAdds = this.addMediaAdds;
        let mediaAdds = this.state.mediaAdds;
        return(
            <div className="manageProjectPageBody">
                <h3>Add Project</h3>
                <Link to="/">Link</Link>
                <Form horizontal onSubmit={this.submitProject}>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState('title')}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="title"
                                type="text"
                                onChange={this.watchChange}
                                value={this.state.formFields['title']}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formBasicText">
                        <Col componentClass={ControlLabel} sm={2}>
                            Url
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="url"
                                type="text"
                                onChange={this.watchChange}
                                value={this.state.formFields['url']}/>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState('description')}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="description"
                                componentClass="textarea"
                                type="textarea"
                                onChange={this.watchChange}
                                value={this.state.formFields['description']}/>
                        </Col>
                    </FormGroup>
                    <div>Add Media <i className="fa fa-plus-square-o cursorPointer" aria-hidden="true" onClick={() => addMediaAdds(mediaAdds)}/></div>
                    <Grid fluid={true}>
                        {this.renderMediaAdds()}
                    </Grid>
                    <Button type="submit" style={{marginTop: '10px'}}>Submit</Button>
                    <Button bsStyle="warning" style={{marginTop: '10px', marginLeft: '5px'}} onClick={this.clearForm}>Clear</Button>
                </Form>
                <hr/>
                <Row>
                    <Col xs={2} className="manageProjectProjectHeader">
                        Title
                    </Col>
                    <Col xs={6} className="manageProjectProjectHeader">
                        Description
                    </Col>
                </Row>
                {this.renderProjects()}
            </div>
        );
    }
}

ManageProjects.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state) {
    return {
        data: state.data,
        mediaAddsQuantity: state.manageProjects.mediaAddsQuantity,
        projectUpdated: state.manageProjects.projectUpdated
    };
}
export default connect(mapStateToProps, { addMediaAdds, addProject, checkLinkSet, getData, updateProject })(ManageProjects);