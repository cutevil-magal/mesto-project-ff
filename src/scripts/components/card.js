// Функции для работы с карточками

import {openPopup} from '../components/modal.js';
import {popupImage} from '../index.js';

// @todo: Функция создания карточки
function createCard(cardData,likeHandler,imageHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title'); 
    const cardImageSrc = cardElement.querySelector('.card__image');
    const cardImageAlt = cardElement.querySelector('.card__image');

    cardTitle.textContent = cardData.name; 
    cardImageSrc.src = cardData.link;
    cardImageAlt.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button'); 
    likeButton.addEventListener('click', likeHandler);

    const imageShow = cardElement.querySelector('.card__image'); 
    imageShow.addEventListener('click', () => imageHandler(cardTitle.textContent,cardImageSrc.src,cardImageAlt.alt));
    
    return cardElement;
}

// @todo: Функция лайка карточки
function handleLikeButton(evt) { 
    evt.target.classList.toggle('card__like-button_is-active'); 
}

// @todo: Функция открытия карточки
function handleImageShow(title,src,alt) { 
    document.querySelector('.popup__caption').textContent = title;
    document.querySelector('.popup__image').src = src;
    document.querySelector('.popup__image').alt = alt;
    openPopup(popupImage);
}

// @todo: Функция удаления карточки
function deleteCard(card) { 
    card.remove(); 
}

export {handleLikeButton, handleImageShow, createCard};

