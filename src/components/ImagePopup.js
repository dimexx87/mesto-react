import React from "react";

export const ImagePopup = (card) => {
  return (
    <div
      className={
        card.isOpen
          ? `popup popup_type_${card.name} popup_opened`
          : `popup popup_type_${card.name}`
      }
    >
      <form className="popup__picture-container">
        <img alt="tremendous screen" src={card.src} className="popup__image" />
        <button
          onClick={card.onClose}
          type="button"
          className="popup__btn-close"
          id="cardPictureForm"
        ></button>
        <h3 className="popup__bottom-title" id="pictureTitle">
          {card.name}
        </h3>
      </form>
    </div>
  );
};
