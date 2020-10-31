const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79eb63d88ab55dd472de9cb565ec991e&query='+lat+','+long;
    request.get({url:url, json:true},(error, response) => {
        if(error) {
            callback('Issue accessing Weatherstack server'+error,undefined);
        } else if (response.body.error) {
            callback('Error:'+response.body.error.info,undefined)
        } else {
            callback(undefined,{
                forecast : response.body.current.weather_descriptions[0] + ", temp="+ response.body.current.temperature,
            })
        }
    });
};

module.exports = forecast;
