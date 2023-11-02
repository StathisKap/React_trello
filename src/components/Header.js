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
  background-color: #333333;
  display: flex;
  height: 50px;
  justify-content: end;
  margin: auto;
  padding: 2px;
  width: 100%;
 `;

 S.Button = styled.button`
  background-color: darkgray;
  font-weight: bold;
  height: 40px;
  margin-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: auto;
  padding: 10px;
 `;