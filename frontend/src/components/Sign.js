import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function Sign(props) {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(userData)
  };

  return (
    <form className="sign" onSubmit={handleSubmit}>
      <h1 className="sign__title">{props.title}</h1>
      <input
        name="email"
        type="email"
        required
        className="sign__input"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        required
        className="sign__input"
        placeholder="Пароль"
        value={userData.password}
        onChange={handleChange}
      />
      <button type="submit" className="sign__button">
        {props.buttonText}
      </button>
      <Link to={props.link} className="sign__link">
        {props.formLinkText}
      </Link>
    </form>
  );
}

export default Sign;
