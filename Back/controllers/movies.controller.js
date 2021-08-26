const moviesModel = require('../models/movies.model');

const getMovies = (req, res) => {
    moviesModel.getMovies((results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send({
            success: true,
            results
        });
    });
}


const getMovieById = (req, res) => {
    moviesModel.getMovieById(req.params, (results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send({
            success: true,
            results
        });
    });
}


const addMovies = (req, res) => {

    moviesModel.addMovie(req.body, (results, err) => {
        if(err)
            throw err;
        res.send({
            success: true,
            result: results.message
        });
    });
}

const updateMovie = (req, res) => {
    moviesModel.updateMovie(req.body, req.params, (results, err) => {
        if(err)
            throw err;
        res.send({
            success: true,
            result: results.message});
    });
}

const deleteMovie = (req, res) => {
    moviesModel.deleteMovie(req.params, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        res.send({
            success: true,
            result: results.message
        });
    });
}

const addComment = (req, res) => {
    moviesModel.addComment(req.body, req.params, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        res.send({
            success: true,
            result: results.message
        });
    });
}

const rate = (req, res) => {
    moviesModel.rate(req.body, req.params, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        rateAverage(req, res);
    });
}

const rateAverage = (req, res) => {
    moviesModel.getRatingAverage((rate, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        updateRate(req,res, rate);
    });
}

const updateRate = (req, res, rate ) => {
    moviesModel.updateRate(req.params, rate, (result, err) => {
        if(err){
            console.json(err);
            throw err;
        }
        res.send({
            success: true,
            result: result.message
        });
    });
}

module.exports = {
    getMovies,
    addMovies,
    updateMovie,
    deleteMovie,
    getMovieById,
    addComment,
    rate,
    rateAverage
}