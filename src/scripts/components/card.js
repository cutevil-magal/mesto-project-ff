// Функции для работы с карточками

import {likeCard, dislikeCard} from './api.js';

// @todo: Функция создания карточки
export function createCard(cardData,deleteCard,likeHandler,imageHandler, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title'); 
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const likeButton = cardElement.querySelector('.card__like-button'); 
    const likeCount = cardElement.querySelector('.card__like-count');

    // для добавление лайков
    cardElement.id = cardData._id;
    likeCount.textContent = (cardData.likes || []).length;

    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    // отображение лайкнутых карточек
    if (cardData.likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // обработка иконки корзины
    if (cardData.owner._id != userId) {
        deleteButton.style.display = 'none';
    }

    deleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
    likeButton.addEventListener('click', (evt) => likeHandler(evt, userId));
    cardImage.addEventListener('click', () => imageHandler(cardData.name,cardData.link));
    return cardElement;
}

// Обновление кол-ва лайков
export const updateCardLikes = (cardData, userId) => {
    const cardElement = document.getElementById(cardData._id);
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    
    if (cardData.likes.some(user => user._id == userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } 
    else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    
    likeCount.textContent = cardData.likes.length;
}

// @todo: Функция лайка карточки
export function handleLikeButton(evt, userId) { 
    const cardElement = evt.target.closest('.card');
    const cardId = cardElement.id;
    if (evt.target.classList.contains('card__like-button_is-active')) {
        dislikeCard(cardId)
        .then(data => updateCardLikes(data, userId))
        .catch(error => {
            console.error('Ошибка:', error);
        });
    } else {
        likeCard(cardId)
        .then(data => updateCardLikes(data, userId))
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
}