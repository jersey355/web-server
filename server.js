const os = require("os");
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

var app = express(); // creates an express app


hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// set up handlebars view engine on express
app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maint.hbs', {
//         title: 'Maintenance',
//         heading: 'Maintenance',
//         message: 'The site is currently being updated. Please come back later.'
//     });
// });

// use this to serve static content
app.use(express.static(__dirname + '/public'));

// set up routes:

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        userName: os.userInfo().username
    });
})

app.get('/about', (req, res) => {
    res.render('generic.hbs', {
        title: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('generic.hbs', {
        title: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status: 'ERROR',
        errorMessage: 'Unexpected error!'
    });
});

app.listen(port, () => console.log(`Server is listening for requests on port ${port} ...`));