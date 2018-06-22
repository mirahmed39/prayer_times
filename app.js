const express = require('express');
const app = express();

// parse body of http request
app.use(express.urlencoded({extended: false}));
const portNum = 3000;

// enable static final serving from public folder
const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'hbs');

// respond to / (our single page)
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(portNum);
console.log('listening on', portNum);