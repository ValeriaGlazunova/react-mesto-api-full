import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditJob(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
        <div className="popup__input-container">
          <input
            name="name"
            id="name-input"
            className="popup__input popup__input_type_name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleEditName}
            required
          />
          <span
            id="name-input-error"
            className="popup__input-error popup__input-error_visible"
          ></span>
        </div>
        <div className="popup__input-container">
          <input
            name="job"
            id="job-input"
            className="popup__input popup__input_type_description"
            type="text"
            placeholder="Деятельность"
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleEditJob}
            required
          />
          <span
            id="job-input-error"
            className="popup__input-error popup__input-error_visible"
          ></span>
        </div>
    </PopupWithForm>
  );
}
