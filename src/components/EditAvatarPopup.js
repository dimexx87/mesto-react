import React, { useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = (props) => {
  
  

  const linkRef = React.useRef("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      props.onUpdateAvatar({
        avatar: linkRef.current.value,
      });
    },
    [props]
  );

  React.useEffect(() => {
    linkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"editAvatarForm"}
      title={"Обновить аватар"}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Сохранение ..." : "Сохранить"}
    >
      {
        <div className="popup__field popup__field_info_other">
          <input
            placeholder="Ссылка на картинку"
            className="popup__text"
            name="link"
            id="link"
            type="url"
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
