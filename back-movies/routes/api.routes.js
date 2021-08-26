
const api = require('express').Router();
const usersPath = require('../routes/users.routes');
const moviesPath = require('../routes/movies.routes');

api.use('/users', usersPath);
api.use('/movies', moviesPath);
api.use('/', (req, res) => {
    res.send("Prueba");
});

module.exports = api;