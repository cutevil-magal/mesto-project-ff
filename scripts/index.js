// @todo: Темплейт карточки

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name; 
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) { 
    card.remove(); 
}
  
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item)); 
});

