import React from "react";
import PopupWithForm from "./PopupWithForm";
function PopupPlace({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }
  function handleNameChange(e) {
    const target = e.target;
    setName(target.value);
  }

  function handleLinkChange(e) {
    const target = e.target;
    setLink(target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Добавить"
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="name"
          value={name || ""}
          className="popup__name-item popup__name-item_value_title"
          placeholder="Название"
          required
          minLength={1}
          maxLength={30}
          onChange={handleNameChange}
        />
        <span className="popup__item-error title-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="url"
          name="link"
          value={link || ""}
          className="popup__name-item popup__name-item_value_link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
        />
        <span className="popup__item-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default PopupPlace;
