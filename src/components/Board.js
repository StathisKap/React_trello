/**
 *
 *
 * 
 */
import React from 'react';
import styled from 'styled-components';
import { DataContext } from '../app/DataProvider';
import List from './List';


/**
 *
 *
 * 
 */
export default function Board() {
  const { datalists, setDataLists } = React.useContext(DataContext)
  return (
    <S.Board>
      {datalists.map((list) => (<li key={list.id}><List list={list} /></li>))}
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
  margin: auto;
  padding: 10px;
  gap: 20px;
  display: flex;
  list-style: none;
  width: 100%;
  flex-grow: 1;  // Allow the component to take up available space
  overflow-y: auto;  // Enable scrolling within the component if needed
`;