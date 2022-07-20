import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          className={`popup__close-button popup__close-button_type_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__heading">{props.title}</h3>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
