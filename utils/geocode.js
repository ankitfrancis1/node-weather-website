const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5raXRmcmFuY2lzIiwiYSI6ImNrZ2t2czZtdjA2Z20yc3AwcTR5bmlnemcifQ.ze8GQdRszkdlml80fbiqjA';

    request({ url: url, json: true }, (error, {body}={}) => {
        if (error) {            
            callback('Unable to connect to geocoding service', undefined );
        } else if (!body.features) {
            callback('Unable to resolve the query for your location, Try another search', undefined );
        } else if(!body.features[0]) {
            callback('Unable to seatch for the location Try another search', undefined );
        } else {
            callback (undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    });
};


module.exports = geocode;