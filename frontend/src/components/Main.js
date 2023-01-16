import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-containner">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            type="button"
            className="profile__avatar-button"
            aria-label="Сменить аватар"
            onClick={() => {
              onEditAvatar();
            }}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Изменить информацию о профиле"
            onClick={() => {
              onEditProfile();
            }}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить карточку"
          onClick={() => {
            onAddPlace();
          }}
        ></button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
            item={item}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={(card) => {
              onCardLike(card);
            }}
            onCardDelete={(card) => {
              onCardDelete(card);
            }}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
