/**
 *
 *
 * 
 */
import React from "react";
import styled from 'styled-components'
import * as U from '../utils';
import * as G from '../frgs';
import { BoardContext } from './Board';


/**
 *
 *
 * 
 */
export default function Card() {

  const { allLists, setAllLists, CardState, setCardState } = React.useContext(BoardContext);

  React.useEffect(() => {
    // When the card opens, U.fetcher the card data
    if (CardState.isOpen) {
      U.fetcher(G.GQL_GET_CARD, { id: CardState.id })
        .then((data) => {
          const { card } = data;
          setCardState({ ...CardState, ...card});
        }
        )
        .catch(error => console.error('Error fetching data:', error));
    }
  }
    , [CardState.isOpen])

  /**
   *
   *
   * 
   */
  return (
    CardState.isOpen ? (
      <>
        <S.Backdrop onClick={() => setCardState({ id: null, isOpen: false })} />
        <S.Card>
          <S.Header>
            <S.Id>{CardState.id}</S.Id>
            <S.Title
              key={CardState.id}
              onKeyDown={U.handleKeyDown}
              onBlur={(e) => handleCardBlur('title', CardState.id, e)}
              defaultValue={CardState.title}
            />
            <S.Delete onClick={(e) => handleDelete(CardState.id)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#8B949E" xmlns="http://www.w3.org/2000/svg">
                <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.48499C13.2525 4.23749 10.74 4.10999 8.235 4.10999C6.75 4.10999 5.265 4.18499 3.78 4.33499L2.25 4.48499"></path>
                <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"></path>
                <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M14.1374 6.85498L13.6499 14.4075C13.5674 15.585 13.4999 16.5 11.4074 16.5H6.59243C4.49993 16.5 4.43243 15.585 4.34993 14.4075L3.86243 6.85498"></path>
                <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M7.74719 12.375H10.2447"></path>
                <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M7.125 9.375H10.875"></path>
              </svg>
            </S.Delete>
          </S.Header>
          <S.Description
            key={CardState.id}
            onKeyDown={U.handleKeyDown}
            onBlur={(e) => handleCardBlur('description', CardState.id, e)}
            defaultValue={CardState.description}
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
    setCardState((prevContents) => ({ ...prevContents, [key]: value }));
    const variables = { id: index };
    variables[key] = value;
    U.fetcher(G[`GQL_UPDATE_CARD_${key.toUpperCase()}`], variables);
  };

  function handleDelete(id) {
    setCardState({ ...CardState, isOpen: false })
    setAllLists(allLists.map(list => ({
      ...list,
      cards: list.cards.filter(card => card.id !== id)
    })));
    U.fetcher(G.GQL_DELETE_CARD, { id: id })
  }
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

S.Delete = styled.button`
  background-color: rgba(155, 155, 155, 0.4);
  border-radius: 8px;
  border: 2px solid rgba(155, 155, 155, 0.2);
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
  /* margin-right: 10px; */
  margin-top: 5px;
  padding: 8px;
`;