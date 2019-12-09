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

const addSectionMutation = gql `
mutation addSection(
    $restaurantEmailId: String!,
    $sectionName: String!,
) addSection(
        restaurantEmailId: restaurantEmailId,
        sectionName: sectionName,
    )
    {
        status,
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
    ) addMenuItem(
            restaurantEmailId: restaurantEmailId,
            itemName: itemName,
            itemPrice: itemPrice,
            itemDescription: itemDescription,
            itemImg: itemImg,
            sectionName: sectionName,
        )
        {
            status,
        }
`;


export { getMenuMutation }
export {addSectionMutation}
export {addMenuItemMutation}