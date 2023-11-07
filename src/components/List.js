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
  const { allLists, CardState, setCardState } = React.useContext(BoardContext);

  React.useEffect(() => {
    // when CardState changes, update the card in the list
    if (CardState.id) {
      const cardIndex = cardsList.cards.findIndex(card => card.id === CardState.id);
      const updatedCard = { ...cardsList.cards[cardIndex], title: CardState.title };
      const updatedCards = [...cardsList.cards];
      updatedCards[cardIndex] = updatedCard;
      setCardsList({ ...cardsList, cards: updatedCards });
    }
  },[CardState])

  React.useEffect(() => {
    console.log("allLists", allLists);
    // When allLists updates, then find the list within it that matches the list.id, and update cardsLists
    const listIndex = allLists.findIndex(list => list.id === cardsList.id);
    setCardsList(allLists[listIndex]);
  },[allLists])


  return (
    <S.List>
      <S.Title
        key={cardsList.id}
        onKeyDown={U.handleKeyDown}
        onBlur={(e) => handleTitleBlur(cardsList.id, e)}
        defaultValue={cardsList.title}
      />
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
    setCardsList({...cardsList, title: e.target.value});
    U.fetcher(G.GQL_UPDATE_LIST_TITLE, { id: index, title: e.target.value }).then(fetchedData => { console.log("fetchedData", fetchedData); });
  };

  async function addCard(id) {
    const addedCard = await U.fetcher(G.GQL_ADD_CARD, { list_id: id })
    setCardsList({
      ...cardsList,
      cards: [...cardsList.cards, addedCard.addCard]
    });
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
  width: calc(100% - 25px);
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