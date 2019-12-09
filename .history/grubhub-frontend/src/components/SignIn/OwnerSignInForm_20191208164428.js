import React, { Component } from 'react'
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { Redirect } from 'react-router'
//import ownerSignIn from './ownerSignIn';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { graphql } from "react-apollo";
import { ownerLoginMutation } from '../../Mutations/SignupLoginProfileMutations';



class OwnerSignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurantEmailId: "",
            restaurantPassword: "",
            SignedUpFlag: false
        }


        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)

        this.submitOwnerLogin = this.submitOwnerLogin.bind(this)
    }

    emailIdChangeHandler = (e) => {
        this.setState({
            restaurantEmailId: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            restaurantPassword: e.target.value
        })
    }

    submitOwnerLogin = (e) => {
        console.log("in submit Login")
        e.preventDefault();
        const data = {
            restaurantEmailId: this.state.restaurantEmailId,
            restaurantPassword: this.state.restaurantPassword
        }
        console.log("data is..")
        console.log(data);
        this.props.mutate({ variables: data })
            .then(res => {
                console.log("Status Code : ", res.status);
                console.log("Response from Sign Up " + res);
                console.log(res);
                localStorage.setItem("userId", res.ownerLogin.login.userId);
                localStorage.setItem("name", res.ownerLogin.login.name);
                localStorage.setItem("email", res.ownerLogin.login.email);
              
                if (res.ownerLogin.login.isValidUser) {
                    this.setState({
                        SignedUpFlag: true,
                        message: "Owner Logged in successfully"
                    })
                }
                else {
                    this.setState({
                        SignedUpFlag: false,
                        message: "Invalid Credentials"
                    })
                }
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        var nextpage = null
        if (this.state.SignedUpFlag === true) {
            nextpage = <Redirect to="/OwnerHomePage" />
        }
        return (
            <div>
                {nextpage}
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <center>
                    <Card style={{ width: '22rem' }}>
                        <br></br>
                        <h4>Sign in with your Grubhub account</h4>
                        <br></br>
                        <center>
                            <Form style={{ width: '18rem' }}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" required name="restaurantEmailId" onChange={this.emailIdChangeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required name="restaurantPassword" onChange={this.passwordChangeHandler} />
                                </Form.Group>
                                <Form.Text variant="danger">
                                    {this.state.message}
                                </Form.Text>
                                <Button variant="danger" type="submit" onClick={this.submitOwnerLogin}>
                                    Sign in
                    </Button>
                                <br></br>
                            </Form>
                            <br></br>
                        </center>
                    </Card>
                </center>
            </div>
        )
    }
}



const loginqueryoptions = {
    options: props => ({
      variables: {
        "email": this.state.data.email,
        "password": this.state.data.password
      },
    }),
  }

  OwnerSignInForm = graphql (ownerLoginMutation) (OwnerSignInForm)

export default OwnerSignInForm