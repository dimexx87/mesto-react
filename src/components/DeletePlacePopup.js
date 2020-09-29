import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePlacePopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault()
    props.onDeleteCard(props.deletingCard)
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"deleteCardForm"}
      title={"Вы уверены?"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText={"Да"}
      buttonTextIsLoading={"Удаление ..."}
    />
  );
};

export default DeletePlacePopup;
