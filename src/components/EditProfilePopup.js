import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

const EditProfilePopup = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формыч
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"editProfileForm"}
      title={"Редактировать профиль"}
      isLoading={props.isLoading}
      buttonText={"Сохранить"}
      buttonTextIsLoading={"Сохранение ..."}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      {
        <>
          <div className="popup__field popup__field_info_name">
            <input
              placeholder="Имя"
              className="popup__text"
              minLength="2"
              maxLength="40"
              pattern="^[а-яА-ЯёЁa-zA-Z\s\-]+$"
              required
              type="text"
              name={name}
              value={name}
              onChange={handleChangeName}
            />
            <span id="name-error" className="popup__input"></span>
          </div>
          <div className="popup__field popup__field_info_other">
            <input
              placeholder="Род занятий"
              className="popup__text"
              minLength="2"
              maxLength="200"
              required
              type="text"
              name={description}
              value={description}
              onChange={handleChangeDescription}
            />
            <span id="about-error" className="popup__input"></span>
          </div>
        </>
      }
    </PopupWithForm>
  );
};

export default EditProfilePopup;
