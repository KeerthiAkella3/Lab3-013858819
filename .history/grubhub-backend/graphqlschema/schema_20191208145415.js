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

     

    })
});





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
