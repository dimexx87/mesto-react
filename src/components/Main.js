import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Spinner from "./Spinner/Spinner";

export const Main = ({ cards, ...rest }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main id="abc" className="content">
      <section className="profile">
        <div className="profile__info">
          <button onClick={rest.onEditAvatar} className="profile__avatar">
            <div className="profile__overlay">
              <div className="profile__avatar-edit"></div>
            </div>
            <img
              alt="owner face"
              className="profile__photo"
              src={currentUser.avatar}
            />
          </button>
          <div className="profile__author">
            <div className="profile__edit-line">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={rest.onEditProfile}
                type="button"
                className="profile__btn-edit"
              ></button>
            </div>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </div>
        </div>
        <button
          onClick={rest.onAddPlace}
          type="button"
          className="profile__btn-add"
        ></button>
      </section>
      <section className="photo-grid">
        {rest.isStartLoading && cards ? (
          <Spinner />
        ) : (
          cards.map((card) => (
            <Card
              {...card}
              onCardClick={rest.onCardClick}
              onCardDelete={rest.onCardDelete}
              onCardLike={rest.onCardLike}
            />
          ))
        )}
      </section>
    </main>
  );
}
