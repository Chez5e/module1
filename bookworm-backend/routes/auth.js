const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Подключаем модель User

// Регистрация
router.post('/register', async (req, res) => {
  const { fullName, phone, email, login, password } = req.body;
  if (!fullName || !phone || !email || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  try {
    // Проверка, есть ли уже такой логин
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }
    const user = await User.create({ fullName, phone, email, login, password });
    res.status(201).json({ message: 'Регистрация успешна', user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

// Логин
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }
  try {
    const user = await User.findOne({ where: { login, password } }); // Просто для простоты, без хешей
    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }
    res.json({ message: 'Успешный вход', user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
});

module.exports = router;
