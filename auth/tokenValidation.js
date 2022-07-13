const { verify } = require('jsonwebtoken')

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization')
    if (token) {
      token = token.slice(7)
      verify(token, 'qwerty12345', (err, decoded) => {
        if (err) {
          res.status(403).json({
            message: 'Token inválido'
          })
        } else {
          next()
        }
      })
    } else {
      res.status(401).json({
        message: 'Não autorizado'
      })
    }
  }
}
