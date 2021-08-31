const moviesModel = require('../models/movies.model');

const fs = require("fs");



const getMovies = (req, res) => {
    moviesModel.getMovies((results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        let path;
        const newResults = results.results.map(result => {
            path=`${process.cwd()}\\src\\uploads\\images\\${result.portada}`

            return {...result, image: fs.readFileSync(path)}
            
        });
        res.send({
            results: newResults
        });
    });
}


const getMovieById = (req, res) => {
    moviesModel.getMovieById(req.params, (results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        let path;
        const newResults = results.results.map(result => {
            path=`${process.cwd()}\\src\\uploads\\images\\${result.portada}`

            return {...result, image: fs.readFileSync(path)}
            
        });
        res.send({
            success: true,
            results: newResults
        });
    });
}


const getRateByUser = (req, res) => {
    moviesModel.getRateByUser(req.params, (results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send({
            results
        });
    });
}


const addMovies = (req, res) => {
    moviesModel.addMovie(req.body, (results, err) => {
        if(err)
            throw err;
        res.send({
            results
        });
    });
}

const updateMovie = (req, res) => {
    moviesModel.updateMovie(req.body, req.params, (results, err) => {
        if(err)
            throw err;
        res.send({
            results
        });
    });
}

const deleteMovie = (req, res) => {
    moviesModel.deleteMovie(req.params, (results, err) => {
        if(err){;
            throw err;
        }

        res.send({
            results
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
            results
        });
    });
}

const getCommentsByUser = (req, res) => {
    moviesModel.getCommentByUser(req.params, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        res.send({
            results
        });
    });
}

const getCommentsByMovie = (req, res) => {
    moviesModel.getCommentsByMovie(req.params, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }

        res.send({
            results
        });
    });
}


const rateAverage = (req, res) => {
    moviesModel.getRatingAverage(req.body.calificacion,(results, err) => {
        if(err){
            console.json(err);
            throw err;
        }
        if(results.success===true)
            updateRate(req, res, results.rate);
        else res.send({
            results: {
                success: false, 
                results: 'a' + results.error
            }
        })
    });
}


const updateRate = (req, res, rate ) => {
    moviesModel.updateRate(req.params, rate, (results, err) => {
        if(err){
            console.json(err);
            throw err;
        }
        res.send({
            results
        });
    });
}


const validateMovie = (req, res) => {
    moviesModel.validateMovie(req.body, (results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send({
            results
        });
    });
}

const addRateAndComment = (req, res) => {

    moviesModel.addRateAndComment(req.body, (results, err) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send({
            results
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
    rateAverage,
    getCommentsByUser,
    validateMovie,
    getCommentsByMovie,
    addRateAndComment,
    getRateByUser
}