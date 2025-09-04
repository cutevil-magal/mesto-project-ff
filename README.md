# Mesto — Социальная сеть для обмена фотографиями

**Полнофункциональное React-приложение для обмена фотографиями с возможностью лайков и комментариев**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)
[![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)

---

## 📖 О проекте

Mesto — это двухэтапный проект, демонстрирующий эволюцию от нативного JavaScript к современному React-приложению. Я разработала полнофункциональную социальную сеть для обмена фотографиями с возможностью лайков, комментариев и управления профилем.

### 🔄 Два этапа разработки

**🎯 Этап 1: Нативный JavaScript + Webpack**
- Создание инфраструктурного окружения с помощью Webpack
- Модульная архитектура на чистом JavaScript
- Реализация модальных окон, валидации форм, взаимодействия с карточками
- Оптимизация сборки и производительности

**⚛️ Этап 2: Миграция на React**
- Переход на компонентную архитектуру React
- Использование функциональных компонентов и хуков
- Интеграция с REST API
- Улучшение производительности и UX

---

## 🎯 Ключевые особенности

### Функциональность
- **🔐 Авторизация** и управление профилем пользователя
- **🖼️ Динамическая загрузка** и отображение фотографий
- **❤️ Система лайков** и взаимодействия с контентом
- **📝 Модальные окна** для редактирования профиля и добавления контента
- **✅ Валидация форм** на стороне клиента
- **📱 Адаптивный дизайн** для мобильных устройств

### Архитектурные преимущества
- **🚫 Нет дублирования кода** - функции переиспользуются
- **🎯 Принцип единственной ответственности** - каждая функция решает одну задачу
- **💾 Оптимизация памяти** - обработчики корректно добавляются/удаляются
- **📦 Модульная структура** - четкое разделение ответственности

---

## 🛠 Технологический стек

### Frontend
- **React** (функциональные компоненты, хуки)
- **JavaScript** (ES6+ модули, асинхронные функции)
- **CSS3** (Flexbox, Grid, BEM методология)
- **Webpack** (сборка проекта, обработка assets)

### Backend Integration
- **REST API** взаимодействие
- **Fetch API** для асинхронных запросов
- **JWT-авторизация**
- **Обработка ошибок** и loading states

### Особенности реализации
- **Компонентный подход** с разделением ответственности
- **Кастомные хуки** для API взаимодействия и валидации
- **Оптимизированные перерисовки** и производительность
- **Доступность (a11y)** и семантическая верстка

---

## 🚀 Быстрый старт

### Запуск локально

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/cutevil-magal/mesto-project-ff.git
   cd mesto-project-ff
   ```

2. **Установка зависимостей**
   ```bash
   npm install
   ```

3. **Запуск development сервера**
   ```bash
   npm start
   ```

4. **Сборка production версии**
   ```bash
   npm run build
   ```

### Системные требования
- Node.js 14+
- Современный браузер с поддержкой ES6+
- Доступ к интернету для работы с API

---

## 📁 Структура проекта

```
mesto-project-ff/
├── src/
│   ├── blocks/            # БЭМ-блоки стилей
│   ├── images/            # Изображения
│   ├── pages/             # Страницы
│   ├── scripts/           # JavaScript модули
│   ├── vendor/            # Сторонние библиотеки
│   └── index.html         # Главная HTML-страница
├── public/               # Статические файлы
└── build/               # Собранная версия
```

---

## 🎨 Особенности реализации

### Модульная архитектура (Этап 1)
```javascript
// card.js - модуль для работы с карточками
export function createCard(cardData, handlers) {
  // Создание DOM-элемента карточки
  return cardElement;
}

export function handleLike(evt) {
  // Обработка лайка
}

export function handleDelete(evt) {
  // Обработка удаления
}
```

### Управление модальными окнами
```javascript
// modal.js - модуль для работы с модальными окнами
export function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscape);
}

export function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscape);
}
```

### React компоненты (Этап 2)
```jsx
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUser.Provider>
  );
}
```

### API взаимодействие
```javascript
export const api = {
  getUserInfo: () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }).then(checkResponse);
  },
  
  updateUserInfo: (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    }).then(checkResponse);
  }
};
```

---

## 🎯 Результаты реализации

### Достигнутые цели
- ✅ **Полнофункциональное SPA** приложение
- ✅ **Плавная миграция** с нативного JS на React
- ✅ **REST API интеграция** с обработкой ошибок
- ✅ **Адаптивный интерфейс** с доступностью
- ✅ **Оптимизированная производительность**

### Технические преимущества
- **Современная архитектура** с разделением ответственности
- **Чистый код** без дублирования
- **Обработка ошибок** и loading states
- **Валидация форм** на стороне клиента
- **Оптимизированная сборка** Webpack

---

## 🔮 Планы по развитию

- [ ] **TypeScript** для статической типизации
- [ ] **PWA-функциональность** для оффлайн работы
- [ ] **Система комментариев** и тегов
- [ ] **WebSocket** для real-time обновлений
- [ ] **Тестирование** (Jest, React Testing Library)
- [ ] **Оптимизация bundle size** и загрузки

---

## 👩‍💻 Разработчик

**Анна Хвостикова** - Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cutevil-magal)
[![Email](https://img.shields.io/badge/Email-ana.magal@yandex.by-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ana.magal@yandex.by)

---

## 📄 Лицензия

Проект создан на основе дизайн-макета Яндекс.Практикума. Исходный код доступен для ознакомления и обучения.

**Макет в Figma:** [Ссылка на дизайн](https://www.figma.com/design/BOu4PyRg0j7B70CHFy6jY3/5-%D1%81%D0%BF%D1%80%D0%B8%D0%BD%D1%82.-JavaScript?node-id=0-1)

---

Теперь README полностью отражает оба этапа разработки и показывает эволюцию проекта от нативного JavaScript к современному React-приложению.
