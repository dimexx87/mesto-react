import React, { useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = (props) => {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleChangePlace = useCallback((e) => {
    setPlace(e.target.value);
  }, []);

  const handleChangeLink = useCallback((e) => {
    setLink(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      props.onAddPlace({
        place,
        link,
      });
    },
    [place, link, props]
  );

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"addCardForm"}
      title={"Новое место"}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Добавление..." : "Добавить"}
    >
      {
        <>
          <div className="popup__field popup__field_info_name">
            <input
              type="text"
              placeholder="Название"
              className="popup__text"
              minLength="1"
              maxLength="30"
              required
              name={place}
              value={place}
              onChange={handleChangePlace}
              //onChange={handleInputChange}
            />
            <span id="place-error" className="popup__input"></span>
          </div>
          <div className="popup__field popup__field_info_other">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              className="popup__text"
              required
              name={link}
              value={link}
              onChange={handleChangeLink}
              //onChange={handleInputChange}
            />
            <span id="link-error" className="popup__input"></span>
          </div>
        </>
      }
    </PopupWithForm>
  );
};
