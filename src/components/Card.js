/**
 *
 *
 * 
 */
import React from "react";
import styled from 'styled-components'
import { CardContext } from "./Board";
import * as U from '../utils';
import * as G from '../frgs';
import { ThemeContext } from "./Themes";



/**
 *
 *
 * 
 */
export default function Card() {
  const { isCardOpen, setIsCardOpen } = React.useContext(CardContext)
  const [CardContents, setContents] = React.useState({ id: null, title: null, description: null })
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (isCardOpen.isOpen) {
      U.fetcher(G.GQL_GET_CARD, { id: isCardOpen.id }).then(fetchedData => {
        console.log("fetchedData", fetchedData);
        setContents({ id: fetchedData.card.id, title: fetchedData.card.title, description: fetchedData.card.description })
      })
    }
  }, [isCardOpen.isOpen])

/**
 *
 *
 * 
 */
  return (
    isCardOpen.isOpen ? (
      <>
        <S.Backdrop onClick={() => setIsCardOpen({ id: null, isOpen: false })} />
        <S.Card>
          <S.Header>
            <S.Id>{CardContents.id}</S.Id>
            <S.Title
              key={CardContents.id}
              onKeyDown={U.handleKeyDown}
              onBlur={(e) => handleCardBlur('title', CardContents.id ,e)}
              defaultValue={CardContents.title}
            />
          </S.Header>
          <S.Description
            key={CardContents.id}
            onKeyDown={U.handleKeyDown}
            onBlur={(e) => handleCardBlur('description', CardContents.id ,e)}
            defaultValue={CardContents.description}
          />
        </S.Card>
      </>
    ) : null
  );

  /**
   *
   *
   * 
   */
   function handleCardBlur(key, index, e) {
    const value = e.target.value;
    setContents((prevContents) => ({ ...prevContents, [key]: value }));
    const variables = { id: index };
    variables[key] = value;
    U.fetcher(G[`GQL_UPDATE_CARD_${key.toUpperCase()}`], variables).then(fetchedData => {
      console.log("fetchedData", fetchedData);
    });
  };
  
};



/**
 *
 *
 * 
 */
const S = {};

S.Card = styled.div` 
  align-items: center; // Center children vertically
  background-color: ${props => props.theme.body};
  color: inherit;
  border-radius: 8px; // Optional: Rounds the corners of the card
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Optional: Adds a shadow effect
  display: flex; // Keep your flex display
  flex-direction: column;
  height: auto; // Adjust height or set to 100% if you want full coverage
  justify-content: space-evenly; // Center children horizontally
  left: 0;
  margin: auto; // This will help center the card if its width is less than 100%
  padding: 20px; // Add some padding around the content
  position: fixed;
  right: 0;
  top: 4%;
  width: 50%; // You can adjust this as necessary
  z-index: 1000; // Ensure it's above everything else
`;

S.Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(125, 125, 125, 0.5); // Semi-transparent black background for the greyed-out effect
  z-index: 999; // Below the card but above everything else
`;

S.Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center; // Center children vertically
  background-color: rgba(155, 155, 155, 0.2);
  border-radius: 14px;
`;

S.Id = styled.p`
  background-color: rgba(155, 155, 155, 0.4);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 2px solid rgba(155, 155, 155, 0.2);
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
  /* margin-right: 10px; */
  margin-top: 5px;
  padding: 8px;
`;

S.Title = styled.input`
  background-color: inherit;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  width: auto;
  border: 0px;
  color: inherit;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
  margin-right: 20px;
  margin-top: 10px;
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center;
`;


S.Description = styled.textarea`
  /* background-color: inherit; */
  background-color: rgba(155, 155, 155, 0.2);
  border-radius: 8px;
  width: 100%;
  border: 0px;
  color: inherit;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center;
`;