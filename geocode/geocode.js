const request = require('request');

const mapsAPIkey = '';

let geocodeAddress = (address, callback) => {
    
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${mapsAPIkey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to Connect to Google Servers.");
        } else if (body.status === 'ZERO_RESULTS') {
            callback("Unable to find the entered address");
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            callback(body.error_message);
        }
    });
}

// module.exports = {
//     geocodeAddress
// }

module.exports.geocodeAddress = geocodeAddress;