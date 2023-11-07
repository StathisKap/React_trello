/**
 *
 *
 * 
 */
import React from 'react';
import styled from 'styled-components'
import * as U from '../utils';
import * as G from '../frgs';
import { BoardContext } from './Board';


/**
 *
 *
 * 
 */
export default function List({ list }) {
  const [cardsList, setCardsList] = React.useState(list);
  const { allLists, setAllLists, CardState, setCardState } = React.useContext(BoardContext);

  React.useEffect(() => {
    // when CardState changes, update the card in the list
    if (CardState.id) {
      const cardIndex = cardsList.cards.findIndex(card => card.id === CardState.id);
      const updatedCard = { ...cardsList.cards[cardIndex], title: CardState.title };
      const updatedCards = [...cardsList.cards];
      updatedCards[cardIndex] = updatedCard;
      setCardsList({ ...cardsList, cards: updatedCards });
    }
  }, [CardState])

  React.useEffect(() => {
    // When allLists updates, then find the list within it that matches the list.id, and update cardsLists
    const listIndex = allLists.findIndex(list => list.id === cardsList.id);
    setCardsList(allLists[listIndex]);
  }, [allLists])


  return (
    <S.List>
      <S.Head>
        <S.Title
          key={cardsList.id}
          onKeyDown={U.handleKeyDown}
          onBlur={(e) => handleTitleBlur(cardsList.id, e)}
          defaultValue={cardsList.title}
        />
        <S.Delete onClick={(e) => deleteList(cardsList.id)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#8B949E" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.48499C13.2525 4.23749 10.74 4.10999 8.235 4.10999C6.75 4.10999 5.265 4.18499 3.78 4.33499L2.25 4.48499"></path>
            <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"></path>
            <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M14.1374 6.85498L13.6499 14.4075C13.5674 15.585 13.4999 16.5 11.4074 16.5H6.59243C4.49993 16.5 4.43243 15.585 4.34993 14.4075L3.86243 6.85498"></path>
            <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M7.74719 12.375H10.2447"></path>
            <path strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" d="M7.125 9.375H10.875"></path>
          </svg>
        </S.Delete>
      </S.Head>
      {cardsList.cards.map((card) => (
        <S.Card key={card.id}
          onClick={() => { setCardState({ ...CardState.card, id: card.id, isOpen: true }); }}
        >
          {card.title}
        </S.Card>
      ))}
      <S.AddCard onClick={() => addCard(list.id)} > Add a card</S.AddCard>
    </S.List>
  );

  /**
   *
   *
   * 
   */
  function handleTitleBlur(index, e) {
    setCardsList({ ...cardsList, title: e.target.value });
    U.fetcher(G.GQL_UPDATE_LIST_TITLE, { id: index, title: e.target.value });
  };

  async function addCard(id) {
    const addedCard = await U.fetcher(G.GQL_ADD_CARD, { list_id: id })
    setCardsList({
      ...cardsList,
      cards: [...cardsList.cards, addedCard.addCard]
    });
  };

  async function deleteList(id) {
  // Update allLists
  const updatedLists = allLists.filter(list => list.id !== id);
  setAllLists(updatedLists);
  // Delete List by ID
  U.fetcher(G.GQL_DELETE_LIST, { id: id })
  // Delete Cards by List ID
  U.fetcher(G.GQL_DELETE_CARDS_BY_LIST_ID, { list_id: id })
  };
};


/**
 *
 *
 * 
 */
const S = {};


S.List = styled.div`
  background-color: inherit;
  border-radius: 12px;
  border: 2px solid;
  color: inherit;
  margin-bottom: auto;
  margin-top: auto;
  padding-bottom: 10px;
  padding-left: 20px;
  width: 272px;
`;

S.Head = styled.div`
 display: flex;
 justify-content: space-between;
 margin-right: 25px;
`;

S.Title = styled.input`
  background-color: inherit;
  border-radius: 8px;
  border: 0px;
  color: inherit;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 10px;
  margin-right: 20px;
  margin-top: 10px;
  overflow-wrap: break-word;
  padding: 10px;
  width: calc(100% - 100px);
`;

S.Card = styled.p`
  background-color: rgba(155, 155, 155, 0.2);
  border-radius: 8px;
  border: 2px solid rgba(155, 155, 155, 0.2);
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-right: 20px;
  overflow-wrap: break-word;
  padding: 8px;
  width: calc(100% - 25px);
  &:hover {
    background-color: rgba(155, 155, 155, 0.3); /* Adjust color as needed */
    border-color: rgba(155, 155, 155, 0.3); /* Set a border color */
  }
`;


S.AddCard = styled.button`
  background-color: rgba(155, 155, 155, 0.4); /* Adjust color as needed */
  border-radius: 8px;
  border: 3px solid rgba(145, 145, 145, 0.6);
  color: inherit;
  margin: auto;
  padding: 8px;
  text-align: center;
  width: calc(100% - 25px);
  &:hover {
    background-color: rgba(155, 155, 155, 0.6); /* Adjust color as needed */
    border: 3px solid rgba(145, 145, 145, 0.8);
  }
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