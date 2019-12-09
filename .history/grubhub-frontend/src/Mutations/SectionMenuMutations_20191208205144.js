import { gql } from 'apollo-boost';


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

const getMenuMutation = gql`
mututation getMenu(
    $restaurantEmailId: String!)  {
        getMenu(
            restaurantEmailId: $restaurantEmailId,
        ) {
            lists,
            cuisine
        }
    }
)
`;

export { getMenuMutation }