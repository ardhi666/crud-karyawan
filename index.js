const express = require('express')
const app = express()
const port = 5000
const router = require('./src/router')

app.use(express.json())
app.use('/', router)


app.listen(port, () => console.log(`Server running on port ${port}`))