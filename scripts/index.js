// @todo: Темплейт карточки

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places');
const cardContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function addCard(titleValue, imageValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = titleValue; 
    cardElement.querySelector('.card__image').setAttribute('src', imageValue);

    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', delButton);

    cardContainer.append(cardElement); 
}

// @todo: Функция удаления карточки
function delButton(event) { 
    const cardElement = event.target.closest('.card'); 
    cardElement.remove(); 
}
  
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});

