/*
в файле validation.js описаны функции для валидации форм. 
Из файла экспортируется только функция активации валидации enableValidation и функция очистки ошибок валидации clearValidation;
*/

// показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

// скрывает элемент ошибки
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

//проверяет валидность поля 
const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        let errorMessage = inputElement.validationMessage;
        if (inputElement.validity.patternMismatch) {
        errorMessage = inputElement.getAttribute('data-error-message');
        }
        showInputError(formElement, inputElement, errorMessage, settings);
    } 
    else {
        hideInputError(formElement, inputElement, settings);
    }
};

// проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
const hasInvalidInput = (inputList, settings) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid; 
    });
}

// отключает и включает кнопку
const toggleButtonState = (inputList, buttonElement, settings) => {
    if(hasInvalidInput(inputList, settings)){
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// функция активации валидации
export const enableValidation = (settings) =>{
    let formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement, settings);
    });
}

//функция очистки ошибок валидации
export const clearValidation = (formElement, settings) =>{
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });
    toggleButtonState(inputList, buttonElement, settings);
}