import React from 'react';
import * as U from '../utils';
import * as G from '../frgs';


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
  const [_, setData] = React.useState(null);
  const [datalists, setDataLists] = React.useState([]);

  React.useEffect(() => {
    U.fetcher(G.GQL_GET_FULL_LIST, {board_id: 1}).then(fetchedData => {
      setData(fetchedData);
      setDataLists(fetchedData.allListsWithCards); 
    });
  }, [G.GQL_GET_FULL_LIST]);

  const updateDataLists = (newDataLists) => {
    setDataLists(newDataLists);
  };

  return (
    <DataContext.Provider value={{ datalists, updateDataLists }}>
      {children}
    </DataContext.Provider>
  );
}