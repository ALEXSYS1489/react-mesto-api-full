import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedСard, setDeletedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [isRegisterOK, setIsRegisterOK] = useState(false);
  const [active, setActive] = useState(false);

  const token = localStorage.getItem("token");

  const history = useHistory();

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmPopupOpen ||
    isRegisterPopupOpen ||
    selectedCard;

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUser(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(() => cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(() =>
          cards.filter((c) => {
            return c._id !== card._id;
          })
        );
        closeAllPopups();
      })

      .catch((err) => {
        console.log("Ошибка сервера", err);
      });
  }

  function handleConfirm(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setDeletedCard(null);
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleRegisterUser(userData) {
    Auth.register(userData.password, userData.email)
      .then(() => {
        setIsRegisterPopupOpen(true);
        setIsRegisterOK(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
        setIsRegisterPopupOpen(true);
        setIsRegisterOK(false);
      });
  }

  function handleAuthorizeUser(userData) {
    Auth.authorize(userData.password, userData.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("Ошибка сервера", err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUserAuth(null);
    setLoggedIn(false);
    setActive(false);
  }

  function handleSwitchActivate() {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  const checkToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("no token");
      }
      const user = await Auth.checkToken();
      if (!user) {
        throw new Error("invalid user");
      }
      if (user) {
        setLoggedIn(true);
        setUserAuth(user);
      }
    } catch (err) {
      console.log("Ошибка сервера", err);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((data) => {
          setUserAuth(data)
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log("Ошибка сервера", err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (token) {
      api
        .getAllCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log("Ошибка сервера", err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          user={userAuth}
          handleLogout={handleLogout}
          handleSwitchActivate={handleSwitchActivate}
          active={active}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            checkToken={checkToken}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirm}
          />
          <Route path="/sign-up">
            <div className="page">
              <Register
                title={"Регистрация"}
                link={"/sign-in"}
                buttonText={"Зарегистрироваться"}
                formLinkText={"Уже зарегистрированы? Войти"}
                handleSubmit={handleRegisterUser}
              />
            </div>
          </Route>
          <Route path="/sign-in">
            <div className="page">
              <Login
                title={"Вход"}
                link={"/sign-up"}
                buttonText={"Войти"}
                formLinkText={""}
                handleSubmit={handleAuthorizeUser}
              />
            </div>
          </Route>
        </Switch>

        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>

        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          deletedСard={deletedСard}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isRegisterPopupOpen}
          isRegisterOK={isRegisterOK}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
