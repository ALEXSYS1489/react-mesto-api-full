import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.item.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__remove ${
    isOwn ? "" : "element__remove_inactive"
  }`;

  const isLiked = props.item.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.item);
  }

  function handleLikeClick() {
    props.onCardLike(props.item);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.item);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.item.link}
        alt={props.item.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      />
      <div className="element__info">
        <h2 className="element__name">{props.item.name}</h2>
        <div className="element__like-containner">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <h3 className="element__likes">{props.item.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
