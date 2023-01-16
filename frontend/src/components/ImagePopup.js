function ImagePopup(props) {
  if (props.card) {
    return (
      <div className="popup popup_type_image popup_is-opened">
        <div className="popup__image-block">
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть"
            onClick={props.onClose}
          ></button>
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <h2 className="popup__image-name">{props.card.name}</h2>
        </div>
      </div>
    );
  }
}
export default ImagePopup;
