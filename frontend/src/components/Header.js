import logo from "../images/logo.svg";
import open from "../images/HeaderOpen.svg";
import close from "../images/HeaderClose.svg";
import { Link, Route } from "react-router-dom";

function Header(props) {

  return (
    <>
      <Route exact path="/">
      <header className="header header_loggedin">
        <div className="header__button-container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <img className="header__button" src={props.active ? close : open} onClick={props.handleSwitchActivate}/>
        </div>
        <div className={props.active ? "header__info header__info_active" : "header__info"}>
          <p className="header__email">
            {props.user ? props.user.email : ""}
          </p>
          <Link
            to="/sign-in"
            className="header__link header__link_loggedin"
            onClick={props.handleLogout}
          >
            Выйти
          </Link>
        </div>
        </header>
      </Route>
      <Route path="/sign-up">
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
        </header>
      </Route>
      <Route path="/sign-in">
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
        </header>
      </Route>
      </>
  );
}

export default Header;
