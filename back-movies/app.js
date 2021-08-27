// Setting the port and the first endpoint

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.routes');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('PORT', 8080);

// Cors is used to avoid being blocked by cors policy
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRoutes);


module.exports = app;
