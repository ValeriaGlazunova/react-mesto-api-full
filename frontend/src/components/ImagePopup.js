import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img-open ${
        props.card && "popup_opened"
      }`}
    >
      <div className="popup__box">
        <button
          className="popup__close-button popup__close-button_type_img-open"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          alt={props.card?.name}
          src={props.card?.link}
        />
        <h3 className="popup__subtitle">{props.card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
