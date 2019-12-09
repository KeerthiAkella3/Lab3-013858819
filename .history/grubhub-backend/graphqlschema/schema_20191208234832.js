const graphql = require('graphql');
var UserModel = require('../models/UserSchema');
var RestaurantModel = require('./../models/RestaurantSchema');
const sha1 = require('sha1');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;

const itemType = new GraphQLObjectType({
    name: 'itemType',
    fields: () => ({
        itemName: {type: GraphQLString},
        itemDescription: {type: GraphQLString},
        itemPrice: {type: GraphQLString},
        itemImg: {type: GraphQLString},
    })
})

const sectionType = new GraphQLObjectType({
    name: 'sectionType',
    fields : () =>  ({
        sectionName: { type: GraphQLString },
        items: { type: new GraphQLList(itemType) },
    })
})

const buyerSignupResult = new GraphQLObjectType({
    name: 'buyerSignupResult',
    fields: () => ({
        responseMessage: { type: GraphQLString }
    })
});

const getMenuResult = new GraphQLObjectType({
    name: 'getMenuResult',
    fields: () => ({
        responseMessage: { type: GraphQLString },
        lists:{ type: new GraphQLList(sectionType)},
        cuisine:{ type: GraphQLString }     
    })
});

const addMenuItemResult = new GraphQLObjectType({
    name: 'addMenuItemResult',
    fields: () => ({
        status: { type: GraphQLString},
    })
})

const addSectionResult = new GraphQLObjectType({
    name: 'addSectionResult',
    fields: () => ({
        status: { type: GraphQLString},
    })
})

const buyerUpdateResult = new GraphQLObjectType({
    name: 'buyerUpdateResult',
    fields: () => ({
        responseMessage: { type: GraphQLString },
        isUpdate: { type: GraphQLString }
    })
});

const ownerUpdateResult = new GraphQLObjectType({
    name: 'ownerUpdateResult',
    fields: () => ({
        responseMessage: { type: GraphQLString }
    })
});

const ownerSignupResult = new GraphQLObjectType({
    name: 'ownerSignupResult',
    fields: () => ({
        responseMessage: { type: GraphQLString }
    })
});

