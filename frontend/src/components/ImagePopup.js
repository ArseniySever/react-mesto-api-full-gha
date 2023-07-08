import React from "react";
function ImagePopup({ cardName, cardLink, isOpen, onClose }) {
  return (
    <div
      id="popup_image"
      className={`popup popup-image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container-image">
        <img className="popup__image" src={cardLink} alt={cardName} />
        <h4 className="popup__subtitle">{cardName}</h4>
        <button
          type="button"
          className="popup__close popup__close-image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
