const express = require('express')
const data = require("./data.json")
const fetch = require("node-fetch-commonjs")
const app = express()

const PORT = process.env.PORT || 6700

app.get('/', (req, res) => {
  res.send("The API is running, yay yay!!!");
})

app.get('/tracking/:nb', (req, res) => {
  const { nb } = req.params
  
  const result = data.filter(d => d._id === nb)

  res.send(result)
})

app.get('/weather', async (req, res) => {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=59&lon=18&appid=de838abc989f8e5b62217294a1fe83ee&units=metric')
  const data = await response.json()

  const weatherData = {
    location: "Stockholm",
    desc: data.weather[0].desc,
    windspd: data.wind.speed,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    icon: data.weather[0].icon
  }

  res.send(JSON.stringify(weatherData))
})

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})