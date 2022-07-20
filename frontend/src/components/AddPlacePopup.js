import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleEditCardName(e) {
    setCardName(e.target.value);
  }

  function handleEditCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
        <div className="popup__input-container">
          <input
            name="card-name-input"
            id="card-name-input"
            className="popup__input popup__input_type_card-name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleEditCardName}
            value={cardName || ''}
            required
          />
          <span
            id="card-name-input-error"
            className="popup__input-error popup__input-error_visible"
          ></span>
        </div>
        <div className="popup__input-container">
          <input
            name="card-url-input"
            id="card-url-input"
            className="popup__input popup__input_type_card-link"
            type="url"
            placeholder="Ссылка на картинку"
            onChange={handleEditCardLink}
            value={cardLink || ''}
            required
          />
          <span
            id="card-url-input-error"
            className="popup__input-error popup__input-error_visible"
          ></span>
        </div>
    </PopupWithForm>
  );
}
