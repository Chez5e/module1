// routes/cards.js

const express = require('express');
const router = express.Router();
const { Card, User } = require('../models');

// Получить все карточки
router.get('/', async (req, res) => {
  try {
    const cards = await Card.findAll({ include: User });
    res.json(cards);
  } catch (error) {
    console.error('Ошибка при получении карточек:', error);
    res.status(500).json({ message: 'Ошибка при получении карточек' });
  }
});

// Получить карточку по ID
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id, { include: User });
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    res.json(card);
  } catch (error) {
    console.error('Ошибка при получении карточки:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новую карточку
router.post('/', async (req, res) => {
  const { author, title, type, status, reason, userId } = req.body;

  if (!author || !title || !type || !userId) {
    return res.status(400).json({ message: 'Поля author, title, type и userId обязательны' });
  }

  try {
    const newCard = await Card.create({ author, title, type, status, reason, userId });
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании карточки' });
  }
});

// Обновить карточку
router.put('/:id', async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    await card.update(req.body);
    res.json({ message: 'Карточка обновлена', card });
  } catch (error) {
    console.error('Ошибка при обновлении карточки:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении' });
  }
});

// Удалить карточку
router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    await card.destroy();
    res.json({ message: 'Карточка удалена' });
  } catch (error) {
    console.error('Ошибка при удалении карточки:', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении' });
  }
});

module.exports = router;
