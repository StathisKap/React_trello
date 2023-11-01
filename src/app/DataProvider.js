/**
 *
 *
 * 
 */
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
  const [datalists, setDataLists] = React.useState([
    {id: 0, title: 'test 1', cards: [{id: 0, title: 'something'}, {id: 1, title: 'something else'}]},
    {id: 1, title: 'test 2', cards: [{id: 2, title: 'something'}, {id: 3, title: 'something else'}]},
  ]);

  const updateDataLists = (newDataLists) => {
    setDataLists(newDataLists);
  };

  return (
    <DataContext.Provider value={{ datalists, updateDataLists }}>
      {children}
    </DataContext.Provider>
  );
}