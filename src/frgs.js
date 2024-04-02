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

export const GQL_ADD_LIST = `
mutation addList($board_id: ID!) {
  addList(board_id: $board_id) {
    id
    title
  }
}`;

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

export const GQL_DELETE_LIST= `
mutation deleteList($id: ID!) {
  deleteList(id: $id) {
    id
    title
  }
}`;

export const GQL_DELETE_CARDS_BY_LIST_ID= `
mutation deleteCardsByListId($list_id: ID!) {
  deleteCardsByListId(list_id: $list_id) {
    id
  }
}`;

export const GQL_CHANGE_CARD_LIST = `
mutation changeCardList($id: ID!, $list_id: ID!) {
  changeCardList(id: $id, list_id: $list_id) {
    id
    title
  }
}`;