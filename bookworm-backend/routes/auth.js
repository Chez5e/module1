import express from 'express';
const router = express.Router();

let users = []; // Простое хранилище пользователей (для теста)

// Регистрация
router.post('/register', (req, res) => {
  const { fullName, phone, email, login, password } = req.body;

  if (!fullName || !phone || !email || !login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  // Проверка, что логин не занят
  if (users.some(u => u.login === login)) {
    return res.status(409).json({ message: 'Пользователь с таким логином уже существует' });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    phone,
    email,
    login,
    password, // В реальном приложении — хэшируй!
  };

  users.push(newUser);

  // Возвращаем пользователя без пароля
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ user: userWithoutPassword });
});

// Вход (логин)
router.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Неверный логин или пароль' });
  }

  // Заглушка с книгами
  const books = [
    { id: 1, title: 'Война и мир', author: 'Толстой', type: 'Роман' },
    { id: 2, title: 'Преступление и наказание', author: 'Достоевский', type: 'Роман' },
  ];

  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword, books });
});

export default router;
