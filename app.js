require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require('./api/users/userRouter')

app.use(express.json())

app.use('/api/users', userRouter)
const port = 3000
app.listen(process.env.APP_PORT, () => {
  console.log('Dale server rodando na porta: ', process.env.APP_PORT)
})
