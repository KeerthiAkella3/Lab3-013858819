import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BuyerNavBar from '../BuyerPages/BuyerNavBar'

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
        var buyerEmailId = cookie.load('cookie1');
        var buyerId = cookie.load('cookie2');
        console.log("buyerId  " + buyerId)
        console.log(buyerEmailId)

        if (buyerEmailId) {
            console.log("able to read cookie");
            let buyerName = cookie.load('cookie3');

            console.log(buyerName);
            this.setState({
                buyerName: buyerName//,
            });

            axios({
                method: 'get',
                url: 'http://localhost:3001/buyerDetails',
                params: { "buyerId": buyerId },
                config: { headers: { 'Content-Type': 'application/json' } }
            })
                .then((response) => {
                    if (response.status >= 500) {
                        throw new Error("Bad response from server");
                    }
                    console.log(response);
                    if (response.data == undefined) {
                        console.log(response.data.responseMessage);
                    }

                    let buyerDetails = response.data.buyerDetails;
                    if (buyerDetails) {
                        this.setState({
                            buyerName: buyerDetails.buyerName,
                            buyerPhone: buyerDetails.buyerPhone,
                            buyerAddress: buyerDetails.buyerAddress,
                            buyerEmailId: buyerDetails.buyerEmailId,
                        });
                    }
                }).catch(function (err) {
                    console.log(err)
                });

            axios({
                method: 'get',
                url: 'http://localhost:3001/profile/img',
                params: { "id": buyerId, "table": "buyerTable" },
                config: { headers: { 'Content-Type': 'application/json' } }
            })
                .then((response) => {
                    if (response.status >= 500) {
                        throw new Error("Bad response from server");
                    }
                    console.log(response);
                    return response.data;
                })
                .then((responseData) => {
                    console.log(responseData.base64str);
                    this.setState({
                        buyerImage: "data:image/png;base64," + responseData.base64str
                    });
                }).catch(function (err) {
                    console.log(err)
                });
        }
    }

    updateProfile = async (event) => {
        event.preventDefault();
        var buyerEmailId = cookie.load('cookie1');
        var buyerId = cookie.load('cookie2');
        console.log("In update profile cookie 1 " + buyerEmailId)
        console.log("In update profile cookie 2 " + buyerId)
        const formData = new FormData(event.target);
        console.log("Data " + formData.get('buyerPhone'))

        console.log("Data " + formData.get('buyerName'))
        await axios({
            method: 'post',
            url: 'http://localhost:3001/updateBuyerProfile',
            data: {
                "buyerEmailId": buyerEmailId,
                "buyerName": formData.get('buyerName'),
                "buyerPhone": formData.get('buyerPhone'),
                "buyerAddress": formData.get('buyerAddress'),
                "buyerId": buyerId
            },
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                console.log(response);
                if (response.data && response.data.updateResult && response.data.affectedRows === 1) {
                    console.log(response.data.responseMessage);
                }
                return response.data;
            })
            .catch(function (err) {
                console.log(err)
            });
            this.setState({
                updateDone: true,
            })
    }

    render() {

        if (this.state.updateDone === true) {
            return <Redirect 
            to={{
                pathname: '/BuyerHomePage',
            }}></Redirect> 
        }

        

        return (
            <div>
                <Card style={{ width: '22rem' }}>
                <BuyerNavBar disableProfile={true} />
                <h4>Your account</h4>
                <Form onSubmit={this.updateProfile}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="buyerName" defaultValue={this.state.buyerName} required readOnly={this.state.readonly} />
                    </Form.Group>
                    <Form.Group controld="formBasicAddress">
                        <Form.Label>buyerAddress</Form.Label>
                        <Form.Control type="text" name="buyerAddress" defaultValue={this.state.buyerAddress} required readOnly={this.state.readonly} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="buyerPhone" defaultValue={this.state.buyerPhone} required readOnly={this.state.readonly} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmailId">
                        <Form.Label>E-Mail ID</Form.Label>
                        <Form.Control type="text" name="buyerPhone" defaultValue={this.state.buyerEmailId} required readOnly={this.state.readonly} />
                    </Form.Group>
                    <Form.Group controlId='buyerImage'>
                    
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Profile
                     </Button>
                </Form>
                </Card>
            </div>
        )
    }
}

export default BuyerProfilePage