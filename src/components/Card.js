import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const handleClick = () => props.onCardClick(props);
  const handleLikeClick = () => props.onCardLike(props);
  const handleDeleteClick = () => props.onCardDelete(props);
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.ownerId === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `photo-grid__delete ${
    isOwn ? "photo-grid__delete_visible" : "photo-grid__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.like.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked ? "photo-grid__like_active" : null
  }`;

  const cardLikesNumberClassName = `photo-grid__like-number ${
    props.likes > 0
      ? "photo-grid__like-number_visible"
      : "photo-grid__like-number_hidden"
  }`;

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
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <div className={cardLikesNumberClassName}>{props.likes}</div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </figure>
  );
}

export default Card;
