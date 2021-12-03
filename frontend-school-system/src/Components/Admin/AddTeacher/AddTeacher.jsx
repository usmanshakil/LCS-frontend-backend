import React, { Component } from 'react'
import { Container, Grid, Form, Button } from 'semantic-ui-react';
//loader
import { Loaders } from '../../Shared';

class AddTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: '',
            modalHeader: '',
            modalDescription: '',
            modalOpen: false,
            addTeacherModal: {
                first_name: '',
                last_name: '',
                room: '',
                email: '',
                class_name: '',

            },
            hasDataLoad: false
        }
    }
    // handle all input values of add teacher form 
    handleInput = (event) => {
        let { name, value } = event.target,
            { addTeacherModal } = this.state;

        addTeacherModal[name] = value

        this.setState({
            addTeacherModal
        })
    }
    // showing loader when user submit form
    showLoader = () => {
        this.setState({
            hasDataLoad: true
        }, () => {
            this.submitTeacher();
        })
    }
    // calling add teacher api
    submitTeacher = () => {
        this.setState({
            hasDataLoad: false
        })
    }


    render() {
        let { addTeacherModal, hasDataLoad } = this.state,
            { first_name, last_name, class_name, email } = addTeacherModal;
        return (
            <div>
                <Container className="main-layout-height mt-5rem">
                    {
                        hasDataLoad === true ?
                            <Loaders isLoading={hasDataLoad} />
                            :
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={4} />
                                    <Grid.Column computer={8} mobile={16} tablet={16}>
                                        <Form onSubmit={this.showLoader}>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>First Name</label>
                                                    <input type="text" value={first_name} name="first_name" onChange={this.handleInput} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Last Name</label>
                                                    <input type="text" value={last_name} name="last_name" onChange={this.handleInput} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Email</label>
                                                    <input type="email" value={email} name="email" onChange={this.handleInput} />
                                                </Form.Field>

                                            </Form.Group>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Class Name</label>
                                                    <input type="text" value={class_name} name="class_name" onChange={this.handleInput} />
                                                </Form.Field>
                                                <Form.Field />
                                                <Form.Field />
                                            </Form.Group>
                                            <Button type="submit" color="green">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column computer={4} />
                                </Grid.Row>
                            </Grid>
                    }

                </Container>
            </div>
        )
    }
}

export default AddTeacher
