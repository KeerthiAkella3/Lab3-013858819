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
        lists: { type: GraphQLString },
        cuisine: { type: GraphQLString }
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
                                        responseMessage: 'Owner Successfully Added!',
                                        isUpdate: true
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
                                UserModel.findOneAndUpdate({ "buyerEmailId": args.buyerEmailId },
                                    {
                                        $set: {
                                            buyerName: args.buyerName,
                                            buyerPhone: args.buyerPhone,
                                            buyerAddress: args.buyerAddress,
                                        }
                                    });
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

            // This is for menu
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
                                        resolve(resultData);
                                    });
                                }
                            }
                        });
                    });
                },
            }
    )}
});

    
    
    
        
