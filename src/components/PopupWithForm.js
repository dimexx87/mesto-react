import React from "react";

export const PopupWithForm = ({ isOpen, name, title, children, ...rest }) => {
  const buttonClassName = `popup__btn-save ${
    rest.disabled ? "popup__btn-save_disabled" : ""
  }`;

  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <form
        className="popup__container popup__form_card"
        name={name}
        noValidate
        onSubmit={rest.onSubmit}
      >
        <button
          onClick={rest.onClose}
          type="button"
          className="popup__btn-close"
        ></button>
        <div className="popup__title">{title}</div>
        <>{children}</>
        <button disabled={rest.disabled} className={buttonClassName}>
          {rest.buttonText}
        </button>
      </form>
    </div>
  );
};
