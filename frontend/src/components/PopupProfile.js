import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function PopupProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    const target = e.target;
    setName(target.value);
  }

  function handleDescriptionChange(e) {
    const target = e.target;
    setDescription(target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="name"
          value={name || ""}
          className="popup__name-item popup__name-item_value_name"
          required
          minLength={2}
          maxLength={40}
          onChange={handleNameChange}
        />
        <span className="popup__item-error name-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="text"
          name="job"
          value={description || ""}
          className="popup__name-item popup__name-item_value_job"
          required
          minLength={2}
          maxLength={200}
          onChange={handleDescriptionChange}
        />
        <span className="popup__item-error job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default PopupProfile;