const loggedInUserData = new GraphQLObjectType({
    name: 'loggedInUserData',
    fields: () => ({
        isValidUser: { type: GraphQLBoolean },
        userId: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});
const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        firstname: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        },
        img: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        aboutMe: {
            type: GraphQLString
        },
        company: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        school: {
            type: GraphQLString
        },
        hometown: {
            type: GraphQLString
        },
        languages: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        profile: {
            type: ProfileType,
            args: {
                id: {
                    name: "_id",
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('in get profile data args: ', args);
                var profileData = {};
                await UserModel.findById(args.id
                    , (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            console.log('User details: ', user);
                            profileData = user;
                        }
                    });

                return profileData;
            }
        }
    })
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({

        buyerSignup: {
            type: buyerSignupResult,
            args: {
                buyerName: {
                    type: GraphQLString
                },
                buyerEmailId: {
                    type: GraphQLString
                },
                buyerPhone: {
                    type: GraphQLString
                },
                buyerPassword: {
                    type: GraphQLString
                },
                buyerAddress: {
                    type: GraphQLString
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside BuyerSignup Mutation");
                    await UserModel.findOne({
                        "buyerEmailId": args.buyerEmailId
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                var resultData = {
                                    responseMessage: 'User Already exists!'
                                }
                                resolve(resultData);
                            }
                            else {
                                var user = new UserModel({
                                    buyerEmailId: args.buyerEmailId,
                                    buyerPassword: sha1(args.buyerPassword),
                                    buyerName: args.buyerName,
                                    buyerPhone: args.buyerPhone,
                                    buyerAddress: args.buyerAddress,
                                });
                                console.log('Buyer saving..');
                                user.save().then((doc) => {
                                    console.log("Buyer saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Buyer Successfully Added!'
                                    }
                                    resolve(resultData);
                                });

                            }

                        }
                    });
                });
            }
        },

        ownerSignup: {
            type: ownerSignupResult,
            args: {
                restaurantName: {
                    type: GraphQLString
                },
                restaurantEmailId: {
                    type: GraphQLString
                },
                restaurantPhone: {
                    type: GraphQLString
                },
                restaurantPassword: {
                    type: GraphQLString
                },
                restaurantAddress: {
                    type: GraphQLString
                },
                restaurantCuisine: {
                    type: GraphQLString
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside BuyerSignup Mutation");
                    await RestaurantModel.findOne({
                        "restaurantEmailId": args.restaurantEmailId
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                var resultData = {
                                    responseMessage: 'User Already exists!'
                                }
                                resolve(resultData);
                            }
                            else {
                                var user = new RestaurantModel({
                                    restaurantEmailId: args.restaurantEmailId,
                                    restaurantPassword: sha1(args.restaurantPassword),
                                    restaurantName: args.restaurantName,
                                    restaurantPhone: args.restaurantPhone,
                                    restaurantAddress: args.restaurantAddress,
                                    restaurantCuisine: args.restaurantCuisine,
                                });
                                console.log('owner saving..');
                                user.save().then((doc) => {
                                    console.log("owner saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Owner Successfully Added!'
                                    }
                                    resolve(resultData);
                                });

                            }

                        }
                    });
                });
            }
        },




        ownerLogin: {
            type: loggedInUserData,
            args: {
                restaurantEmailId: {
                    type: GraphQLString
                },
                restaurantPassword: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside  owner Login Mutation");
                    var userData = {
                        isValidUser: false,
                        userId: null,
                        name: null,
                        email: null
                    };
                    await RestaurantModel.findOne({
                        "restaurantEmailId": args.restaurantEmailId,
                        "restaurantPassword": sha1(args.restaurantPassword)
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User details: ', user);
                                //let cookies = {"cookie1": user.role, "cookie2": user._id, "cookie3": user.firstname+" "+user.lastname, "cookie4": user.email };
                                userData = {
                                    isValidUser: true,
                                    userId: user._id,
                                    name: user.restaurantName,
                                    email: user.restaurantEmailId
                                };
                            }
                        }
                    });

                    resolve(userData);
                });

            }

        },

        buyerLogin: {
            type: loggedInUserData,
            args: {
                buyerEmailId: {
                    type: GraphQLString
                },
                buyerPassword: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside buyer Login Mutation");
                    var userData = {
                        isValidUser: false,
                        userId: null,
                        name: null,
                        email: null
                    };
                    await UserModel.findOne({
                        "buyerEmailId": args.buyerEmailId,
                        "buyerPassword": sha1(args.buyerPassword)
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying buyer info:", err);
                        }
                        else {
                            if (user) {
                                console.log('User details: ', user);
                                //let cookies = {"cookie1": user.role, "cookie2": user._id, "cookie3": user.firstname+" "+user.lastname, "cookie4": user.email };
                                userData = {
                                    isValidUser: true,
                                    userId: user._id,
                                    name: user.buyerName,
                                    email: user.buyerEmailId
                                };
                            }
                        }
                    });

                    resolve(userData);
                });

            }

        },


        ownerUpdateProfile: {
            type: ownerUpdateResult,
            args: {
                restaurantName: {
                    type: GraphQLString
                },
                restaurantEmailId: {
                    type: GraphQLString
                },
                restaurantPhone: {
                    type: GraphQLString
                },
                restaurantAddress: {
                    type: GraphQLString
                },
                restaurantCuisine: {
                    type: GraphQLString
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside owner update Mutation");
                    await RestaurantModel.findOne({
                        "restaurantEmailId": args.restaurantEmailId
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                var user = new RestaurantModel({
                                    restaurantName: args.restaurantName,
                                    restaurantPhone: args.restaurantPhone,
                                    restaurantAddress: args.restaurantAddress,
                                    restaurantCuisine: args.restaurantCuisine,
                                });
                                console.log('owner saving..');
                                user.save().then((doc) => {
                                    console.log("owner saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        status: 200,
                                    }
                                    resolve(resultData);
                                });
                            }
                        }
                    });
                });
            }
        },

        buyerUpdateProfile: {
            type: buyerUpdateResult,
            args: {
                buyerName: {
                    type: GraphQLString
                },
                buyerEmailId: {
                    type: GraphQLString
                },
                buyerPhone: {
                    type: GraphQLString
                },
                buyerAddress: {
                    type: GraphQLString
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside buyer update Mutation");
                    await UserModel.findOne({
                        "buyerEmailId": args.buyerEmailId
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                        }
                        else {
                            if (user) {
                                UserModel.findOneAndUpdate ({"buyerEmailId": args.buyerEmailId},
                                {$set:{
                                    buyerName: args.buyerName,
                                    buyerPhone: args.buyerPhone,
                                    buyerAddress: args.buyerAddress,
                                }});
                                console.log('Buyer saving..');
                                user.save().then((doc) => {
                                    console.log("Buyer saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Buyer Successfully Updated!',
                                        isUpdate: true
                                    }
                                    resolve(resultData);
                                });

                            }

                        }
                    });
                });
            },


        },

        addMenuItem: {
            type: addMenuItemResult,
            args: {
                restaurantEmailId: {
                    type: GraphQLString
                },
                sectionName: {
                    type: GraphQLString
                },
                itemName: {
                    type: GraphQLString
                },
                itemImg: {
                    type: GraphQLString
                },
                itemDescription: {
                    type: GraphQLString
                },
                itemPrice: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Adding menu Item");
                    await Restaurant.findOne({ restaurantEmailId: args.restaurantEmailId}, function (err, restaurant) {
                        console.log("okayyyyy")
                        if (restaurant) {
                          var item = {
                            "itemName": args.itemName,
                            "itemDescription": args.itemDescription,
                            "itemImg": args.itemImg,
                            "itemPrice": args.itemPrice,
                          }
                    
                          let sectionIndex = 0;
                          let sectionsList = restaurant.sections;
                          for (sectionIndex = 0; sectionIndex < sectionsList.length; sectionIndex++) {
                              let aSection = sectionsList[sectionIndex];
                              console.log(aSection)
                              console.log(aSection.items.length)
                              if (aSection.sectionName === args.sectionName) {
                                if (aSection.items === undefined || aSection.items.length === 0|| aSection.items === null || aSection.items === {} || aSection.items.length === undefined) {
                                  aSection.items = [];
                                } 
                                let items = aSection.items;
                                console.log(items);
                                items.push(item);
                              }
                          }
                          restaurant.markModified("sections");
                          var resultData = {
                              status: "200",
                            }
                            resolve(resultData);
                        }
                        else {
                          console.log(err);
                          console.log("item not added db err")
                        }
                      })
                    })
            },
        },

        addSection: {
            type: addSectionResult,
            args: {
                restaurantEmailId: {
                    type: GraphQLString
                },
                sectionName: {
                    type: GraphQLString
                },
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Adding menu Item");
                    await Restaurant.findOne({ _id: msg.restaurantId }, function (err, restaurant) {
                        if (restaurant) {
                            var section = {
                                "sectionName": msg.sectionName,
                                "items": {}
                            }
                            restaurant.sections.push(section)
                            restaurant.save()
                            if (err) {
                                console.log("unable to insert section into database", err);
                                let resultData = {
                                    status: "200",
                                }
                                resolve(resultData);
                            } else {
                                console.log("section added Successful");
                                let resultData = {
                                    status: "500",
                                }
                                resolve(resultData);
                            }
                        }
                        else {
                        console.log(err);
                        console.log("section not added")
                        }
                    })
                })
            },
        },


        getMenu: {
            type: getMenuResult,
            args: {
                restaurantEmailId: {
                    type: GraphQLString
                },
            }, 
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside get menu restaurants model");
                    await RestaurantModel.findOne({
                        "restaurantEmailId": args.restaurantEmailId
                    }, (err, result) => {
                        if (err) {
                            console.log("Error while querying menu info:", err);
                        }
                        else {
                            if (result) {
                                RestaurantModel.findOne({ "restaurantEmailId": args.restaurantEmailId });
                                console.log('Buyer saving..');
                                result.save().then((doc) => {
                                    console.log("Buyer saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Menu Successfully Updated!',
                                        lists: result.sections,
                                        cuisine: result.cuisine,

                                    }
                                    console.log(resultData);
                                    resolve(resultData);
                                });
                            }
                        }
                    });
                }); 
            },
        },


        





    })
});






module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});