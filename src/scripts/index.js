import '../pages/index.css';
import {initialCards} from './cards.js';


const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

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
    behaviorPopup(popupImage);
}

// @todo: Функция удаления карточки
function deleteCard(card) { 
    card.remove(); 
}

// @todo: Функция вывода карточек
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item,handleLikeButton,handleImageShow)); 
});


// @todo: Открытие окон
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

container.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        nameInput.value = profilName.textContent; 
        jobInput.value = profiljob.textContent;
        behaviorPopup(popupEdit);
    } else if (evt.target.classList.contains('profile__add-button')) {
        placeNameInput.value = '';
        linkInput.value = '';
        behaviorPopup(popupNewCard);
    } 
});

// @todo: Функция поведения модальных окон (при открытии)
function behaviorPopup (popup){
    // popup.style.display = "flex";
    popup.classList.remove('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
    
}

// @todo: Закрытие окон по кнопке
function closePopup(popup) { 
    // popup.style.display = "none";  
    popup.classList.remove('popup_is-opened');  
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEscClose); 
    popup.removeEventListener('click', handleOverlayClose); 
}

document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', function (evt) {
        closePopup(evt.target.closest('.popup'));
    });
});

// @todo: Закрытие окон по кнопке Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup)
        }
    }
}

// @todo: Закрытие окон при нажатии на оверлей
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target)
    }
}

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
    cardsContainer.prepend(createCard(newCard,handleLikeButton)); 
    closePopup(evt.target.closest('.popup'));   
}

newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);
