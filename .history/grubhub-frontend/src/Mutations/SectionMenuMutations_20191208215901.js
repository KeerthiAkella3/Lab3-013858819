import { gql } from 'apollo-boost';

const getMenuMutation = gql`
mutation getMenu(
    $restaurantEmailId: String!
    )
    {
        getMenu(
            restaurantEmailId: $restaurantEmailId,
        ) {
            lists,
            cuisine,
        }
    }
`;

export { getMenuMutation }