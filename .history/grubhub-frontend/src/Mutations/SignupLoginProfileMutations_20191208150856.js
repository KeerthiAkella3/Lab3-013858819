import { gql } from 'apollo-boost';
// buyerName: "",
// buyerEmailId: "",
// buyerPassword: "",
// buyerPhone: "",
// buyerAddress: 
const buyerSignupMutation = gql`
mutation buyerSignup(
    $buyerEmailId: String!,
    $buyerName: String!,
    $buyerAddress: String!,
    $buyerPassword: String!) {
    buyerSignup(
        buyerEmailId: $buyerEmailId,
        buyerName: $buyerName,
        buyerAddress: $buyerAddress,
        buyerPassword: $buyerPassword) {
        responseMessage
    }
}
`;
// restaurantEmailId: "",
// restaurantPassword: "",
// restaurantName: "",
// restaurantPhone: "",
// restaurantCuisine: "",
// restaurantAddress: "",
const ownerSignupMutation = gql`
mutation ownerSignup(
    $restaurantEmailId: String!,
    $restaurantName: String!,
    $restaurantCuisine: String!,
    $restaurantPassword: String!,
    $restaurantPhone: String!,
    $restaurantAddress: String!) {
    ownerSignup(
        restaurantEmailId: $restaurantEmailId,
        restaurantName: $restaurantName,
        restaurantCuisine: $restaurantCuisine,
        restaurantPassword: $restaurantPassword,
        restaurantPhone: $restaurantPhone
        restaurantAddress: $restaurantAddress) {
        responseMessage
    }
}
`;

const buyerLoginMutation = gql`
Mutation buyerLogin(
    $buyerEmailId: String!,
    $buyerPassword: String!) {
    buyerLogin(
        buyerEmailId: $buyerEmailId,
        buyerPassword: $buyerPassword,
        ) {
        isValidUser,
        cookie1,
        cookie2,
        cookie3,
        cookie4
    }
}
`;

const ownerLoginMutation = gql`
mutation ownerLogin(
    $restaurantEmailId: String!,
    $restaurantPassword: String!) {
    login(
        restaurantEmailId: $restaurantEmailId,
        restaurantPassword: $restaurantPassword) {
        isValidUser,
        cookie1,
        cookie2,
        cookie3,
        cookie4
    }
}
`;

const buyerUpdateProfileMutation = gql`
mutation buyerUpdateProfile(
        $id:String!,
        $buyerName:String!,
        $buyerPhone:String!,
        $buyerAddress:String!, 
        $buyerEmailId: String!
  )
  {
    updateProfile(
        id: $id,
        buyerName: $buyerName,
        buyerAddress: $buyerAddress,
        buyerPhone: $buyerPhone,
        buyerEmailId: $buyerEmailId
        ){
            responseMessage
        }
    }
`;

const ownerUpdateProfileMutation = gql`
mutation ownerUpdateProfile(
        $id:String!,
        $restaurantEmailId:String!,
        $restaurantName:String!,
        $restaurantPhone:String!,
        $restaurantCuisine:String!, 
        $restaurantAddress: String!
  )
  {
    updateProfile(
        id: $id,
        restaurantName: $restaurantName,
        restaurantPhone: $restaurantPhone,
        restaurantCuisine: $restaurantCuisine,
        restaurantEmailId: $restaurantEmailId, 
        restaurantAddress: $restaurantAddress
        ){
            responseMessage
        }
    }
`;

export { buyerSignupMutation, buyerLoginMutation, buyerUpdateProfileMutation, ownerLoginMutation, ownerSignupMutation, ownerUpdateProfileMutation };