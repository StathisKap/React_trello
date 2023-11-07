exports.GET_BOARD = `
  SELECT * FROM trello.board WHERE id = $1;
`

exports.GET_LIST = `
  SELECT * FROM trello.list WHERE id = $1;
`

exports.GET_CARD = `
  SELECT * FROM trello.card WHERE id = $1;
`

exports.GET_ALL_BOARDS = `
  select * from trello.board;
`

exports.GET_FULL_LIST = `
  SELECT trello.list.id AS list_id, trello.list.title AS list_title, trello.card.id AS card_id, trello.card.title AS card_title
  FROM trello.list
  LEFT JOIN trello.card ON trello.list.id = trello.card.list_id
  WHERE trello.list.board_id = $1
  ORDER BY trello.list.id, trello.card.id;
`

exports.ADD_CARD = `
  INSERT INTO trello.card (title, list_id) VALUES (null, $1) RETURNING *;
`

exports.UPDATE_CARD_TITLE = `
  UPDATE trello.card SET title = $2 WHERE id = $1 RETURNING *;
`

exports.UPDATE_CARD_DESCRIPTION = `
  UPDATE trello.card SET description = $2 WHERE id = $1 RETURNING *;
`

exports.UPDATE_LIST_TITLE = `
  UPDATE trello.list SET title = $2 WHERE id = $1 RETURNING *;
`

exports.DELETE_CARD = `
DELETE FROM trello.card WHERE id = $1 RETURNING *;
`