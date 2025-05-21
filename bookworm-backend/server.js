import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const cards = [
  { id: 1, title: 'Война и мир', author: 'Толстой', type: 'Роман' },
  { id: 2, title: 'Преступление и наказание', author: 'Достоевский', type: 'Роман' },
];

// Регистрация
app.post('/auth/register', (req, res) => {
  const { fullName, phone, email, login, password } = req.body;
  if (!fullName || !phone || !email || !login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  if (users.find(u => u.login === login)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  const newUser = { id: Date.now(), fullName, phone, email, login, password };
  users.push(newUser);
  res.json({ user: { id: newUser.id, fullName, login } });
});

// Логин
app.post('/auth/login', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Неверный логин или пароль' });
  }
  res.json({ user: { id: user.id, fullName: user.fullName, login: user.login } });
});

// Получение карточек
app.get('/cards', (req, res) => {
  res.json(cards);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
