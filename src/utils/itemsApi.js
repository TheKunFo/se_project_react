import { baseUrl } from './api';



export const itemsApiGet = () => {
    return fetch(`${baseUrl}/items`)
        .then(checkResponse);
};

export const createItems = (item) => {
    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(item),
    })
        .then(checkResponse)
        .then(data => !!data); 
};

export const deleteItems = (id) => {
    return fetch(`${baseUrl}/items/${id}`, {
        method: 'DELETE',
    })
        .then(checkResponse)
        .then(data => !!data);
};

const checkResponse = (res) => {
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
};
