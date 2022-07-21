class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(this._checkResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(this._checkResponse)
  }

  editProfile(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
       }),
    })
      .then(this._checkResponse)
  }

  postCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(this._checkResponse)
  }

  deleteMyCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked, token) {
    if(!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(this._checkResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(this._checkResponse)
    }
  }

  changeAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
}

export const api = new Api({
  baseUrl: "https://api.glazunovavaleria.nomoredomains.xyz",
});
