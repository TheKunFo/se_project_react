import { BASE_URL_BACKEND } from "./constants";
import { checkResponse } from "./response";

export const regiter = (params) => {
    const {
        email,
        password,
        name,
        avatar
    } = params
    return fetch(`${BASE_URL_BACKEND}signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, avatar }),
    }).then(checkResponse)
}

export const login = (params) => {
    const {
        email,
        password,
    } = params

    return fetch(`${BASE_URL_BACKEND}signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse)
}

export const checkToken = (token) =>
    fetch(`${BASE_URL_BACKEND}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.ok ? res.json() : Promise.reject(res));


