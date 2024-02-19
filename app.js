const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
    if (error) {
        console.error(`Error while calling geocode ${error}`);
    } else {
        // console.log(JSON.stringify(results, undefined, 2));
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (error, results) => {
            if (error) {
                console.error(error);
            } else {
                // console.log(JSON.stringify(results, undefined, 2));
                console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}.`);
            }
        });
    }
});