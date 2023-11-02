exports.GET_BOARD= `
  SELECT * FROM trello.board WHERE id = $1
`

exports.GET_LIST = `
  SELECT * FROM trello.lists WHERE id = $1
`

exports.GET_CARD = `
  SELECT * FROM trello.cards WHERE id = $1
`

exports.GET_ALL_BOARDS= `
  select * from trello.board
`

exports.GET_FULL_LIST= `
  SELECT trello.list.id AS list_id, trello.list.title AS list_title, trello.card.id AS card_id, trello.card.title AS card_title
  FROM trello.list
  LEFT JOIN trello.card ON trello.list.id = trello.card.list_id
  WHERE trello.list.board_id = $1
  ORDER BY trello.list.id, trello.card.id;
`
exports.UPDTAE_CARD_TITLE= `
  UPDATE trello.card SET title = $2 WHERE id = $1 RETURNING *;
`