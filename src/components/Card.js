import React from 'react';

const Card = (props) => {

  const handleClick = () => props.onCardClick(props) 

  return (
    <figure className="photo-grid__item">
      <img
        onClick={handleClick}
        src={props.src}
        alt="изображение достопримечательности"
        className="photo-grid__image"
      />
      <h3 className="photo-grid__title">{props.name}</h3>
      <div className="photo-grid__likes">
        <button type="button" className="photo-grid__like"></button>
        <div className="photo-grid__like-number">{props.likes}</div>
      </div>
      <span className="ID" id="_id">{props.cardId}</span>
  <button type="button" className="photo-grid__delete" onClick={props.onCardDelete}></button>
    </figure>
  )
}

export default Card;