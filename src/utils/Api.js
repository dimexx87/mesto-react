class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  setUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  setAvatar(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  insertCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "42ce0924-10a6-4b78-98b5-287f3f244b55",
    "Content-Type": "application/json",
  },
});

export default api;
