// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import '../pages/index.css';

import {initialCards} from './cards.js';
import {handleLikeButton, handleImageShow, createCard} from './components/card.js';
import {openPopup,closePopup} from './components/modal.js';

// @todo: Вывод карточек
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item,handleLikeButton,handleImageShow)); 
});

// @todo: Открытие окон
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

container.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        nameInput.value = profilName.textContent; 
        jobInput.value = profiljob.textContent;
        openPopup(popupEdit);
    } else if (evt.target.classList.contains('profile__add-button')) {
        placeNameInput.value = '';
        linkInput.value = '';
        openPopup(popupNewCard);
    } 
});

// @todo: Закрытие окон по кнопке
document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', function (evt) {
        closePopup(evt.target.closest('.popup'));
    });
});


// @todo: Обработчик «отправки» формы (аватарка)
const editForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profilName = document.querySelector('.profile__title');
const profiljob = document.querySelector('.profile__description');

function handleEditFormSubmit(evt) {
    evt.preventDefault(); 
    profilName.textContent = nameInput.value;
    profiljob.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
}

editForm.addEventListener('submit', handleEditFormSubmit);

// @todo: Обработчик «отправки» формы (новое место)
const newPlaceForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault(); 
    const newCard = { name: placeNameInput.value, link: linkInput.value }; 
    initialCards.unshift(newCard); 
    cardsContainer.prepend(createCard(newCard,handleLikeButton,handleImageShow)); 
    closePopup(evt.target.closest('.popup'));   
}

newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);
