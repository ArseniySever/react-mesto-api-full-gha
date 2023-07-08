import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarReferens = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarReferens.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Обновить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        ref={avatarReferens}
        className="popup__name-item popup__name-item_value_avatar"
        placeholder="Введите ссылку на аватар"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__item-error avatar-input-error" />
    </PopupWithForm>
  );
}
export default PopupAvatar;
