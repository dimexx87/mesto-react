import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: linkRef.current.value,
    });
    linkRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"editAvatarForm"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
    >
      {
        <div className="popup__field popup__field_info_other">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text"
            name="link"
            id="link"
            required
            ref={linkRef}
          />
          <span id="link-error" className="popup__input"></span>
        </div>
      }
    </PopupWithForm>
  );
};

export default EditAvatarPopup;