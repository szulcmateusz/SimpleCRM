const express = require('express');
const hbs = require('express-handlebars');
const {static} = require("express");
const {homeRouter} = require("./routers/home");
const {clientRouter} = require("./routers/client");
const methodOverride = require('method-override');
const {handleError} = require("./utils/errors");

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(static('public'));
app.use(express.json());
app.engine('.hbs', hbs({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use('/', homeRouter);
app.use('/client', clientRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000')
});