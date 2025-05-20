// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// БД и модели
const db = require('./models');
const { User, Card } = db;

// Маршруты карточек
const cardsRouter = require('./routes/cards');

// Конфиг БД (необязательно, т.к. подключён в models), но оставим для sync
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Роуты
app.use('/cards', cardsRouter);

// Тест
app.get('/', (req, res) => {
  res.send('✅ Bookworm backend работает!');
});

// Регистрация
app.post('/register', async (req, res) => {
  const { fullName, phone, email, login, password } = req.body;

  if (!fullName || !phone || !email || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const existingUser = await User.findOne({ where: { login } });
    if (existingUser) {
      return res.status(409).json({ message: 'Логин уже занят' });
    }

    const newUser = await User.create({ fullName, phone, email, login, password });
    res.status(201).json({ message: 'Регистрация успешна', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Вход
app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }
  try {
    const user = await User.findOne({ where: { login, password } });
    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }
    res.json({ message: 'Успешный вход', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3002;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
  })
  .catch(err => console.error('Ошибка при синхронизации БД:', err));