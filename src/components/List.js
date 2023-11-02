/**
 *
 *
 * 
 */
import React from 'react';
import styled, { css } from 'styled-components'
import * as U from '../utils';
import * as G from '../frgs';
import { CardContext } from './Board';


/**
 *
 *
 * 
 */
export default function List({ list }) {
  // const [isOverSubElement, setIsOverSubElement] = React.useState(false);

  /**
   * States for the values of the inputs
   *
   * 
   */
  const [title, setTitle] = React.useState(list.title.charAt(0).toUpperCase() + list.title.slice(1));
  const { setIsCardOpen } = React.useContext(CardContext)


  return (
    <S.List
      // draggable={!isOverSubElement}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <S.Title
        key={list.id}
        onKeyDown={U.handleKeyDown}
        onBlur={(e) => handleTitleBlur(list.id ,e)}
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
        defaultValue={title}
      />
      {list.cards.map((card) => (
        <S.Card
          key={card.id}
          // onKeyDown={handleKeyDown}
          // onBlur={(e) => handleCardBlur(card.id, e)}
          onClick={() => {setIsCardOpen({id: card.id, isOpen: true}); }}
          // onMouseOver={handleMouseOver}
          // onMouseOut={handleMouseOut}
        >
        {card.title}
        </S.Card>
      ))}

    </S.List>
  );

  /**
   *
   *
   * 
   */
  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', list.title);
    event.currentTarget.classList.add('tilted');
  }

  function handleDragEnd(event) {
    event.dataTransfer.getData('text/plain', list.title);
    event.currentTarget.classList.remove('tilted');
  }

  // function handleMouseOver() {
    // setIsOverSubElement(true);
  // };

  // function handleMouseOut() {
    // setIsOverSubElement(false);
  // };

  function handleTitleBlur(index, e) {
    setTitle(e.target.value);
    U.fetcher(G.GQL_UPDATE_LIST_TITLE, { id: index, title: e.target.value}).then(fetchedData => {console.log("fetchedData", fetchedData);});
  };

};


/**
 *
 *
 * 
 */
const S = {};

// S.tiltStyles = css`
  /* opacity: 0.5; */
  /* transform: rotate(12deg); */
  /* transition: transform 0.2s; */
// `;
// 

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

  /* &.tilted { */
    /* ${S.tiltStyles} */
  /* } */
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
