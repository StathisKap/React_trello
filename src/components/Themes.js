/**
 *
 *
 * 
 */
import React from "react";
import { createContext } from "react";
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles.js';

/**
 *
 *
 * 
 */
export const ThemeContext = createContext();
export const lightTheme = { body: '#ececec', text: '#1e1e1e', };
export const darkTheme = { body: '#1e1e1e', text: '#ececec',};


/**
 *
 *
 * 
 */
export function CustomThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}