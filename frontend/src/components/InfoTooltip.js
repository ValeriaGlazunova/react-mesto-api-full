import React from "react";
import okTip from '../images/ok.svg';
import notOkTip from '../images/not-ok.svg'

function InfoTooltip (props) {
    return (
<div
      className={`popup popup_type_info-tip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className='popup__container popup__container_type_info-tip'>
        <button
          className='popup__close-button popup__close-button_type_info-tip'
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__image-tip"  src={props.isSignedUp ? okTip : notOkTip} alt='подсказка' />
        <h2 className="popup__info">{props.isSignedUp ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
    )
}

export default InfoTooltip;
