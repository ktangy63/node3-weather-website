const request = require('request')

const forecast = ({lat, long}, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5b98abb643f277f0a3553e7c44af6df1&query=' + lat + ',' + long + '&units=f'
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            console.log('Unable to connect to weather service')
        } else if (!body.current.temperature) {
            console.log('Coordinate error,' + body)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                speed: body.current.weather_descriptions.wind_speed,
                precip: body.current.weather_descriptions.precip

            })
        }
    })
}

module.exports = forecast