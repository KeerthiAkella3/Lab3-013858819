import { gql } from 'apollo-boost';



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