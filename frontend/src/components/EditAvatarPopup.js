import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
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
            name="avatar"
            type="url"
            required
            className="popup__input popup__input_value_name"
            id="avatar"
            placeholder="Аватар"
            ref={avatarInput}
          />
          <span className="popup__error popup__error_type_avatar"></span>
        </>
      }
      title={"Обновить аватар"}
      name={"profile"}
    />
  );
}

export default EditAvatarPopup;
