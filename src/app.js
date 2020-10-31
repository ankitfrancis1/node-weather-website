const path = require('path');

const express = require('express');
const hbs = require('hbs')



const app = express();
const publicDirPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '..', '/templates/views');
const partialsPath = path.join(__dirname, '..', '/templates/partials');
const utilsPath = path.join(__dirname, '..','/utils' );

const geocode = require(utilsPath + '/geocode.js');
const forecast = require( utilsPath + '/forecast.js');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        helptext: 'this is some helpful text',
        title: 'Weather App',
        name: 'Ankit Francis'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'this is some helpful text',
        title: 'Help',
        name: 'Ankit Francis'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        helptext: 'this is some helpful text',
        title: 'About',
        name: 'Ankit Francis'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({error:"address should be passed as query"});
    } else {
        geocode( req.query.address , (error, {latitude, longitude, location} = {}) => {
            if(error) {
                res.send({error: error});
                return;
            } 
            forecast(latitude, longitude, (error, {forecast} ={}) => {
                if(error) {
                    res.send({error: error});
                    return;
                }
                res.send({
                    forecast,
                    location: location,
                    address: req.query.address
                });
            })
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:"404",
        message: "Help article not found",
        name: 'Ankit Francis'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title:"404",
        message: "Page not found",
        name: 'Ankit Francis'
    });
});
app.listen(4000, () => {
    console.log('server is up!');
});