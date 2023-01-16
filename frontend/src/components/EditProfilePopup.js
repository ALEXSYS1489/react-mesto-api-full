import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            name="name"
            type="text"
            required
            className="popup__input popup__input_value_name"
            id="profile-name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleChangeName}
          />
          <span className="popup__error popup__error_type_profile-name"></span>
          <input
            name="about"
            type="text"
            required
            className="popup__input popup__input_value_about"
            id="profile-about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleChangeDescription}
          />
          <span className="popup__error popup__error_type_profile-about"></span>
        </>
      }
      title={"Редактировать профиль"}
      name={"profile"}
    />
  );
}

export default EditProfilePopup;
