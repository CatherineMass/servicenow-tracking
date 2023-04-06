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
  const { location, lat, lon, key } = req.headers
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
  const data = await response.json()

  const weatherData = {
    location,
    desc: data.weather[0].description,
    windspd: data.wind.speed,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    icon: data.weather[0].icon
  }

  res.send(weatherData)
})

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})