// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import '../pages/index.css';

import {handleLikeButton, createCard, updateCardLikes} from './components/card.js'; 
import {openPopup, closePopup} from './components/modal.js';

import {enableValidation, clearValidation} from './components/validation.js';
import {loadUserData, loadCards, updateРrofile, addNewCard, addNewAvatar, deleteCardApi} from './components/api.js';

let globalCardId, globalCard;
// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

const editButton =  document.querySelector('.profile__edit-button');
const addButton =  document.querySelector('.profile__add-button');

const editForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profilName = document.querySelector('.profile__title');
const profiljob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const newAvatarForm = document.querySelector('[name="new-avatar"]');
const newPlaceForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const avatarLinkInput = document.querySelector('.popup__avatar-input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const popupImageTitle = document.querySelector('.popup__caption');
const popupImageImage = document.querySelector('.popup__image');

const saveButtonNewAvatar = document.querySelector('[name="new-avatar-button"]');
const saveButtonNewCard = document.querySelector('[name="new-card-button"]');
const saveButtonProfile = document.querySelector('[name="profile-button"]');

const popupDeleteCard = document.querySelector('.popup_type_delete');
const deletePopupButton =  document.querySelector('.popup__button-delete');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}; 

const userSettings = {
    name: profilName,
    about: profiljob,
    avatar: profileImage,
};

// подключение валидации форм
enableValidation(validationSettings);

// функция вывода карточек
Promise.all([loadUserData(), loadCards()])
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
        const card = createCard(item, deleteCard, handleLikeButton, handleImageShow);
        cardsContainer.append(card);
        // отображение лайкнутых карточек
        updateCardLikes(item);
        // обработка иконки корзины
        if (item.owner._id != userData._id) {
            card.querySelector('.card__delete-button').style.display = 'none';
        }
    });
})
.catch(error => {
    console.error('Ошибка:', error);
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
    //отправка формы на сервер
    saveButtonProfile.textContent = 'Сохранение...';
    updateРrofile(nameInput.value, jobInput.value)
    .then((result) => {
        // Обновляем данные на странице
        userSettings.name.textContent = result.name;
        userSettings.about.textContent = result.about;
        userSettings.avatar.style.backgroundImage = `url(${result.avatar})`;
        closePopup(popupEdit);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        saveButtonProfile.textContent = 'Сохранить';
    }); 
}

// @todo: Отправка формы (новое место)
function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault(); 
    //новая карточка на сервер 
    saveButtonNewCard.textContent = 'Сохранение...';
    addNewCard(placeNameInput.value,linkInput.value)
    .then((result) => {
        const newCard = { name: result.name, link: result.link, _id: result._id};
        // console.log(result._id);
        cardsContainer.prepend(createCard(newCard,deleteCard,handleLikeButton,handleImageShow));
        closePopup(popupNewCard);   
    })
    .catch(error => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        saveButtonNewCard.textContent = 'Сохранить';
    });    
}

// @todo: Отправка формы (новое фото профиля)
function handleNewAvatarFormSubmit(evt) {
    evt.preventDefault();
    saveButtonNewAvatar.textContent = 'Сохранение...';
    addNewAvatar(avatarLinkInput.value)
    .then(data => {
        userSettings.avatar.style.backgroundImage = `url(${data.avatar})`;
        closePopup(popupNewAvatar);   
    })
    .catch(error => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        saveButtonNewAvatar.textContent = 'Сохранить';
    }); 
}

// @todo: Функция открытия карточки
function handleImageShow(title,src) { 
    popupImageTitle.textContent = title;
    popupImageImage.src = src;
    popupImageImage.alt = title;
    openPopup(popupImage);
}

// @todo: Функция удаления карточки
function deleteCard(cardId,card) {  
    openPopup(popupDeleteCard);
    globalCardId = cardId;
    globalCard = card;
}

// обработчик кнопки "Да" в попапе удаления карточки
function handleConfirmDelete(cardId,card) {
    deleteCardApi(cardId)
    .then(() => {
        closePopup(popupDeleteCard);
        card.remove();
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

deletePopupButton.addEventListener('click', () => handleConfirmDelete(globalCardId,globalCard));

// @todo: Изменение фото профиля
profileImage.addEventListener('click', function (evt) {
    newAvatarForm.reset();
    openPopup(popupNewAvatar);
    // очистка ошибок в валидации форм
    clearValidation(popupNewAvatar, validationSettings);
    
});

// @todo: Обработчик открытия окона аватарки
editButton.addEventListener('click', function (evt) {
    nameInput.value = profilName.textContent; 
    jobInput.value = profiljob.textContent;
    openPopup(popupEdit);
    // очистка ошибок в валидации форм
    clearValidation(popupEdit, validationSettings);

});

// @todo: Обработчик открытия окона новой карточки
addButton.addEventListener('click', function (evt) {
    newPlaceForm.reset();
    openPopup(popupNewCard);
    // очистка ошибок в валидации форм
    clearValidation(popupNewCard, validationSettings);
});

// @todo: Обработчик «отправки» формы (аватарка)
editForm.addEventListener('submit', handleEditFormSubmit);

// @todo: Обработчик «отправки» формы (новое место)
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

// @todo: Обработчик «отправки» формы (новое фото профиля)
newAvatarForm.addEventListener('submit', handleNewAvatarFormSubmit);