const {
  createUser,
  getUserByUserId,
  getUsers,
  login
} = require('./userController')
const router = require('express').Router()
const { checkToken } = require('../../auth/tokenValidation')

router.post('/', createUser)
router.get('/', checkToken, getUsers)
router.get('/:id', checkToken, getUserByUserId)
router.post('/login', login)

module.exports = router
