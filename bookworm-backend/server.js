// server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Подключаем конфигурацию БД
const sequelize = require('./config/database.js');

// Подключаем модель User
const User = require('./models/user.js');

const app = express();

app.use(cors());
app.use(express.json());

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('✅ Bookworm backend работает!');
});

// Маршрут регистрации
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

// Синхронизация моделей и запуск сервера
const PORT = process.env.PORT || 3002;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Ошибка при синхронизации БД:', err);
  });
