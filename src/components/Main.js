import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';
import Spinner from './Spinner/Spinner';

function Main(props) {

  const [userName, setUserName] = useState()
  const [userDescription, setUserDescription] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    api.getAvatarInfo()
      .then(response => {
        setUserName(response.name)
        setUserDescription(response.about)
        setUserAvatar(response.avatar)
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    api.getInitialCards()
      .then(response => {
        const items = response.map(item => ({
          key: item._id,
          ownerId: item.owner._id,
          likes: item.likes.length,
          name: item.name,
          src: item.link
        }))
        setCards(items);
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main id='abc' className="content">
      <section className="profile">
        <div className="profile__info">
          <button onClick={props.onEditAvatar} className="profile__avatar">
            <div className="profile__overlay">
              <div className="profile__avatar-edit"></div>
            </div>
            <img
              style={{
                margin: 0,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                backgroundImage: `url(${userAvatar})`
              }}
            />
          </button>
          <div className="profile__author">
            <div className="profile__edit-line">
              <h1 className="profile__title">{userName}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__btn-edit"></button>
            </div>
            <h2 className="profile__subtitle">{userDescription}</h2>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__btn-add"></button>
      </section>
      <section className="photo-grid">
        {isLoading
          ? <Spinner />
          : cards.map(card => <Card {...card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} />)
        }
      </section>
    </main>
  )
}

export default Main;