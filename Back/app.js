// Setting the port and the first endpoint

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.routes');

app.set('PORT', 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRoutes);


module.exports = app;
