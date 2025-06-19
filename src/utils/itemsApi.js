import { BASE_URL_BACKEND } from './constants';
import { checkResponse } from "./response";

const authHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
});

export const itemsApiGet = () => {
    return fetch(`${BASE_URL_BACKEND}items`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(checkResponse);
};

export const createItems = (params) => {
    const {
        name,
        weather,
        imageUrl
    } = params
    return fetch(`${BASE_URL_BACKEND}items`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ name, weather, imageUrl }),
    }).then(checkResponse);
};

export const deleteItems = (id) => {
    return fetch(`${BASE_URL_BACKEND}items/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(checkResponse);
};




export const addCardLike = (cardId) => {
    return fetch(`${BASE_URL_BACKEND}items/${cardId}/likes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    }).then(checkResponse);
};

export const removeCardLike = (cardId) => {
    return fetch(`${BASE_URL_BACKEND}items/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    }).then(checkResponse);
};
