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
        cookie1: { type: GraphQLString },
        cookie2: { type: GraphQLString },
        cookie3: { type: GraphQLString },
        cookie4: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        // profile: {
        //     type: ProfileType,
        //     args: {
        //         id: {
        //             name: "_id",
        //             type: GraphQLString
        //         }
        //     },
        //     async resolve(parent, args) {
        //         console.log('in get profile data args: ', args);
        //         var profileData = {};
        //         await UserModel.findById(args.id
        //             , (err, user) => {
        //                 if (err) {
        //                     console.log("Error while querying user info:", err);
        //                 }
        //                 else {
        //                     console.log('User details: ', user);
        //                     profileData = user;
        //                 }
        //             });

        //         return profileData;
        //     }
        // }
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
                                    buyerPassword: sha1(args.password),
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
                                var user = new UserModel({
                                    restaurantEmailId: args.restaurantEmailId,
                                    restaurantPassword: sha1(args.password),
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



    })
});





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
