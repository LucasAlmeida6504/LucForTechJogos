const consoleRouter = require('./src/routes/console.route')
const express = require('express')
const app = express()
const db = require('./src/utils/db')
const jogoRouter = require('./src/routes/jogo.route')
const bodyParser = require('body-parser')
const usuarioRoute = require('./src/routes/usuario.route')
const port = 3000

app.use(bodyParser.json())

app.get("/", (res) => {
    res.send('LucForTechJogos está rodando')
})

app.use('/api/v1/console', consoleRouter)
app.use('/api/v1/jogo', jogoRouter)
app.use('/api/v1/usuario', usuarioRoute)

app.use((error, res) => {
    console.log('Erro!', error)
    res.status(500).json({errorMessage: error.message})
})

app.listen(port, () => {
    console.log(`LucForTechJogos está rodando na porta: ${port}`)
})