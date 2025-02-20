// Функции для работы с карточками
import {openPopup, closePopup} from './modal.js';
import {deleteCardApi, likeCard, dislikeCard} from './api.js';

const popupDeleteCard = document.querySelector('.popup_type_delete');
const deletePopupButton =  document.querySelector('.popup__button-delete');

// @todo: Функция создания карточки
function createCard(cardData,deleteCard,likeHandler,imageHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title'); 
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const likeButton = cardElement.querySelector('.card__like-button'); 

    // для добавление лайков
    cardElement.id = cardData._id;

    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
 
    deleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
    likeButton.addEventListener('click', likeHandler);
    cardImage.addEventListener('click', () => imageHandler(cardData.name,cardData.link));
    return cardElement;
}

// @todo: Функция лайка карточки
function handleLikeButton(evt) { 
    let cardElement = evt.target.closest('.card');
    let cardId = cardElement.id;
    if (evt.target.classList.contains('card__like-button_is-active')) {
        dislikeCard(cardId);
    } else {
        likeCard(cardId);
    }
}

// @todo: Функция удаления карточки
function deleteCard(cardId,card) {  
    openPopup(popupDeleteCard);
    deletePopupButton.addEventListener('click', () => handleConfirmDelete(cardId,card));
}

// обработчик кнопки "Да" в попапе удаления карточки
function handleConfirmDelete(cardId,card) {
    deleteCardApi(cardId);
    closePopup(popupDeleteCard);
    card.remove();
}

export {handleLikeButton, createCard, deleteCard};