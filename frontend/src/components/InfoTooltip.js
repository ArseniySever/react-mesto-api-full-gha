import React from 'react';
import successImage from "../images/Unionfirst.png";
import failImage from "../images/Union.png";
import App from './App';

const InfoTooltip = (props) => {
    return (
      <div
        className={
          props.isOpen
            ? `popup popup_type_${props.name} popup_opened`
            : `popup popup_type_${props.name}`
        }
      >
        <div className="popup__container">
          <button
            className="
            popup__close
            button button_type_close
            hover
          "
            onClick={props.onClose}
            type="button"
            aria-label="Закрыть попап"
          />
          <img
            className="popup__registration-image-status"
            src={props.status ? successImage : failImage}
            alt="Картинка статуса"
          />
          <h2 className="popup__title popup__title_type_tooltip">
            {props.title}
          </h2>
        </div>
      </div>
    );
  };
  
  export default InfoTooltip;