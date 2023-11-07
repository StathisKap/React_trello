import React from 'react';


/**
 *
 *
 * 
 */
export const DataContext = React.createContext();


/**
 *
 *
 * 
 */
export function DataProvider({ children }) {
  const [boards, setBoards] = React.useState([1]);

  return (
    <DataContext.Provider value={{ boards }}>
      {children}
    </DataContext.Provider>
  );
}