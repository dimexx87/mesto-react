import React, { useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const DeletePlacePopup = (props) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      props.onDeleteCard(props.deletingCard);
    },
    [props]
  );

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"deleteCardForm"}
      title={"Вы уверены?"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Удаление ..." : "Да"}
    />
  );
};
