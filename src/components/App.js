import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import api from '../utils/Api';
import ImagePopup from './ImagePopup';

let isEditProfilePopupOpen = false;
let isAddPlacePopupOpen = false;
let isEditAvatarPopupOpen = false;

function App() {

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
    setIsPlacePopupOpen(false)
    setIsDeletePlacePopupOpen(false);
    setSelectedCard({});
  }

  const handleCardClick = (props) => {
    setIsPlacePopupOpen(true);
    setSelectedCard(props); 
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeletePlaceClick = () => {
    setIsDeletePlacePopupOpen(true);
  };

  return (
    <div className="page">
      <Header />
      
      {/* handlers of the page buttons */}
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onDeletePlace={handleDeletePlaceClick} onCardDelete={handleDeletePlaceClick} />

      {/* PopUp for PROFILE Editing */}
      <PopupWithForm isOpen={isEditProfilePopupOpen} name={'editProfileForm'} title={'Редактировать профиль'} onClose={closeAllPopups}>
        {
          <>
            <div className="popup__field popup__field_info_name">
              <input
                type="text"
                placeholder="Имя"
                className="popup__text"
                name="name"
                id="name"
                minLength="2"
                maxLength="40"
                pattern="^[а-яА-ЯёЁa-zA-Z\s\-]+$"
                required
              />
              <span id="name-error" className="popup__input"></span>
            </div>
            <div className="popup__field popup__field_info_other">
              <input
                type="text"
                placeholder="Род занятий"
                className="popup__text"
                name="about"
                id="about"
                minLength="2"
                maxLength="200"
                required
              />
              <span id="about-error" className="popup__input"></span>
            </div>
          </>
        }
      </PopupWithForm>

      {/* PopUp for AVATAR Editing */}
      <PopupWithForm isOpen={isEditAvatarPopupOpen} name={'editAvatarForm'} title={'Обновить аватар'} onClose={closeAllPopups}>
        {
          <div className="popup__field popup__field_info_other">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              className="popup__text"
              name="link"
              id="link"
              required
            />
            <span id="link-error" className="popup__input"></span>
          </div>
        }
      </PopupWithForm>

      {/* PopUp for CARD Adding */}
      <PopupWithForm isOpen={isAddPlacePopupOpen} name={'addCardForm'} title={'Новое место'} onClose={closeAllPopups}>
        {
          <>
            <div className="popup__field popup__field_info_name">
              <input
                type="text"
                placeholder="Название"
                className="popup__text"
                name="name"
                id="place"
                minLength="1"
                maxLength="30"
                required
              />
              <span id="place-error" className="popup__input"></span>
            </div>
            <div className="popup__field popup__field_info_other">
              <input
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__text"
                name="link"
                id="link"
                required
              />
              <span id="link-error" className="popup__input"></span>
            </div>
          </>
        }
      </PopupWithForm>

      {/* PopUp for CARD Deleting */}
      <PopupWithForm isOpen={isDeletePlacePopupOpen} name={'deleteCardForm'} title={'Вы уверены?'} onClose={closeAllPopups} />

      <ImagePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} name={selectedCard.name} src={selectedCard.src} />
      <Footer />
    </div>
  );
}

export default App;
