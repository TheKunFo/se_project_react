import { baseUrl } from './api';

export const itemsApiGet = () => {
    return fetch(`${baseUrl}/items`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch Items');
            }
            return res.json();
        })
        .then((data) => {
            return data
        }).catch((err) => {
            console.log(err)
        })
} 

export const createItems = (item) => {
    return fetch(`${baseUrl}/items`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body : JSON.stringify(item)
    })
    .then(res => res.json())
    .then((data) => {
        return data ? true : false
    })
    .catch((err) => {
        console.log(err)
    })
}

export const deleteItems = (id) => {
    return fetch(`${baseUrl}/items/${id}`,{
        method:'DELETE',
    })
    .then(res => res.json())
    .then((data) => {
        return data ? true : false
    })
    .catch((err) => {
        console.log(err)
    })
}