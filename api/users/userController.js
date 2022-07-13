const {
  create,
  getUsers,
  getUserByUserId,
  getUserByUserEmail
} = require('./userService')

const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
  createUser: (req, res) => {
    const body = req.body
    const salt = genSaltSync(10)
    body.senha = hashSync(body.senha, salt)
    create(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: 'Erro ao Conectar Servidor'
        })
      }
      return res.status(200).json({
        message: 'Usuário criado com sucesso!'
      })
    })
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      if (!results) {
        return res.status(204).json({
          message: 'Registro não encontrado'
        })
      }
      return res.status(200).json({
        data: results
      })
    })
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err)
        return
      }
      return res.status(200).json({
        data: results
      })
    })
  },
  login: (req, res) => {
    const body = req.body
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err)
      }
      if (!results) {
        return res.status(401).json({
          message: 'Usuário e/ou senha inválido'
        })
      }
      const result = compareSync(body.senha, results.senha)
      if (result) {
        results.senha = undefined
        const jsontoken = sign({ result: results }, 'qwerty12345', {
          expiresIn: 60
        })
        return res.status(200).json({
          message: 'Logado com sucesso',
          token: jsontoken
        })
      } else {
        return res.status(401).json({
          message: 'Usuário e/ou senha inválido'
        })
      }
    })
  }
}
