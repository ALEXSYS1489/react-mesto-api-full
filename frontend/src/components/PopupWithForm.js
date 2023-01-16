function PopupWithForm(props) {
  let buttonText = "";
  if (props.isLoading) {
    buttonText = "Сохранение...";
  } else {
    buttonText = "Сохранить";
  }

  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_is-opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={() => {
            props.onClose();
          }}
        ></button>
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__info">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save popup__save_active">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
