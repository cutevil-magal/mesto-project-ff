# Mesto — Социальная сеть для обмена фотографиями

**Полнофункциональное React-приложение для обмена фотографиями с возможностью лайков и комментариев**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)
[![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)

---

## 📖 О проекте

Я разработала полнофункциональное React-приложение Mesto — социальную сеть для обмена фотографиями с возможностью лайков, комментариев и управления профилем. Проект демонстрирует современные подходы к фронтенд-разработке с использованием компонентной архитектуры и REST API.

### 🎯 Ключевые особенности

- **Полноценная авторизация** и управление профилем пользователя
- **Динамическая загрузка** и отображение фотографий
- **Система лайков** и взаимодействия с контентом
- **Модальные окна** для редактирования профиля и добавления контента
- **Валидация форм** на стороне клиента
- **Адаптивный дизайн** для мобильных устройств

### 🛠 Технологический стек

**Frontend:**
- React (функциональные компоненты, хуки)
- JavaScript (ES6+)
- CSS3 (Flexbox, Grid, BEM методология)
- Webpack (сборка проекта)

**Backend Integration:**
- REST API взаимодействие
- Асинхронные запросы (fetch)
- JWT-авторизация
- Обработка ошибок

**Особенности реализации:**
- Компонентный подход с разделением ответственности
- Управление состоянием через React hooks
- Кастомные хуки для API взаимодействия
- Оптимизированная производительность
- Доступность (a11y)

---

## 🚀 Быстрый старт

### Посмотреть онлайн

🌐 **[Живая демо-версия](https://cutevil-magal.github.io/mesto-project-ff/)**

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
│   ├── components/     # React компоненты
│   ├── hooks/          # Кастомные хуки
│   ├── utils/          # Вспомогательные функции
│   ├── styles/         # Стили и CSS модули
│   └── api/           # API взаимодействие
├── public/            # Статические файлы
└── build/             # Собранная версия
```

---

## 🎨 Особенности реализации

### Компонентная архитектура
```jsx
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  return (
    <div className="page">
      <Header />
      <Main 
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
    </div>
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

### Валидация форм
```javascript
const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  return { values, errors, isValid, handleChange };
};
```

---

## 🎯 Результаты реализации

**Достигнутые цели:**
- ✅ Полнофункциональное SPA приложение
- ✅ Интеграция с REST API
- ✅ Управление состоянием через React
- ✅ Адаптивный и доступный интерфейс
- ✅ Оптимизированная производительность

**Технические преимущества:**
- Современная компонентная архитектура
- Чистый и поддерживаемый код
- Обработка ошибок и loading states
- Валидация на стороне клиента
- Оптимизированные перерисовки

---

## 🔮 Планы по развитию

- [ ] Добавить TypeScript для типизации
- [ ] Реализовать PWA-функциональность
- [ ] Добавить систему комментариев
- [ ] Интегрировать WebSocket для real-time updates
- [ ] Добавить тестирование (Jest, React Testing Library)
- [ ] Оптимизировать bundle size

---

## 👩‍💻 Разработчик

**Анна Хвостикова** - Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cutevil-magal)
[![Email](https://img.shields.io/badge/Email-ana.magal@yandex.by-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ana.magal@yandex.by)

---

## 📄 Лицензия

Проект создан на основе дизайн-макета. Исходный код доступен для ознакомления и обучения.

**Макет в Figma:** [Ссылка на дизайн](https://www.figma.com/design/BOu4PyRg0j7B70CHFy6jY3/5-%D1%81%D0%BF%D1%80%D0%B8%D0%BD%D1%82.-JavaScript?node-id=0-1)
---
