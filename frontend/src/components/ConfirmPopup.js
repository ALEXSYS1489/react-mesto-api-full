function ConfirmPopup(props) {
  return (
    <div
      className={
        props.isOpen
          ? "popup popup_type_confirm popup_is-opened"
          : "popup popup_type_confirm"
      }
    >
      <div className="popup__container popup__container_confirm">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={() => {
            props.onClose();
          }}
        ></button>
        <h2 className="popup__info">Вы уверены?</h2>
        <button
          type="button"
          className="popup__confirm"
          onClick={() => {
            props.onDeleteCard(props.deletedСard);
          }}
        >
          Да
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
