import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BuyerNavBar from '../BuyerPages/BuyerNavBar'
import Card from 'react-bootstrap/Card'

import { graphql } from "react-apollo";
import { buyerUpdateProfileMutation } from '../../Mutations/SignupLoginProfileMutations.js';


/**
 * This is buyer's profile page
 */
export class BuyerProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buyerName: '',
            buyerEmailId: '',
            buyerAddress: '',
            buyerPassword: '',
            buyerPhone: '',
            buyerId: '',
            buyerImage: undefined,
            readonly: '',
            updateDone: false,
        }
 
        this.updateProfile = this.updateProfile.bind(this);
    }



    componentWillMount() {
        var buyerEmailId = localStorage.getItem("email")
        var buyerId = localStorage.getItem("userId")
        console.log("buyerId  " + buyerId)
        console.log(buyerEmailId)

        if (buyerEmailId) {
            console.log("able to read cookie");
            let buyerName = localStorage.getItem('name');

            console.log(buyerName);
            this.setState({
                buyerName: buyerName,
            });
        }
    }

    updateProfile = async (event) => {
        event.preventDefault();
        
        var buyerEmailId = localStorage.getItem("email")
        var buyerId = localStorage.getItem("userId")
        console.log("In update profile cookie 1 " + buyerEmailId)
        console.log("In update profile cookie 2 " + buyerId)
        const formData = new FormData(event.target);
        console.log("Data " + formData.get('buyerPhone'))
        var data = {
            "buyerEmailId": localStorage.getItem("email"),
            "buyerName": formData.get('buyerName'),
            "buyerPhone": formData.get('buyerPhone'),
            "buyerAddress": formData.get('buyerAddress'),
        }
        localStorage.setItem("name",formData.get('buyerName'))

        this.props.mutate({ variables: data })
            .then(res => {
                console.log("Status Code : ", res.status);
                console.log("Response from update Up " + res);
                console.log(res);
        
              
                if (!res.data.updateProfile.isUpdate) {
                    this.setState({
                        updateDone: false,
                        message: "Update failed"
                    })
                }
                else {
                    this.setState({
                        updateDone: true,
                        message: "update successfully"
                        
                    })
                }
            }).catch(err => {
                console.log(err);
            });

        }

    render() {

        if (this.state.updateDone === true) {
            alert("Update successful")
            return <Redirect 
            to={{
                pathname: '/BuyerHomePage',
            }}></Redirect> 
        }

        

        return (
            <div>
                <center>
                
                <BuyerNavBar disableProfile={true} />
                <Card style={{ width: '28rem' }}>
                <h4>Your account</h4>
                <p>Please Enter all the details with the details you want to update</p>
                <br></br>
                <Form onSubmit={this.updateProfile}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="buyerName" defaultValue={this.state.buyerName} required readOnly={this.state.readonly} />
                    </Form.Group>
                    <Form.Group controld="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="buyerAddress" defaultValue={this.state.buyerAddress} required readOnly={this.state.readonly} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="buyerPhone" defaultValue={this.state.buyerPhone} required readOnly={this.state.readonly} />
                    </Form.Group>
 
                    <Button variant="primary" type="submit">
                        Update Profile
                     </Button>
                </Form>
                </Card>
                </center>
            </div>
        )
    }
}

BuyerProfilePage = graphql (buyerUpdateProfileMutation) (BuyerProfilePage)
export default BuyerProfilePage