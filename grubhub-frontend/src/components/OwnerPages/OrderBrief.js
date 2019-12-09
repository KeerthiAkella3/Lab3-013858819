import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios'

export class OrderBrief extends Component {

    constructor(props) {
        super(props)

        this.state = {
            anOrderData: undefined,
            orderStatus: "New",
        }
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            anOrderData: this.props.anOrderData,
            orderStatus: this.props.orderStatus,
        })
    }

    cancelOrder = () => {
        let anOrderData = this.state.anOrderData;
        axios.delete('http://localhost:3001/deleteOrder', {
            params: {
                uniqueOrderId: anOrderData.uniqueOrderId,
            }
        }).then(response => {
            console.log("Response on buyer details: ");
            console.log(response.data.buyerDetails);
            if (response.status === 200) {
                console.log("Successfully deleted Order");
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            anOrderData: undefined,
        })
    }

    changeOrderStatus = (e, nextStatus) => {
        
        let anOrderData = this.state.anOrderData;
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/updateOrder', 
            {
                uniqueOrderId: anOrderData.uniqueOrderId,
                nextStatus: nextStatus,
            }
        ).then(response => {
            console.log("Response on update order details: ");
            console.log(response.data.buyerDetails);
            if (response.status === 200) {
                console.log("Successfully updated Order");
                // window.alert("Successfully updated order from " + anOrderData.buyerName);
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            anOrderData: undefined,
        })
        // this.props.handleChangeStatus(e, nextStatus);
    }


    render() {
        let anOrderData = this.state.anOrderData;
        if (anOrderData == undefined) {
            return null;
        }

        let listGroupStyle = {
            paddingTop: "5px",
            paddingBottom: "5px",
        }

        console.log("In order brief page");
        console.log(anOrderData);
        // an order will have buyer, owner information, and multiple items. One item includes total price, quantity and item name.
        let buyerName = anOrderData.buyerName;
        let buyerAddress = anOrderData.buyerAddress;
        let netTotalPrice = 0.0;
        let orderItemsDOM = [];
        let index = 0;
        for (index = 0; index < anOrderData.orderItemsInfo.length; index++) {
            console.log("Going through various items in order");
            console.log(anOrderData.orderItemsInfo[index]);
            netTotalPrice = eval(netTotalPrice + anOrderData.orderItemsInfo[index].itemTotalPrice);
            orderItemsDOM.push(
                <div style={{ width: "100%", height: "100%" }}>
                    <ListGroup.Item eventKey={index} disabled style={listGroupStyle}>
                        <h3>Name: {anOrderData.orderItemsInfo[index].itemName}</h3>
                        <Container style={{
                            maxWidth: "100%",
                            width: "100%",
                            height: "100%",
                        }}>
                            <Row>
                                <Col sm={11}>
                                    Quantity: {anOrderData.orderItemsInfo[index].itemQuantity}
                                </Col>
                                <Col sm={1}>
                                    Price:{anOrderData.orderItemsInfo[index].itemTotalPrice}
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                </div>
            );
        }

        let orderButtonDOM = [];
        let nextStatus = "Preparing";
        if (this.state.orderStatus !== "Delivered") {
            if (this.state.orderStatus === "New") {
                nextStatus = "Preparing";
            } else if (this.state.orderStatus === "Preparing") {
                nextStatus = "Ready";
            } else if (this.state.orderStatus === "Ready") {
                nextStatus = "Delivered";
            }
            orderButtonDOM.push(
                <Row>
                    <Col sm={10}>
                        <Button variant="danger" onClick={this.cancelOrder}> Cancel Order </Button>
                    </Col>
                    <Col sm={2}>
                        <Button variant="success" onClick={ (e) => {
                            this.changeOrderStatus(e, nextStatus)
                            }}>Move to {nextStatus}</Button>
                    </Col>
                </Row>
            )
        }

        return (
            <div>
                <Card bg="secondary" text="white" style={{ 
                        borderStyle: "none",
                        marginTop: '5px',
                        marginBottom: '5px',
                    }}>
                    {/* <Card.Header>Header</Card.Header> */}
                    <Card.Body>
                        <Card.Title>{buyerName}</Card.Title>
                        <Card.Text>
                            {buyerAddress}
                        </Card.Text>
                        <Card.Text>
                            {orderItemsDOM}
                        </Card.Text>
                        <Card.Text style={{
                            textAlignLast: "right",
                            paddingRight: "25px",
                        }}>
                            Total Price: {parseFloat(netTotalPrice).toFixed(2)}
                        </Card.Text>
                        <Container style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "100%"
                        }}>
                            {orderButtonDOM}
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default OrderBrief