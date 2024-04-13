const express = require('express')

const createOptions = require('../controller/OptionsController')
const addOptions = require('../controller/OptionsController')
const deleteOptions = require('../controller/OptionsController')

const router = express.Router();


router.post('/:id/create', createOptions);
router.get('/:id/add_vote', addOptions);
router.delete('/:id/delete', deleteOptions)





module.exports = router;