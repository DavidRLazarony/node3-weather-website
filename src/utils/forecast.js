const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=08c21aae2c73443da485f5b67c361fc3&query="
              + longitude + "," + latitude
              + "&units=f"

    request({ url, json: true }, (error, { body:weather }) => {
        if (error) {
            callback("Unable to connect to forecast service!", undefined)
        } else if (weather.error) {
            callback("Unable to find location!", undefined)
        } else {
            console.log(weather)
            const data = `Currently in ${weather.location.name} it is ${weather.current.weather_descriptions[0]} and ${weather.current.temperature} degrees.`
                       + `The wind is out of the ${weather.current.wind_dir} at ${weather.current.wind_speed} mph.`
            callback(undefined, data)
        }
    })
}

module.exports = forecast