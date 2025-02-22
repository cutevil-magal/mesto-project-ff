// Работa модальных окон

// @todo: Открытие окон 
export function openPopup (popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
    
}

// @todo: Закрытие окон
export function closePopup(popup) { 
    popup.classList.remove('popup_is-opened');  
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEscClose); 
    popup.removeEventListener('click', handleOverlayClose); 
}

// @todo: Закрытие окон по кнопке Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            closePopup(popup)
        }
    }
}

// @todo: Закрытие окон при нажатии на оверлей
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target)
    }
}