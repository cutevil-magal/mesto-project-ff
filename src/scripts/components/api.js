// в файле api.js описаны функции для взаимодействия с сервером;

export let userId;

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: '5ded11c8-bc49-4cf5-af60-91d92b381969',
        'Content-Type': 'application/json'
    }
}

// Загрузка информации о пользователе
export const loadUserData = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(res =>res.ok ? res.json() : Promise.reject('Ошибка...'))
    .then(userData => {
        userId = userData._id;
        return userData;
    })
}

// Загрузка карточек
export const loadCards = () =>{
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// Редактиование профиля
export const updateРrofile = (newName, newAbout) =>{
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout,
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// Добавление новой карточки
export const addNewCard = (newName, newLink) =>{
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            link: newLink,
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// удаление карточки
export const deleteCardApi = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// Добавление лайка
export const likeCard = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// Снятие лайка
export const dislikeCard = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}

// Обновление аватара пользователя
export const addNewAvatar = (newLink) =>{
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newLink,
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка...'))
}