/**
 *
 *
 * 
 */
import React from 'react';
import styled from 'styled-components';
import { DataContext } from '../app/DataProvider';
import Card from './Card';
import List from './List';


/**
 *
 *
 * 
 */
export const CardContext = React.createContext();

/**
 *
 *
 * 
 */
export default function Board() {
  const { datalists, setDataLists } = React.useContext(DataContext)
  const [isCardOpen, setIsCardOpen] = React.useState({id: null, isOpen: false})
  return (
    <S.Board>
      <CardContext.Provider value={{isCardOpen, setIsCardOpen}}>
        <Card/>
        {datalists.map((list) => (<li key={list.id}><List list={list} /></li>))}
      </CardContext.Provider>
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
  margin: auto;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
`;