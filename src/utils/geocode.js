const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3Rhbmd5NjMiLCJhIjoiY2twendidmE3MDFsaTJwbzNjMGdlbzlkYiJ9.KOV5dhmvu-I24wcZuboChQ&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (!body.features.length) {
                callback('Unable to find location. Try again')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode