import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ 
  card,
  onCardClick, 
  onCardLike, 
  onCardDelete, 
}) { 
  const currentContext = React.useContext(CurrentUserContext); 
  const isOwn = card.owner === currentContext._id; 
  const isLiked = card.likes.some((i) => i._id === currentContext._id); 

 
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
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <p className="element__title">{card.name}</p>
        <div className="element__area">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <h3 className="element__heart-number">{card.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}
export default Card;
