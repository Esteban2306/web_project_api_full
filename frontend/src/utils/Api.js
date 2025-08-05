class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _makefetch(path, method, data) {
        return fetch(`${this._baseUrl}/${path}`, {
            method: method,
            headers: {
                ...this._headers,
                authorization: 'Bearer ' + localStorage.getItem('Token'),
            },
            body: method !== 'GET' ? JSON.stringify(data) : null
        })
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _catchError(err) {
        console.error('Error:', err);
    }

    getCards() {
        return this._makefetch('cards', 'GET')
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    getUserInfo() {
        return this._makefetch('users/me', 'GET')
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    changeUserInfo(data) {
        return this._makefetch('users/me', 'PATCH', data)
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    createNewCard(data) {
        return this._makefetch('cards', 'POST', data)
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    deleteCard(cardId) {
        return this._makefetch(`cards/${cardId}`, 'DELETE')
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._makefetch(`cards/${cardId}/like`, isLiked ? 'DELETE' : 'PUT')
            .then(this._checkResponse)
            .catch(this._catchError);
    }

    updateProfile(data) {
        return this._makefetch('users/me/avatar', 'PATCH', data)
            .then(this._checkResponse)
            .catch(this._catchError);
    }
}


const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: 'Bearer ' + localStorage.getItem('Token'),
    }
});

export default api;
// This code defines an API class that handles requests to a server