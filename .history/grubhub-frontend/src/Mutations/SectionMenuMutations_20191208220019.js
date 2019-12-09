import { gql } from 'apollo-boost';

const getMenuMutation = gql`
mutation getMenu(
    $restaurantEmailId: String!
    )
    {
        getMenu(
            restaurantEmailId: $restaurantEmailId,
        ) {
            lists {
                sectionName,
                items {
                    itemName,
                    itemImg,
                    itemDescription,
                    itemPrice,
                }
            }
            cuisine,
        }
    }
`;

export { getMenuMutation }