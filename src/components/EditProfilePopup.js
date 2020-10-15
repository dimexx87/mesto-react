import React, { useCallback, useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

const validators = {
  name: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value && value.length < 2;
    },
    maxLength: (value) => {
      return value && value.length > 20;
    },
    containNumbers: (value) => {
      return !/^[а-яА-ЯёЁa-zA-Z\s]+$/.test(value);
    },
  },
  description: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value && value.length < 2;
    },
    maxLength: (value) => {
      return value && value.length > 200;
    },
  },
};

export const EditProfilePopup = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      maxLength: true,
      containNumbers: true,
    },
    description: {
      required: true,
      minLength: true,
      maxLength: true,
    },
  });

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      props.onUpdateUser({
        name,
        about: description,
      });
    },
    [name, description, props]
  );

  useEffect(
    function validateInputs() {
      const nameValidationResult = Object.keys(validators.name)
        .map((errorKey) => {
          const errorResult = validators.name[errorKey](name);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});
      const descriptionValidationResult = Object.keys(validators.description)
        .map((errorKey) => {
          const errorResult = validators.description[errorKey](description);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        name: nameValidationResult,
        description: descriptionValidationResult,
      });
    },
    [name, description, setErrors]
  );

  const isNameValid = Object.values(errors.name).some(Boolean);
  const isDescriptionValid = Object.values(errors.description).some(Boolean);
  const isSubmitDisabled = isNameValid || isDescriptionValid;

  return (
    <PopupWithForm
      name={"editProfileForm"}
      title={"Редактировать профиль"}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Сохранение ..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      disabled={isSubmitDisabled}
    >
      {
        <>
          <div className="popup__field popup__field_info_name">
            <input
              placeholder="Имя"
              className="popup__text"
              type="text"
              name={name}
              value={name}
              onChange={handleChangeName}
            />
            {errors.name.required && (
              <span className="popup__input popup__input-error">
                {"Необходимо заполнить"}
              </span>
            )}
            {errors.name.minLength && (
              <span className="popup__input popup__input-error">
                {"Должно содержать минимум 2 символа"}
              </span>
            )}
            {errors.name.maxLength && (
              <span className="popup__input popup__input-error">
                {"Должно содержать максимум 20 символов"}
              </span>
            )}
            {errors.name.containNumbers && (
              <span className="popup__input popup__input-error">
                {"Должно содержать только буквы"}
              </span>
            )}
          </div>
          <div className="popup__field popup__field_info_other">
            <input
              placeholder="Род занятий"
              className="popup__text"
              type="text"
              name={description}
              value={description}
              onChange={handleChangeDescription}
            />
            {errors.description.required && (
              <span className="popup__input popup__input-error">
                {"Необходимо заполнить"}
              </span>
            )}
            {errors.description.minLength && (
              <span className="popup__input popup__input-error">
                {"Должно содержать минимум 2 символа"}
              </span>
            )}
            {errors.description.maxLength && (
              <span className="popup__input popup__input-error">
                {"Должно содержать максимум 200 символов"}
              </span>
            )}
          </div>
        </>
      }
    </PopupWithForm>
  );
};

export default EditProfilePopup;
