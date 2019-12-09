const graphql = require('graphql');
var UserModel = require('../models/UserSchema');
var RetaurantModel = require('./../models/RestaurantSchema');
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
                    await RetaurantModel.findOne({
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
                                var user = new RetaurantModel({
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
                                        responseMessage: 'owner Successfully Added!'
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
                    console.log("Inside Login Mutation");
                    var userData = {
                        isValidUser: false,
                        userId: null,
                        name: null,
                        email: null                    };
                    await RetaurantModel.findOne({
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

        login: {
            type: loggedInUserData,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                role: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside Login Mutation");
                    var userData = {
                        isValidUser: false,
                        cookie1: null,
                        cookie2: null,
                        cookie3: null,
                        cookie4: null
                    };
                    await UserModel.findOne({
                        "email": args.email,
                        "password": sha1(args.password),
                        "role": args.role
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
                                    cookie1: user.role,
                                    cookie2: user._id,
                                    cookie3: user.firstname + " " + user.lastname,
                                    cookie4: user.email
                                };
                            }
                        }
                    });

                    resolve(userData);
                });

            }

        },



    })
});





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
