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
        $firstname:String!,
        $lastname:String!,
        $phoneNumber:String!,
        $aboutMe:String!, 
        $company: String!,
        $city: String!,
        $country: String!,
        $school: String!,
        $hometown: String!,
        $languages: String!,
        $gender: String!
  )
  {
    updateProfile(
        id: $id,
        firstname: $firstname,
        lastname: $lastname,
        phoneNumber: $phoneNumber,
        aboutMe: $aboutMe, 
        company: $company,
        city: $city,
        country: $country,
        school: $school,
        hometown: $hometown,
        languages: $languages,
        gender: $gender
        ){
            responseMessage
        }
    }
`;

const ownerUpdateProfileMutation = gql`
mutation ownerUpdateProfile(
        $id:String!,
        $firstname:String!,
        $lastname:String!,
        $phoneNumber:String!,
        $aboutMe:String!, 
        $company: String!,
        $city: String!,
        $country: String!,
        $school: String!,
        $hometown: String!,
        $languages: String!,
        $gender: String!
  )
  {
    updateProfile(
        id: $id,
        firstname: $firstname,
        lastname: $lastname,
        phoneNumber: $phoneNumber,
        aboutMe: $aboutMe, 
        company: $company,
        city: $city,
        country: $country,
        school: $school,
        hometown: $hometown,
        languages: $languages,
        gender: $gender
        ){
            responseMessage
        }
    }
`;

export { buyerSignupMutation, buyerLoginMutation, buyerUpdateProfileMutation, ownerLoginMutation, ownerSignupMutation, ownerUpdateProfileMutation };