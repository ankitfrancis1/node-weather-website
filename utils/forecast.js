const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79eb63d88ab55dd472de9cb565ec991e&query='+lat+','+long;
    request.get({url:url, json:true},(error, response) => {
        if(error) {
            callback('Issue accessing Weatherstack server'+error,undefined);
        } else if (response.body.error) {
            callback('Error:'+response.body.error.info,undefined)
        } else {
            let W = response.body.current; 
            let L = response.body.location;
            const forecast = `It is ${W.temperature} degrees Celsius out, weather is ${W.weather_descriptions[0]}`;
            const weather_detail = `(measured at ${L.localtime} ${L.timezone_id} timezone); humidity=${W.humidity}, precipitation = ${W.precip}, uv index =${W.uv_index},\n winds=${W.wind_speed} knots (${W.wind_dir})\n, pressure = ${W.pressure} bar`;
            callback(undefined,{
                forecast : forecast,
                weather_detail: weather_detail,
                weather_icon: W.weather_icons[0]
            })
        }
    });
};

module.exports = forecast;
