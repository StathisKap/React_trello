import { DataProvider } from './app/DataProvider';
import * as T from './components/Themes';
import Board  from './components/Board'
import Header from './components/Header';
import './App.css';

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
          <Board/>
        </DataProvider>
    </T.CustomThemeProvider>
  );
}