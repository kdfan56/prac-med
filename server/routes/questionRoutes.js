const express = require('express');
const router = express.Router();
const { getQuestions, getDemoQuestions, seedQuestions } = require('../controllers/questionController');

// GET  /api/questions/demo  — public, no auth
router.get('/demo', getDemoQuestions);

// GET  /api/questions?category=...&subCategory=...&source=...&chapter=...&limit=10
router.get('/', getQuestions);

// POST /api/questions/seed
router.post('/seed', seedQuestions);

module.exports = router;