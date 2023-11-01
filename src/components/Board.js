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
      <S.Board onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {datalists.map((list) => (<li key={list.id}><List list={list} /></li>))}
      </S.Board>
  );

  function handleDragOver(e){
    e.preventDefault();
    console.log("over");
  }

  function handleOnDrop(e){
    const { listID, newID } = e.dataTransfer.getData("ids");
    console.log('listId', listID);
    swapLists(listID, newID)
  }

  function swapLists(id1, id2) {
    // Find indices of the lists with the given ids
    const index1 = datalists.findIndex(list => list.id === id1);
    const index2 = datalists.findIndex(list => list.id === id2);
  
    // If both ids are found, proceed with the swap
    if (index1 !== -1 && index2 !== -1) {
      // Create a shallow copy of the datalists array
      const newDatalists = datalists.slice();
  
      // Swap the lists at the found indices
      [newDatalists[index1], newDatalists[index2]] = [newDatalists[index2], newDatalists[index1]];
  
      // Update state with the new array
      setDataLists(newDatalists);
    } else {
      console.error('One or both ids not found');
    }
  }

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
  height: 100%;
`;