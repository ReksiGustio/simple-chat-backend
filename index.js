const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()
const port = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.get('/', (req, res) => {
  res.send('Simple Chat Backend by Gustio. Malas ngoding frontend web atau lebih tepatnya gak ngerti')
})

app.use('/', router)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})