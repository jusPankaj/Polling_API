const express = require('express')
const questionsRouter = require('./questions');
const optionsRouter = require('./options')
const router = express.Router();

router.use('/questions', questionsRouter);
router.use('/options', optionsRouter);

module.exports = router;