import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      place,
      link,
    });
  }

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
      buttonText={"Добавить"}
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
            />
            <span id="link-error" className="popup__input"></span>
          </div>
        </>
      }
    </PopupWithForm>
  );
};

export default AddPlacePopup;
