/**
 *
 *
 * 
 */
import React from 'react';
import styled, { css } from 'styled-components'


/**
 *
 *
 * 
 */
export default function List({list}){
  const [isOverSubElement, setIsOverSubElement] = React.useState(false);

  /**
   * States for the values of the inputs
   *
   * 
   */
  const [title, setTitle] = React.useState(list.title.charAt(0).toUpperCase() + list.title.slice(1));
  const [cards, setCards] = React.useState(list.cards);


  return (
    <S.List
    draggable={!isOverSubElement}
    onDragStart={handleDragStart} 
    onDragEnd={handleDragEnd}
    >
      <S.Title
        key={list.id}
        onKeyDown={handleKeyDown}
        onBlur={(e) => handleTitleBlur(e)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        defaultValue={title}
      />
      {list.cards.map((card) => (
      <S.Card
        key={card.id}
        onKeyDown={handleKeyDown}
        onBlur={(e) => handleCardBlur(card.id, e)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        defaultValue={card.title}
      />
      ))}
    </S.List>
  );

  /**
   *
   *
   * 
   */
   function handleDragStart(event){
    event.dataTransfer.setData('text/plain', list.title);
    event.currentTarget.classList.add('tilted');
  }
  
  function handleDragEnd(event){
    event.dataTransfer.getData('text/plain', list.title);
    event.currentTarget.classList.remove('tilted');
  }
  function handleMouseOver(){
    setIsOverSubElement(true);
  };

  function handleMouseOut(){
    setIsOverSubElement(false);
  };

  function handleTitleBlur(e){
    setTitle(e.target.value);
  };

  function handleCardBlur(index, e){
    const newCards = cards.slice();
    newCards[index] = {
      ...newCards[index],
      title: e.target.value
    };
    setCards(newCards);
  };

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  }
};


/**
 *
 *
 * 
 */
const S = {};

S.tiltStyles = css`
  opacity: 0.5;
  transform: rotate(12deg);
  transition: transform 0.2s;
`;


S.List = styled.div`
  border: 2px solid;
  width: 272px;
  padding-left: 20px;
  padding-bottom: 10px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 12px;

  &.tilted {
    ${S.tiltStyles}
  }
`;

S.Title = styled.input`
  font-weight: 900;
  width: calc(100% - 25px);
  margin-right: 20px;
  border: 0px;
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: 8px;
  background-color: inherit;
  font-size: 14px;
`;

S.Card = styled.input`
  margin-right: 20px;
  margin-bottom: 5px;
  width: calc(100% - 25px);
  border: 0px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fafafa;
`;
