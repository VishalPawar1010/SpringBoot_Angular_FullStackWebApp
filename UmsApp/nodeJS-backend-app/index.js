const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
app.use(cors());

let json={
  test: "Hello this is valid nodeJS"
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/node', (req, res) => {
  res.send(json)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})