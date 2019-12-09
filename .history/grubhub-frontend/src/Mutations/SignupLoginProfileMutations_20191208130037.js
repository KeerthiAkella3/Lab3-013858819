import { gql } from 'apollo-boost';

const buyerSignupMutation = gql`
mutation buyerSignup(
    $email: String!,
    $firstname: String!,
    $lastname: String!,
    $password: String!,
    $role: String!) {
    signup(
        email: $email,
        firstname: $firstname,
        lastname: $lastname,
        password: $password,
        role: $role) {
        responseMessage
    }
}
`;
const ownerSignupMutation = gql`
mutation ownerSignup(
    $email: String!,
    $firstname: String!,
    $lastname: String!,
    $password: String!,
    $role: String!) {
    signup(
        email: $email,
        firstname: $firstname,
        lastname: $lastname,
        password: $password,
        role: $role) {
        responseMessage
    }
}
`;

const buyerLoginMutation = gql`
mutation buyerLogin(
    $email: String!,
    $password: String!,
    $role: String!) {
    login(
        email: $email,
        password: $password,
        role: $role) {
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
    $email: String!,
    $password: String!,
    $role: String!) {
    login(
        email: $email,
        password: $password,
        role: $role) {
        isValidUser,
        cookie1,
        cookie2,
        cookie3,
        cookie4
    }
}
`;

const buyerUpdateProfilemutation = gql`
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

const ownerUpdateProfilemutation = gql`
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

export { buyerSignup, buyerLogin, buyerUpdateProfile, ownerLogin, ownerSignup, ownerUpdateProfile };