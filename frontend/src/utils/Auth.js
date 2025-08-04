export const BASE_URL = 'https://api.aroundus-ec.mooo.com/';
import * as token from './Token';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.status === 409) {
                throw new Error('El usuario ya existe');
            }
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            token.setToken(data.token);
            return { success: true, message: 'Usuario registrado correctamente' };
        })
        .catch((err) => {
            throw err;
        })
}

export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: identifier, password })
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => console.log(err))
}

export const getUserInfoWithToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => console.log(err))
}