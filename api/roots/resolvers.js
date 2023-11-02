const { Pool } = require('pg');
const pool = new Pool({ connectionString: "postgres://postgres:WNe4lFMJTx@pg.mlx.institute:5432/stathis" });
const q = require('../queries/queries');


module.exports = {
  board: async ({ id }) => {
    const result = await pool.query(q.GET_BOARD, [id]);
    return result.rows[0];
  },
  list: async ({ id }) => {
    const result = await pool.query(q.get_list, [id]);
    return result.rows[0];
  },
  card: async ({ id }) => {
    const result = await pool.query(q.GET_CARD, [id]);
    return result.rows[0];
  },
  allBoards: async () => {
    const result = await pool.query(q.GET_ALL_BOARDS);
    return result.rows;
  },

  allListsWithCards: async ({ board_id }) => {
    const result = await pool.query(q.GET_FULL_LIST, [board_id]);
    const listsMap = {};

    result.rows.forEach(row => {
      if (!listsMap[row.list_id]) {
        listsMap[row.list_id] = {
          id: row.list_id,
          title: row.list_title,
          board_id: board_id,
          cards: []
        };
      }

      if (row.card_id) {
        listsMap[row.list_id].cards.push({
          id: row.card_id,
          title: row.card_title,
          list_id: row.list_id
        });
      }
    });

    return Object.values(listsMap);
  },

  updateCardTitle: async ({ id, title }) => {
    const result = await pool.query(q.UPDATE_CARD_TITLE, [id, title]);
    return result.rows[0];
  },

  updateCardDescription: async ({ id, description}) => {
    const result = await pool.query(q.UPDATE_CARD_DESCRIPTION, [id, description]);
    return result.rows[0];
  },
  
  updateListTitle: async ({ id, title }) => {
    const result = await pool.query(q.UPDATE_LIST_TITLE, [id, title]);
    return result.rows[0];
  }
};