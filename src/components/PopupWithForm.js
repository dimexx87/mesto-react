import React from "react";

function PopupWithForm({ isOpen, name, title, children, ...rest }) {
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
        <button className="popup__btn-save" id="saveButtonProfile">
          {rest.buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
