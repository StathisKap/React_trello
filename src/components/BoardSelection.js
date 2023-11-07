import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from './DataProvider';
import styled from 'styled-components';


/**
 *
 *
 * 
 */
export const BoardSelectionContext = React.createContext();


/**
 *
 *
 * 
 */
export function BoardSelection({ children }) {
  const { boards } = useContext(DataContext);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);

  useEffect(() => {
    setSelectedBoard(boards[0]);
  }, [boards]);

  console.log("selectedBoard", selectedBoard);

  return (
    <S.Selector>
      <BoardSelectionContext.Provider value={{ selectedBoard }}>
        {children}
      </BoardSelectionContext.Provider>
    </S.Selector>
  );
}


/**
 *
 *
 * 
 */
const S = {};

S.Selector = styled.div`
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0;
  width: 100%;
`;