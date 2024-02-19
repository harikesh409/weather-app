const yargs = require('yargs');
const axios = require('axios');

const APIkey = "";

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
let encodedAddress = encodeURIComponent(argv.address);
let geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeURL).then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    } else if (response.data.status === 'OK') {
        console.log(response.data.results[0].formatted_address);
        let latitude = response.data.results[0].geometry.location.lat;
        let longitude = response.data.results[0].geometry.location.lng;
        let weatherURL = `https://api.darksky.net/forecast/${APIkey}/${latitude},${longitude}`;
        return axios.get(weatherURL);
    } else {
        throw new Error(response.data.error_message);
    }
}).then(response => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch(err => {
    if (err.code === 'ENOTFOUND') {
        console.error("Unable to connect to API.");
    } else {
        console.error("Error: ", err.message);
    }
});