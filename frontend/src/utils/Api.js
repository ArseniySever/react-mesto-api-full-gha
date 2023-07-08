class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._parseResponse(res));
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  setLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  editUserInfo(name, desc) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    }).then((res) => this._parseResponse(res));
  }

  editAvatar({ url }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this._parseResponse(res));
  }
}
const apiSettings = {
  baseUrl: 'http://localhost:4000',
  headers: {
    authorization: "b1be6ff6-5ee2-4424-9627-8adc5e79825a",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiSettings);

export default api;
