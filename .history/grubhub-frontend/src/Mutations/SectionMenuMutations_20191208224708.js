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


const addMenuItemMutation = gql`
mutation addMenuItem(
        $restaurantEmailId: String!,
        $itemName: String!,
        $itemPrice: String!,
        $itemDescription: String!,
        $itemImg: String!,
        $sectionName: String!,
    ) {
        statusCode,
    }
`;


export { getMenuMutation }