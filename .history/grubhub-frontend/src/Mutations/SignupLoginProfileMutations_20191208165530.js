import { gql } from 'apollo-boost';

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