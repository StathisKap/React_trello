import React from 'react';
import * as U from '..//utils';


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
  const [data, setData] = React.useState(null);
  const [datalists, setDataLists] = React.useState([]);

  const query = `
    {
      allListsWithCards (board_id: 1) {
        id
        title
        cards {
          id
          title
        }
      }
    }`;

  React.useEffect(() => {
    // Fetch data and set it to component state
    U.fetchData(query).then(fetchedData => {
      setData(fetchedData);
      setDataLists(fetchedData.allListsWithCards);  // Update datalists with fetched data
    });
  }, [query]);

  const updateDataLists = (newDataLists) => {
    setDataLists(newDataLists);
  };

  return (
    <DataContext.Provider value={{ datalists, updateDataLists }}>
      {children}
    </DataContext.Provider>
  );
}