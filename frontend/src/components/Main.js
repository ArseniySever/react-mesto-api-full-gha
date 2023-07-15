import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(
  props
) {
  const currentContext = React.useContext(CurrentUserContext);

  return (
    <>
    <Header isWrappable={true}>
      <p className="header__menu-item">{props.email}</p>
      <button href="#" className="header__menu-item" onClick={props.onLogout}>
        Выйти
      </button>
    </Header>
          <main className="main">
            <section className="profile">
              <div className="profile__avatar-area">
                <img
                  className="profile__avatar"
                  src={currentContext.avatar}
                  alt="аватар"
                />
                <button
                  type="button"
                  className="profile__avatar-edit"
                  aria-label="Редактировать аватар профиля"
                  onClick={props.onEditAvatar}
                ></button>
              </div>
              <div className="profile__info">
                <h1 className="profile__title">{currentContext.name}</h1>
                <p className="profile__subtitle">{currentContext.about}</p>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <button
                type="button"
                className="profile__add-button"
                onClick={props.onAddPlace}
              ></button>
            </section>
            <section className="elements">
              {props.cards.map(({ _id, ...cards }) => (
                <Card
                  key={_id}
                  _id={_id}
                  {...cards}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              ))}
            </section>
          </main>
      </>
      
  );
}
export default Main;
