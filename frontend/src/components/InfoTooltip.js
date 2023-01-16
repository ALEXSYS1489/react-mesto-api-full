import ImageOk from "../images/RegisterOK.jpg";
import ImageNotOk from "../images/RegisterNotOK.jpg";

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup popup_is-opened` : `popup`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={() => {
            props.onClose();
          }}
        ></button>
        <img
          className="popup__register-image"
          src={props.isRegisterOK ? ImageOk : ImageNotOk}
          alt={
            props.isRegisterOK
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        />
        <h1 className="popup__register-message">
          {props.isRegisterOK
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h1>
      </div>
    </div>
  );
}

export default InfoTooltip;
