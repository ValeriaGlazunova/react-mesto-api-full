import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      button="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__input-container">
          <input
            ref={avatarRef}
            name="avatar-url-input"
            id="avatar-url-input"
            className="popup__input popup__input_type_avatar-url"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            id="avatar-url-input-error"
            className="popup__input-error popup__input-error_visible"
          ></span>
        </div>
      </>
    </PopupWithForm>
  );
}
