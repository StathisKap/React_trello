import * as T from './components/Themes';
import Board  from './components/Board'
import Header from './components/Header';
import './App.css';
import { DataProvider } from './components/DataProvider';
import { BoardSelection } from './components/BoardSelection';

/**
 *
 *
 * 
 */
export default function App() {

  return (
    <T.CustomThemeProvider>
        <Header/>
      <DataProvider>
        <BoardSelection>
          <Board/>
        </BoardSelection>
      </DataProvider>
    </T.CustomThemeProvider>
  );
}