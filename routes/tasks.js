const express = require('express')
const router = express.Router()

const {getAll,createTask,doUpdate,stuffDelete,getTask} = require('../controllers/tasks')

router.route('/').get(getAll).post(createTask)
router.route('/:id').delete(stuffDelete).patch(doUpdate).get(getTask)

module.exports = router