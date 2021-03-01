const express = require('express')
const path = require('path')
require('dotenv').config()
const { json } = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index')

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(json())
app.use(cors())
app.use('/api', routes)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(3001, () => console.log("Server is up"))
