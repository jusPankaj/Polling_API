const express = require('express')

const createOptions = require('../controller/QuestionsController')
const showDetails = require('../controller/QuestionsController')
const deleteOption = require('../controller/QuestionsController')

const router = express.Router();


router.post('/create', createOptions);
router.delete('/:id/delete', deleteOption);
router.get('/:id', showDetails)




module.exports = router;