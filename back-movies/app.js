// Setting the port and the first endpoint
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fileupload = require('express-fileupload');
const app = express();
const apiRoutes = require('./routes/api.routes');

app.set('PORT', 8080);

// Cors is used to avoid being blocked by cors policy
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRoutes);

module.exports = app;
