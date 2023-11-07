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
    list_id
  }
}
`;

export const GQL_ADD_CARD = `
mutation addCard($list_id: ID!) {
  addCard(list_id: $list_id) {
    id
    title
  }
}`;

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



export const GQL_DELETE_CARD = `
mutation deleteCard($id: ID!) {
  deleteCard(id: $id) {
    id
    title
  }
}`;