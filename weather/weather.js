const request = require('request');

const APIkey = "";

let getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${APIkey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to Connect to the API");
        } else if (response.statusCode == 403) {
            callback("Invalid API key");
        } else if (response.statusCode === 400 || response.statusCode === 404) {
            callback("Invalid address");
        } else if (response.statusCode === 200) {
            // console.log(JSON.stringify(body.currently.temperature, undefined, 2));
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}

module.exports.getWeather = getWeather;