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

  console.log("selectedBoard", selectedBoard);

  React.useEffect(() => {
    U.fetcher(G.GQL_GET_FULL_LIST, { board_id: selectedBoard })
      .then((data) => {
        const { allListsWithCards } = data;
        console.log("allListsWithCards ", allListsWithCards);
        setAllLists(allListsWithCards);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedBoard]);

  return (
    <S.Board>
      <BoardContext.Provider value={{allLists, setAllLists, CardState, setCardState }}>
        <Card/>
        { allLists.map((list) => (<li key={list.id}><List key={list.id} list={list} /></li>))}
      </BoardContext.Provider>
    </S.Board>
  );
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