import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

/**
 * This is owner (restaurant's) profile page
 */
export class OwnerProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            readonly: '',
            id: '',
            restaurantEmailId: '',
            restaurantAddress: '',
            userPassword: '',
            restaurantPhone: '',
            restaurantName: '',
            restaurantCuisine: '',
        }
    }

    componentDidMount() {
        var restaurantEmailId = localStorage.getItem('email');
        var restaurantId = localStorage.getItem('userId');
        if (restaurantEmailId) {
            let ownerName = localStorage.getItem('name');

            console.log(ownerName);
            this.setState({
                restaurantName: ownerName,
            });
        }
    }

    onClose() {
        this.setState({ preview: null })
    }


    updateProfile = async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        var restaurantEmailId = localStorage.getItem('email')
        var restaurantId = localStorage.getItem('userId')
        console.log("In update profile cookie 1 " + restaurantEmailId)
        console.log("In update profile cookie 2 " + restaurantId)
        const formData = new FormData(event.target);
        var data = {
            "restaurantEmailId": localStorage.getItem('email'),
            "restaurantName": formData.get('restaurantName'),
            "restaurantPhone": formData.get('restaurantPhone'),
            "restaurantAddress": formData.get('restaurantAddress'),
            "restaurantCuisine": formData.get('restaurantCuisine'),
        }

    }

    render() {



        return (
            <div>
                <h4>Your account</h4>
                <Form onSubmit={this.updateProfile}>
                    <Form.Group controlId="formBasicRetaurentName">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control type="text" name="restaurantName" defaultValue={this.state.restaurantName} required readOnly={this.state.readonly} />
                    </Form.Group>
                    <Form.Group controlId="formGridrestaurantAddress1">
                        <Form.Label>restaurantAddress</Form.Label>
                        <Form.Control type="text" name="restaurantAddress" defaultValue={this.state.restaurantAddress} required readOnly={this.state.readonly} />
                    </Form.Group>

                    <Form.Group controlId="formBasicrestaurantPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="restaurantPhone" defaultValue={this.state.restaurantPhone} required readOnly={this.state.readonly} />
                    </Form.Group>



                    <Form.Group controlId="formBasicrestaurantCuisine">
                        <Form.Label>restaurantCuisine</Form.Label>
                        <Form.Control type="text" name="restaurantCuisine" defaultValue={this.state.restaurantCuisine} required readOnly={this.state.readonly} />
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Update Profile
                     </Button>
                </Form>
            </div>
        )
    }
}

export default OwnerProfilePage