const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\r\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site unavailable',
//         welcomeMessage: `We'll be right back!`
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, sailor!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'My Projects',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error handling request',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
