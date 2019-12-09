const graphql = require('graphql');
var UserModel = require('../models/UserSchema');
var CoursesModel = require('../models/CourseSchema');
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

        updateProfile: {
            type: signupResult,
            args: {
                id: {
                    name: "_id",
                    type: GraphQLString
                },
                email: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                aboutMe: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString },
                phoneNumber: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside update profile Mutation");
                    var resultData = {
                        responseMessage: 'Profile does not exists!'
                    };
                    await UserModel.findByIdAndUpdate(args.id, {
                        $set:
                        {
                            "name": args.name,
                            "phoneNumber": parseInt(args.phoneNumber),
                            "aboutMe": args.aboutMe,
                            "company": args.company,
                            "city": args.city,
                            "country": args.country,
                            "school": args.school,
                            "hometown": args.hometown,
                            "languages": args.languages,
                            "gender": args.gender,
                        }
                    }, (err, user) => {
                        if (err) {
                            console.log("Error while querying user info:", err);
                            resultData = {
                                responseMessage: 'Error: ' + err
                            };
                            resolve(resultData);
                        }
                        else {
                            if (user) {
                                console.log('User details: ', user);
                                //let cookies = {"cookie1": user.role, "cookie2": user._id, "cookie3": user.firstname+" "+user.lastname, "cookie4": user.email };
                                resultData = {
                                    responseMessage: 'Successfully updated!'
                                };
                            }
                            resolve(resultData);
                        }
                    });


                });

            }

        },

        createcourse: {
            type: signupResult,
            args: {
                id: {
                    type: GraphQLString
                },
                name: {
                    type: GraphQLString
                },
                dept: {
                    type: GraphQLString
                },
                desc: {
                    type: GraphQLString
                },
                room: {
                    type: GraphQLString
                },
                capacity: {
                    type: GraphQLString
                },
                waitlistCapacity: {
                    type: GraphQLString
                },
                courseTerm: {
                    type: GraphQLString
                },
                faculty_id: {
                    type: GraphQLString
                },
                faculty_name: {
                    type: GraphQLString
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log("Inside create course Mutation");
                    await CoursesModel.findOne({
                        "id": args.id
                    }, (err, result) => {
                        if (err) {
                            console.log("Error while querying course info:", err);
                        }
                        else {
                            if (result) {
                                console.log('Course already Exists! Please create a new one.', result);
                                var resultData = {
                                    responseMessage: 'Course already Exists! Please create a new one.'
                                }
                                resolve(resultData);
                            }
                            else {
                                var course = new CoursesModel({
                                    id: parseInt(args.id),
                                    name: args.name,
                                    dept: args.dept,
                                    description: args.desc,
                                    room: args.room,
                                    capacity: parseInt(args.capacity),
                                    waitlistCapacity: parseInt(args.waitlistCapacity),
                                    courseTerm: args.courseTerm,
                                    faculty_id: args.faculty_id,
                                    faculty_name: args.faculty_name,
                                    currentEnrolledStudents: 0
                                });
                                console.log('Course saving..');
                                course.save().then((doc) => {
                                    console.log("Course saved successfully.", doc);
                                    console.log('EOF');
                                    var resultData = {
                                        responseMessage: 'Successfully Added!'
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
