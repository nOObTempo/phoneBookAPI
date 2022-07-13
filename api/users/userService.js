const pool = require('../../database/db')

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO registration(nome, email, senha, telefone) 
                  values(?,?,?,?)`,
      [data.nome, data.email, data.senha, data.telefone],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      }
    )
  },
  getUsers: callBack => {
    pool.query(
      `SELECT id, nome, email, senha, telefone from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results)
      }
    )
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT id, nome, email, senha, telefone from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  }
}
