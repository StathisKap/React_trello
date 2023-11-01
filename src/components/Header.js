/**
 *
 *
 * 
 */
import { useContext } from 'react';
import styled from 'styled-components';
import * as T from './Themes';


/**
 *
 *
 * 
 */
export default function Header() {
  const { toggleTheme} = useContext(T.ThemeContext);

  return (
    <S.Header>
      <S.Button onClick={toggleTheme}>Toggle Theme</S.Button>
    </S.Header>
  );
};

/**
 *
 *
 * 
 */
const S = {}

S.Header = styled.div`
  height: 50px;
  background-color: #333333;
  display: flex;
  margin: auto;
  justify-content: end;
  padding: 2px;
 `;

 S.Button = styled.button`
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  background-color: darkgray;
  font-weight: bold;
 `;