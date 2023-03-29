const express = require('express')
const app = express()
const PORT = process.env.PORT || 6700

app.get('/', (req, res) => {
  res.send("The API is running, yay yay!!!")
})

app.get('/tracking', (req, res) => {
  res.send({
    "shipment": "Hello!!!!"
  })
})

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})