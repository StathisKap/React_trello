export const GQL_GET_FULL_LIST = `
query allListsWithCards($board_id: ID!) {
  allListsWithCards(board_id: $board_id) {
    id
    title
    cards {
      id
      title
    }
  }
}`;

export const GQL_GET_CARD = `
query getCard($id: ID!) {
  card(id: $id) {
    id
    title
    description
  }
}
`;


export const GQL_UPDATE_CARD_TITLE = `
mutation updateCardTitle($id: ID!, $title: String!) {
  updateCardTitle(id: $id, title: $title) {
    id
    title
  }
}`;

export const GQL_UPDATE_CARD_DESCRIPTION = `
mutation updateCardDescription($id: ID!, $description: String!) {
  updateCardDescription(id: $id, description: $description) {
    id
    description
  }
}
`;

export const GQL_UPDATE_LIST_TITLE = `
mutation UpdateListTitle($id: ID!, $title: String!) {
  updateListTitle(id: $id, title: $title) {
    id
    title
  }
}`;

