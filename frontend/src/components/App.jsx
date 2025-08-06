import '../index.css';
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'
import api from '../utils/Api.js'
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'
import * as auth from '../utils/Auth.js'
import * as Token from '../utils/Token.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import SignIn from './sign-in/sign-in.jsx'
import SignUp from './sign-up/sign-up.jsx'

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null)
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const jwt = Token.getToken();
    if (!jwt) {
      return;
    }
    if (!isLoggedIn) {
      auth.getUserInfoWithToken(jwt)
        .then((data) => {
          setCurrentUser((currentUser) => {
            return { ...currentUser, email: data.email }
          });
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
    if (isLoggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });

      api.getCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.error('Error fetching cards:', error);
        });
    }
  }, [isLoggedIn]);


  const handleLogin = async () => {
    try {
      const res = await auth.authorize(data.email, data.password);
      Token.setToken(res.token);


      const userInfo = await api.getUserInfo();
      setCurrentUser(userInfo);
      setIsLoggedIn(true);

      navigate('/');

    } catch (error) {
      setIsLoggedIn(false);
      console.error(error);
    }
  };

  const handleLogout = () => {
    Token.removeToken();
    setIsLoggedIn(false);
    setData({
      email: '',
      password: ''
    });
    setCurrentUser({});
    navigate('/sign-in');
  };

  const handleRegister = () => {
    auth.register(data.email, data.password)
      .then(() => {
        setIsSuccess(true);
        setShowTooltip(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setShowTooltip(true);
        if (err.message === 'El usuario ya existe') {
          setIsSuccess(false);
          setShowTooltip(true);
        } else {
          console.error(err);
        }
      });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  };

  function handleClosePopup() {
    setPopup(null);
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, isLiked);

      setCards((prevCards) =>
        prevCards.map((c) => (c._id === updatedCard._id ? updatedCard : c))
      );
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };


  async function handleCardDelete(card) {
    await api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => console.error('Error deleting card:', error));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api.changeUserInfo(data).then((newData) => {
        setCurrentUser(newData),
          handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateProfile(data).then((newData) => {
        setCurrentUser(newData),
          handleClosePopup();
      });
    })();
  }

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.createNewCard(data).then((newCard) => {
        if (newCard) {
          setCards([newCard, ...cards]),
            handleClosePopup();
        } else {
          console.error('Card creation failed or _id missing:', newCard);
        }
      });
    })();
  };


  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleLogin,
        handleRegister,
        handleOpenPopup,
        handleClosePopup,
        popup,
        handleCardLike,
        handleCardDelete,
        cards,
        handleAddPlaceSubmit,
        isLoggedIn,
        setIsLoggedIn,
        setData,
        data,
        isSuccess,
        showTooltip,
        setShowTooltip,
        handleLogout,
      }}>
      <Header />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <div className='page'>
              <Main
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
              />
            </div>
          </ProtectedRoute>
        } />

        <Route path="/sign-in"
          element={
            <SignIn
              onLogin={handleLogin}
            />
          } />

        <Route path="/sign-up"
          element={

            <SignUp
              onRegister={handleRegister}
            />

          } />

        <Route path="*"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
          }
        />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
