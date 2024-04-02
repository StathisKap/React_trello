/**
 *
 *
 * 
 */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { BoardSelectionContext } from './BoardSelection';
import List from './List';
import Card from './Card';
import * as G from '../frgs'
import * as U from '../utils'


/**
 *
 *
 * 
 */
export const BoardContext = React.createContext();


/**
 *
 *
 * 
 */
export default function Board() {
  const { selectedBoard } = useContext(BoardSelectionContext);
  const [allLists, setAllLists] = React.useState([]);
  const [CardState, setCardState] = React.useState({ id: null, isOpen: false });

  React.useEffect(() => {
    U.fetcher(G.GQL_GET_FULL_LIST, { board_id: selectedBoard })
      .then((data) => {
        const { allListsWithCards } = data;
        setAllLists(allListsWithCards);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedBoard]);

  React.useEffect(() => {
    // changeList("241", "1")
  }, [CardState]);

  return (
    <S.Board>
      <BoardContext.Provider value={{allLists, setAllLists, CardState, setCardState }}>
        <Card/>
        { allLists.map((list) => (<li key={list.id}><List key={list.id} list={list} /></li>))}
        <S.AddList onClick={() => addList(selectedBoard)} > Add a List</S.AddList>
      </BoardContext.Provider>
    </S.Board>
  );

 async function addList(id) {
   const addedList = await U.fetcher(G.GQL_ADD_LIST, { board_id: id })
   addedList.addList.cards = [];
   const updatedLists = [...allLists, addedList.addList];
   setAllLists(updatedLists);
 };



 // Change the list of a card
  async function changeList(cardId, listId) {
    const updatedCard = await U.fetcher(G.GQL_CHANGE_CARD_LIST, { id: cardId, list_id: listId })
    // const updatedCard =  { changeCardList: { "id": "241", "title": "3" }}
    const updatedLists = allLists.map((list) => {
      if (list.id === listId) {
        list.cards.push(updatedCard.changeCardList);
      }
      if (list.id === updatedCard.changeCardList.list_id) {
        list.cards = list.cards.filter((card) => card.id !== cardId);
      }
      return list;
    });
    setAllLists(updatedLists);
  };
};


/**
 *
 *
 * 
 */
const S = {}

S.Board = styled.ol`
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-grow: 1;
  gap: 20px;
  list-style: none;
  margin-top: 10px;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
`;

S.AddList= styled.button`
  background-color: rgba(155, 155, 155, 0.4); /* Adjust color as needed */
  border-radius: 12px;
  border: 2px solid;
  color: inherit;
  font-weight: 700;
  height: min-content;
  padding: 10px;
  width: 272px;
  &:hover {
    background-color: rgba(155, 155, 155, 0.6); /* Adjust color as needed */
    border: 3px solid rgba(145, 145, 145, 0.8);
  }
`;