// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import '../pages/index.css';

import {initialCards} from './cards.js';
import {handleLikeButton, createCard, deleteCard} from './components/card.js';
import {openPopup,closePopup} from './components/modal.js';

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editButton =  document.querySelector('.profile__edit-button');
const addButton =  document.querySelector('.profile__add-button');

const editForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profilName = document.querySelector('.profile__title');
const profiljob = document.querySelector('.profile__description');

const newPlaceForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const popupImageTitle = document.querySelector('.popup__caption');
const popupImageImage = document.querySelector('.popup__image');


// @todo: Вывод карточек
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item,deleteCard,handleLikeButton,handleImageShow)); 
});

// @todo: Закрытие окон по кнопке
document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', function (evt) {
        closePopup(evt.target.closest('.popup'));
    });
});

// @todo: Отправка формы (аватарка)
function handleEditFormSubmit(evt) {
    evt.preventDefault(); 
    profilName.textContent = nameInput.value;
    profiljob.textContent = jobInput.value;
    closePopup(popupEdit);
}

// @todo: Отправка формы (новое место)
function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault(); 
    const newCard = { name: placeNameInput.value, link: linkInput.value }; 
    cardsContainer.prepend(createCard(newCard,deleteCard,handleLikeButton,handleImageShow)); 
    closePopup(popupNewCard);   
}

// @todo: Функция открытия карточки
function handleImageShow(title,src) { 
    popupImageTitle.textContent = title;
    popupImageImage.src = src;
    popupImageImage.alt = title;
    openPopup(popupImage);
}

// @todo: Обработчик открытия окона аватарки
editButton.addEventListener('click', function (evt) {
    nameInput.value = profilName.textContent; 
    jobInput.value = profiljob.textContent;
    openPopup(popupEdit);
});

// @todo: Обработчик открытия окона новой карточки
addButton.addEventListener('click', function (evt) {
    newPlaceForm.reset();
    openPopup(popupNewCard);
});

// @todo: Обработчик «отправки» формы (аватарка)
editForm.addEventListener('submit', handleEditFormSubmit);

// @todo: Обработчик «отправки» формы (новое место)
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);