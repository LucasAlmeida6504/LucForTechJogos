const router = require('express').Router()
const controller = require('../controllers/console.controller')
const authz = require('../middlewares/authz.middleware')

router.post('/', authz, controller.save)

router.get('/', authz, controller.getAll)

router.get('/:id', authz, controller.getById)

router.put('/:id', authz, controller.update)

router.delete('/:id', authz, controller.remove)

module.exports = router