import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
      onSubmit={handleAddPlaceSubmit}
      children={
        <>
          <input
            name="name"
            type="text"
            required
            className="popup__input popup__input_value_name"
            id="place-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleChangeName}
          />
          <span className="popup__error popup__error_type_profile-name"></span>
          <input
            name="about"
            type="text"
            required
            className="popup__input popup__input_value_about"
            id="place-link"
            placeholder="Ссылка на картинку"
            minLength="2"
            maxLength="200"
            value={link}
            onChange={handleChangeLink}
          />
          <span className="popup__error popup__error_type_profile-about"></span>
        </>
      }
      title={"Новое место"}
      name={"profile"}
    />
  );
}

export default AddPlacePopup;
