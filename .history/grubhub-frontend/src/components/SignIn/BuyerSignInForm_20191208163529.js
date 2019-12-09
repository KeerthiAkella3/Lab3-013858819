import React, { Component } from 'react'
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { Redirect } from 'react-router'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { buyerLoginMutation } from '../../mutations/signupLoginProfilemutations';


class BuyerSignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buyerEmailId: "",
            buyerPassword: "",
            SignedUpFlag: false,
            message: "",
        }

        this.buyerEmailIdChangeHandler = this.buyerEmailIdChangeHandler.bind(this)
        this.buyerPasswordChangeHandler = this.buyerPasswordChangeHandler.bind(this)
        this.submitBuyerLogin = this.submitBuyerLogin.bind(this)
    }

    buyerEmailIdChangeHandler = (e) => {
        this.setState({
            buyerEmailId: e.target.value
        })
    }
    buyerPasswordChangeHandler = (e) => {
        this.setState({
            buyerPassword: e.target.value
        })
    }

    submitBuyerLogin = (e) => {
        console.log("in submit Login")
        const data = {
            buyerEmailId: this.state.buyerEmailId,
            buyerPassword: this.state.buyerPassword
        }
        console.log("data is..")
        console.log(data);
        e.preventDefault();
        this.props.mutate({ variables: data })
            .then(res => {
                console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + res);
                console.log(res);
                localStorage.setItem("userId", res.data.login.userId);
                localStorage.setItem("name", res.data.login.name);
                localStorage.setItem("email", res.data.login.email);
              
                if (!res.data.login.isValidUser) {
                    this.setState({
                        SignedUpFlag: true,
                        message: "buyer Logged in successfully"
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
        if (this.state.SignedUpFlag === true) {
            return <Redirect to="/BuyerHomePage" />
        }
        return (
            <div>
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
                                    <Form.Control type="email" placeholder="Enter email" required name="buyerEmailId" onChange={this.buyerEmailIdChangeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required name="buyerPassword" onChange={this.buyerPasswordChangeHandler} />
                                </Form.Group>
                                <Form.Text variant="danger">
                                    {this.state.message}
                                </Form.Text>
                                <Button variant="danger" type="submit" onClick={this.submitBuyerLogin}>
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

BuyerSignInForm = graphql (buyerLoginMutation) (BuyerSignInForm)

export default BuyerSignInForm