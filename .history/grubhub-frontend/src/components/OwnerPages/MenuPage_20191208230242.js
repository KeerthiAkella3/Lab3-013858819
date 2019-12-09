import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import OwnerMenuItemCard from './OwnerMenuItemCard';
import { CardDeck } from 'reactstrap';
import MenuItemAddModal from './MenuItemAddModal';
import cookie from 'react-cookies';
import MenuSectionAddModal from './MenuSectionAddModal';

import { graphql } from "react-apollo";
import { getMenuMutation, addMenuItemMutation, addSectionMutation } from '../../Mutations/SectionMenuMutations.js';


export class MenuPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sections: [],
            items: [],
            restaurantDetails: {},
            restaurantId: 1,
            showMenuItemAddModal: false,
            showMenuSectionAddModal: false,
            itemAddModalSection: "",
        }

        /** Section Update Handlers */
        this.deleteSectionButtonHandler = this.deleteSectionButtonHandler.bind(this);
        this.addSectionButtonHandler = this.addSectionButtonHandler.bind(this);

        /** Item Update Handlers */
        this.addItemsButtonHandler = this.addItemsButtonHandler.bind(this);
        this.deleteItemButtonHandler = this.deleteItemButtonHandler.bind(this);

        /** Section Modal Handlers */
        this.closeSectionAddModal = this.closeSectionAddModal.bind(this);
        this.saveSectionAddModal = this.saveSectionAddModal.bind(this);

        /** Menu Item Add Handlers */
        this.closeMenuItemAddModal = this.closeMenuItemAddModal.bind(this);
        this.saveMenuItemAddModal = this.saveMenuItemAddModal.bind(this);
    }

    componentWillMount = () => {
        let restaurantId = cookie.load('cookie2');
        let menu = [];
        let sections = [];
        let restaurantDetails = {};
        var restaurantEmailId = localStorage.getItem('email')
        var data = {
            restaurantEmailId
        }
        console.log("Getting details of restaurant with ID: " + restaurantEmailId);
        this.props.mutate({ variables: data })
            .then(response => {
                console.log("response from grapQL for getMenu")
                console.log(response);
                let sections = response.data.getMenu.lists;
                this.setState({
                    restaurantId: localStorage.getItem('userId'),
                    restaurantDetails: restaurantDetails,
                    sections: sections,
                })
            }).catch(error => {
                console.log(error);
            });
    }

    addSectionButtonHandler = () => {
        this.setState({
            showMenuSectionAddModal: true,
        })
    }

    deleteSectionButtonHandler = (e, sectionName) => {
        console.log("Deleting Menu Section");
        let menu = [];
        let sections = [];
        let items = this.state.items;
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            let anItem = items[itemIndex];
            if (anItem.itemSection === sectionName) {
                axios.delete('http://localhost:3001/restaurantMenu', {
                    params: {
                        menuItemId: anItem.itemId,
                    }
                }).then(response => {
                    console.log("Response on delete menu Item details: ");
                    console.log(response.data.responseMessage);
                    if (response.status === 200) {
                        console.log("Successfully deleted menu Item");
                    } else {
                        console.log("Status Code: ", response.status);
                        console.log(response.data.responseMessage);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }

        let restaurantId = this.state.restaurantId;
        axios.delete('http://localhost:3001/restaurantSection', {
            params: {
                restaurantId: restaurantId,
                sectionName: sectionName,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('section got successfully deleted');
                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }

                // refresh state with existing items
                axios.get('http://localhost:3001/menu', {
                    params: {
                        restaurantId: restaurantId
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            console.log('response from DB: ');
                            console.log(response.data);
                            menu.push(...response.data.menu);
                            sections.push(...response.data.sections);
                        } else {
                            console.log("Status Code: ", response.status);
                            console.log(response.data.responseMessage);
                        }
                        this.setState({
                            items: menu,
                            sections: sections,
                        })
                    }).catch(error => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error);
            });
    }

    addItemsButtonHandler = (e, sectionName) => {
        this.setState({
            showMenuItemAddModal: true,
            itemAddModalSection: sectionName
        })
    }

    deleteItemButtonHandler = (e, itemId) => {
        // update state with now available items in menu
        console.log("Handling deletion of menu item");
        // delete entry of this item from menu
        e.preventDefault();
        
        let menu = [];
        let sections = [];
        axios.defaults.withCredentials = true;
        axios.delete('http://localhost:3001/restaurantMenu', {
            params: {
                menuItemId: itemId,
            }
        }).then(response => {
            console.log("Response on delete menu Item details: ");
            console.log(response.data.responseMessage);
            if (response.status === 200) {
                console.log("Successfully deleted menu Item");
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }

            let restaurantId = this.props.restaurantId;
            console.log("Getting details of restaurant with ID: " + restaurantId);
            axios.defaults.withCredentials = true;

            // refresh state with existing items
            axios.get('http://localhost:3001/menu', {
                params: {
                    restaurantId: restaurantId
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('response from DB: ');
                        console.log(response.data);
                        menu.push(...response.data.menu);
                        sections.push(...response.data.sections);
                    } else {
                        console.log("Status Code: ", response.status);
                        console.log(response.data.responseMessage);
                    }
                    this.setState({
                        items: menu,
                        sections: sections,
                    })
                }).catch(error => {
                    console.log(error);
                });

        }).catch(error => {
            console.log(error);
        });
    }

    closeSectionAddModal = () => {
        this.setState({
            showMenuSectionAddModal: false,
        })
    }

    saveSectionAddModal = (sectionName) => {
        console.log("Adding section after sectionAdd Modal is closed: ");
        var restaurantEmailId = localStorage.getItem('email')
        var data = {
            restaurantEmailId: restaurantEmailId,
            sectionName: sectionName,
        }
        console.log("Getting details of restaurant with ID: " + restaurantEmailId);
        this.props.mutate({ variables: data })
            .then(response => {
                console.log("response from grapQL for getMenu")
                console.log(response);
                console.log("Successfully added the section");
                this.setState({
                    sections: this.state.sections.concat(sectionName),
                    showMenuSectionAddModal: false,
                })
            }).catch(error => {
                console.log(error);
            });
    }

    closeMenuItemAddModal = () => {
        this.setState({
            showMenuItemAddModal: false,
        })
    }

    saveMenuItemAddModal = (addItemState) => {
        console.log("Adding section after menuItem Modal is closed: ");
        var restaurantEmailId = localStorage.getItem('email')
        var data = {
            restaurantEmailId: restaurantEmailId,
            itemName: addItemState.itemName,
            itemPrice: addItemState.itemDesc,
            itemDescription: addItemState.itemImage,
            itemPrice: addItemState.itemPrice,
            itemImg: addItemState.itemSection,
        }
        console.log("Getting details of restaurant with ID: " + restaurantEmailId);
        this.props.mutate({ variables: data })
            .then(response => {
                console.log("response from grapQL for getMenu")
                console.log(response);
                console.log("Successfully added the section");
                this.setState({
                    sections: this.state.sections.concat(sectionName),
                    showMenuItemAddModal: false,
                })
            }).catch(error => {
                console.log(error);
            });

        console.log("Getting details of restaurant with ID: " + restaurantEmailId);
        this.props.mutate({ variables: data })
            .then(response => {
                console.log("response from grapQL for getMenu")
                console.log(response);
                let sections = response.data.getMenu.lists;
                this.setState({
                    restaurantId: localStorage.getItem('userId'),
                    restaurantDetails: restaurantDetails,
                    sections: sections,
                })
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        let MenuSectionsDOM = [];
        let index = 0;
        let sections = this.state.sections;
        let allItems = this.state.items;
        console.log('printing state of menu-page')
        console.log(this.state);
        // Go through appetizers first
        while (index < sections.length) {
            /**
             * For each section
             * find all items that match this sectionName
             * add those items under this section
             * add "add items" button at the end
             * add "delete section" button at the end
             */
            let sectionName = sections[index];
            let sectionData = [];
            for (let index = 0; index < allItems.length;) {
                let threeMenuItemsDOM = [];
                for (let curColumn = 0; curColumn < 3 && index < allItems.length; curColumn++ , index++) {
                    let anItem = allItems[index];
                    if (anItem.itemSection === sectionName) {
                        console.log("creating cards for " + anItem.itemName)
                        threeMenuItemsDOM.push(
                            <OwnerMenuItemCard
                                itemName={anItem.itemName}
                                itemPrice={anItem.itemPrice}
                                itemId={anItem.itemId}
                                itemSection={anItem.itemSection}
                                itemImage={anItem.itemImage}
                                deleteItemButtonHandler={this.deleteItemButtonHandler}
                            />
                        );
                    }
                }
                if (threeMenuItemsDOM.length > 0) {
                    sectionData.push(
                        <Row style={{
                            width: "inehrit",
                            height: "inherit",
                            marginLeft: "5px",
                        }}>
                            <CardDeck style={{
                                flexFlow: 'wrap',
                                width: '420px',
                                height: '200px',
                                flexDirection: 'column',
                                flexBasis: "auto",
                            }}>
                                {threeMenuItemsDOM}
                            </CardDeck>
                        </Row>
                    );
                }
            }

            // TODO: Add "Add Items Button"
            sectionData.push(
                <Button variant="success" size="sm" onClick={(e) => {
                    this.addItemsButtonHandler(e, sectionName)
                }}
                    style={{
                        width: "250px",
                        fontSize: "20px",
                        marginLeft: '5px',
                        marginTop: '40px',
                        // paddingTop: '15px'
                    }}>Add Items to {sectionName} </Button>

            )
            MenuSectionsDOM.push(
                <Row style={{
                    marginTop: '5px',
                    marginBottom: '40px',
                    boxShadow: "0 0 0 1px rgba(67,41,163,.08), 0 1px 5px 0 rgba(67,41,163,.08)",
                    borderRadius: "3px",
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        paddingBottom: '5px',
                        marginTop: '10px'
                    }}>
                        <Container style={{
                            maxWidth: "100%"
                        }}>
                            <Row style={{
                                width: "100%",
                            }}>
                                <Col sm={10}>
                                    <h1 style={{
                                        fontSize: "30px",
                                        height: "40px"
                                    }}>{sectionName}</h1>
                                </Col>
                                <Col sm={2}>
                                    <Button variant="danger" onClick={(e) => {
                                        this.deleteSectionButtonHandler(e, sectionName)
                                    }} style={{
                                        width: "175px",
                                        fontSize: "20px",
                                    }}>Delete Section</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        paddingBottom: '20px',
                    }}>
                        {sectionData}
                    </div>
                </Row>
            );
            index = index + 1;
        }

        let addSectionDOM = [];
        addSectionDOM.push(
            <div style={{
                width: "100%",
                height: "100%",
                paddingBottom: '5px',
                marginTop: '10px'
            }}>
                <Container style={{
                    maxWidth: "100%"
                }}>
                    <Row style={{
                        width: "100%",
                    }}>
                        <Col sm={5}></Col>
                        <Col sm={2}>
                            <Button variant="success" onClick={(e) => {
                                this.addSectionButtonHandler()
                            }} style={{
                                width: "175px",
                                fontSize: "20px",
                            }}>Add Section</Button></Col>
                        <Col sm={5}></Col>

                    </Row>
                </Container>
            </div>
        );
        let MenuItemAddModalDOM = [];
        if (this.state.showMenuItemAddModal) {
            MenuItemAddModalDOM = <MenuItemAddModal
                onClose={this.closeMenuItemAddModal}
                onSave={this.saveMenuItemAddModal}
                sectionName={this.state.itemAddModalSection}
            />;
        }

        let MenuSectionAddModalDOM = [];
        if (this.state.showMenuSectionAddModal) {
            MenuSectionAddModalDOM = <MenuSectionAddModal
                onClose={this.closeSectionAddModal}
                onSave={this.saveSectionAddModal}
            />;
        }

        return (
            <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "inherit",
            }}>
                {/* <p>THIS IS MENU PAGE</p>  */}
                <Container style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                }}>
                    {MenuSectionsDOM}
                    {addSectionDOM}
                    {MenuItemAddModalDOM}
                    {MenuSectionAddModalDOM}
                </Container>
            </div>
        )
    }
}


MenuPage = graphql (getMenuMutation) (MenuPage)
MenuPage = graphql (addSectionMutation) (MenuPage)
MenuPage = graphql (addMenuItemMutation) (MenuPage)
export default MenuPage 