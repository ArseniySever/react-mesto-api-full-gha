import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import "../index.css";
import api from "../utils/Api";
import * as Auth from "../utils/Auth";
import PopupAvatar from "./PopupAvatar";
import PopupProfile from "./PopupProfile";
import PopupPlace from "./PopupPlace";
import PopupDelete from "./PopupDelete";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isPopupPlaceOpen, setPopupPlaceOpen] = React.useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = React.useState(false);
  const [isPopupProfileOpen, setIsPopupProfileOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [tooltipData, setTooltipData] = React.useState({
    status: false,
    title: '',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);
  React.useEffect(() => {
    Auth
      .getContent()
      .then((data) => {
        if (data) {
          setEmail(data.data.email);
          setCurrentUser(data);
          navigate('/singin', { replace: true });

        }
      })
      .catch(console.error);
  }, [navigate]);

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function onEditAvatar() {
    setIsPopupAvatarOpen(true);
  }
  function onEditProfile() {
    setIsPopupProfileOpen(true);
  }
  function onAddPlace() {
    setPopupPlaceOpen(true);
  }
  function closeAllPopups() {
    setPopupPlaceOpen(false);
    setIsPopupAvatarOpen(false);
    setIsPopupProfileOpen(false);
    setSelectedCard({ isOpen: false });
    setIsTooltipOpen(false);
  }
  function handleUpdateUser(name, description) {
    api
      .editUserInfo(name, description)
      .then((newinfo) => {
        setCurrentUser(newinfo.user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err} in editUserAvatar`));
  }
  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((result) => {
        setCurrentUser(result.user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err} in editUserAvatar`));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })

      .catch((err) => console.log(`Error ${err} in addCard`));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(card.likes);

    api
      .setLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        console.log(card._id);
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  const handleLogout = () => {
    setAuthToken(null);
    setLoggedIn(false);
  };
  function handleSignin(email, password) {
    Auth.authorization(email, password)
      .then(data => {
        if (data) {
          setLoggedIn(true);
          setEmail(data.email);
          navigate('/', { replace: true });

        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleRegister(email, password) {
    if (email && password) {
      Auth.registration(email, password)
        .then((res) => {
          setIsTooltipOpen(true);
          setTooltipData({
            status: true,
            title: 'Вы успешно зарегистрировались!',
          });
          navigate('/sign-in', { replace: true });
          handleLogin(email, password);
        })
        .catch((err) => {
          setIsTooltipOpen(true);
          setTooltipData({
            status: false,
            title: 'Что-то пошло не так! Попробуйте ещё раз.',
          });
        });
    }
  };




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-in" element={<Login onSignin={handleSignin} />} />
          <Route path="/sign-up" element={<Register onRegist={handleRegister} />} />
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}
            component={Main}
            onEditAvatar={onEditAvatar}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            email={currentUser.email}
            onLogout={handleLogout}
          />
          }
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
        </Routes>

        <Footer />

        <PopupAvatar
          isOpen={isPopupAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupProfile
          isOpen={isPopupProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupPlace
          isOpen={isPopupPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          cardLink={selectedCard.link}
          cardName={selectedCard.name}
          onClose={closeAllPopups}
          isOpen={selectedCard.isOpen}
        />
        <PopupDelete />

        <InfoTooltip
          name="tooltip"
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          status={tooltipData.status}
          title={tooltipData.title}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}



export default App;
