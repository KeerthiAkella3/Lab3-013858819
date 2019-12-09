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
mutation buyerLogin(
    $buyerEmailId: String!,
    $buyerPassword: String!) {
    buyerLogin(
        buyerEmailId: $buyerEmailId,
        buyerPassword: $buyerPassword,
        ) {
        isValidUser,
        userId,
        name,
        email
    }
}
`;

const ownerLoginMutation = gql`
mutation ownerLogin(
    $restaurantEmailId: String!,
    $restaurantPassword: String!) {
    ownerLogin(
        restaurantEmailId: $restaurantEmailId,
        restaurantPassword: $restaurantPassword) {
        isValidUser,
        userId,
        name,
        email

    }
}
`;

const buyerUpdateProfileMutation = gql`
mutation buyerUpdateProfile(
        $buyerEmailId:String!,
        $buyerName:String!,
        $buyerPhone:String!,
        $buyerAddress:String!
  )
  {
    buyerUpdateProfile(
        buyerEmailId: $buyerEmailId,
        buyerName: $buyerName,
        buyerAddress: $buyerAddress,
        buyerPhone: $buyerPhone
        ){
            responseMessage
        }
    }
`;

const ownerUpdateProfileMutation = gql`
mutation ownerUpdateProfile(
        $id:String!
        $restaurantName:String!,
        $restaurantPhone:String!,
        $restaurantCuisine:String!, 
        $restaurantAddress: String!
  )
  {
    ownerUpdateProfile(
        id: $id,
        restaurantName: $restaurantName,
        restaurantPhone: $restaurantPhone,
        restaurantCuisine: $restaurantCuisine,
        restaurantAddress: $restaurantAddress
        ){
            responseMessage
        }
    }
`;

export { buyerSignupMutation, buyerLoginMutation, buyerUpdateProfileMutation, ownerLoginMutation, ownerSignupMutation, ownerUpdateProfileMutation }