// Функции для работы с карточками

// @todo: Функция создания карточки
function createCard(cardData,deleteCard,likeHandler,imageHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title'); 
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const likeButton = cardElement.querySelector('.card__like-button'); 

    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
 
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', likeHandler);
    cardImage.addEventListener('click', () => imageHandler(cardData.name,cardData.link));
    return cardElement;
}

// @todo: Функция лайка карточки
function handleLikeButton(evt) { 
    evt.target.classList.toggle('card__like-button_is-active'); 
}

// @todo: Функция удаления карточки
function deleteCard(card) { 
    card.remove(); 
}

export {handleLikeButton, createCard, deleteCard};

