import PopupWithForm from "./PopupWithForm";
function PopupDelete() {
  return (
    <div id="popup_delete" className="popup popup-delete">
      <div className="popup__container popup__container-delete">
        <button
          type="button"
          className="popup__close popup__close-delete"
        ></button>
        <h3 className="popup__title">Вы уверены?</h3>
        <PopupWithForm
          className="popup__form popup__form-delete"
          name="delete"
          noValidate
        >
          <button
            className="popup__save popup__save-delete"
            value="Сохранить"
            type="submit"
          >
            Да
          </button>
        </PopupWithForm>
      </div>
    </div>
  );
}
export default PopupDelete;
