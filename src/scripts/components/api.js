// в файле api.js описаны функции для взаимодействия с сервером;

import {handleLikeButton, createCard, deleteCard} from './card.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: '5ded11c8-bc49-4cf5-af60-91d92b381969',
        'Content-Type': 'application/json'
    }
}

// Загрузка информации о пользователе и карточек с сервера
export const loadUserDataAndCards = (userSettings, cardsContainer, handleImageShow) =>{
    const urls = [
        `${config.baseUrl}/users/me`,
        `${config.baseUrl}/cards`,
    ];
    // Преобразуем каждый URL в промис, возвращённый fetch
    let requests = urls.map(url => fetch(url, {
            method: "GET",
            headers: config.headers
        })
    );
    // Promise.all будет ожидать выполнения всех промисов
    return Promise.all(requests)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const [userData, cardsData] = data;
            // Обновляем информацию о пользователе
            userSettings.name.textContent = userData.name;
            userSettings.about.textContent = userData.about;
            userSettings.avatar.style.backgroundImage = `url(${userData.avatar})`;
            // Очищаем контейнер перед добавлением карточек
            cardsContainer.innerHTML = '';
            // Выводим карточки
            cardsData.forEach(item => {
                let card = createCard(item, deleteCard, handleLikeButton, handleImageShow);
                cardsContainer.append(card);
                // отображение лайков
                card.querySelector('.card__like-count').textContent = item.likes.length;
                // отображение лайкнутых карточек
                updateCardLikes(item);
                // обработка иконки карзины
                if(item.owner._id != userData._id){
                    card.querySelector('.card__delete-button').style.display = 'none';
                } 
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Редактиование профиля
export const updateРrofile = (newName, newAbout, userSettings) =>{
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((result) => {
        // Обновляем данные на странице
        userSettings.name.textContent = result.name;
        userSettings.about.textContent = result.about;
        userSettings.avatar.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Добавление новой карточки
export const addNewCard = (newName, newLink, userSettings, cardsContainer, handleImageShow) =>{
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            link: newLink,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((result) => {
        const newCard = { name: result.name, link: result.link };
        cardsContainer.prepend(createCard(newCard,deleteCard,handleLikeButton,handleImageShow));
        loadUserDataAndCards(userSettings, cardsContainer, handleImageShow);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// удаление карточки
export const deleteCardApi = (cardId) =>{
    fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Добавление лайка
export const likeCard = (cardId) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => updateCardLikes(data))
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Снятие лайка
export const dislikeCard = (cardId) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => updateCardLikes(data))
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Обновление кол-ва лайков
export const updateCardLikes = (cardData) => {
    let cardElement = document.getElementById(cardData._id);
    let likeButton = cardElement.querySelector('.card__like-button');
    let likeCount = cardElement.querySelector('.card__like-count');
    
    if (cardData.likes.some(user => user._id === 'e139fbe76f07dd2c7d0ce9f5')) {
        likeButton.classList.add('card__like-button_is-active');
    } 
    else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    
    likeCount.textContent = cardData.likes.length;
}

// Обновление аватара пользователя
export const addNewAvatar = (newLink,userSettings) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newLink,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => {
        userSettings.avatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}
