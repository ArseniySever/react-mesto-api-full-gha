import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  _id,
  link,
  name,
  likes,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const card = { _id: _id, link: link, name: name, owner: owner, likes: likes };
  const currentContext = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentContext._id;
  const isLiked = likes.some((i) => i._id === currentContext._id);

  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleCardLike() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="element element-template">
      <div className="element__rectangle">
        {isOwn && (
          <button
            type="button"
            className="element__trash"
            onClick={handleDeleteClick}
          />
        )}

        <img
          className="element__image"
          src={link}
          alt={name}
          onClick={handleClick}
        />
        <p className="element__title">{name}</p>
        <div className="element__area">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <h3 className="element__heart-number">{likes.length}</h3>
        </div>
      </div>
    </div>
  );
}
export default Card;
