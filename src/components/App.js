import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStartLoading, setStartIsLoading] = useState(false);
  const [deletingCard, setDeletingCard] = useState("");

  useEffect(() => {
    setStartIsLoading(true)
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((response) => {
        const [profile, cards] = response;
        //fill profile elemements
        setCurrentUser(profile);
        //fill cards elemements
        const items = cards.map((item) => ({
          key: item._id,
          cardId: item._id,
          ownerId: item.owner._id,
          likes: item.likes.length,
          like: item.likes,
          name: item.name,
          src: item.link,
        }));
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setStartIsLoading(false);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const cardId = card.cardId;
    const isLiked = card.like.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        const newCardFormat = {
          key: newCard._id,
          cardId: newCard._id,
          ownerId: newCard.owner._id,
          likes: newCard.likes.length,
          like: newCard.likes,
          name: newCard.name,
          src: newCard.link,
        };
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) =>
          c.cardId === cardId ? newCardFormat : c
        );
        // Обновляем стейт
        handleUpdateCard({ newCards });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    const withoutDeleted = cards.filter((с) => card !== с.cardId);
    api
      .deleteCard(card)
      .then(() => {
        setCards(withoutDeleted);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateCard(newCards) {
    const updatedCards = newCards.newCards;
    const items = updatedCards.map((item) => ({
      key: item.key,
      cardId: item.cardId,
      ownerId: item.ownerId,
      likes: item.likes,
      like: item.like,
      name: item.name,
      src: item.src,
    }));
    setCards(items);
  }

  function handleUpdateUser(newProfile) {
    setIsLoading(true);
    api
      .setUserInfo(newProfile.name, newProfile.about)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api
      .setAvatar(avatarLink.avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .insertCard(newPlace.place, newPlace.link)
      .then((newCard) => {
        const newCardFormat = {
          key: newCard._id,
          cardId: newCard._id,
          ownerId: newCard.owner._id,
          likes: newCard.likes.length,
          like: newCard.likes,
          name: newCard.name,
          src: newCard.link,
        };
        setCards([newCardFormat, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (props) => {
    setIsPlacePopupOpen(true);
    setSelectedCard(props);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeletePlaceClick = (props) => {
    setDeletingCard(props.cardId);
    setIsDeletePlacePopupOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {/* handlers of the page buttons */}
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeletePlaceClick}
          onCardLike={handleCardLike}
          isStartLoading={isStartLoading}
        />

        {/* PopUp for PROFILE Editing */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        {/* PopUp for AVATAR Editing */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        {/* PopUp for CARD Adding */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        {/* PopUp for CARD Deleting */}
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDeleteCard={handleCardDelete}
          deletingCard={deletingCard}
        />

        <ImagePopup
          isOpen={isPlacePopupOpen}
          onClose={closeAllPopups}
          name={selectedCard.name}
          src={selectedCard.src}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
