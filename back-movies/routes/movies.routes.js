const express = require('express');

const moviesController = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/:movie', moviesController.getMovieById);
router.get('/comments/user/:user', moviesController.getCommentsByUser);
router.get('/comments/:movie', moviesController.getCommentsByMovie);
router.post('/title/', moviesController.validateMovie);
router.post('/', moviesController.addMovies);
router.post('/rate/', moviesController.addRateAndComment); //This route is to rate a movie and to add a comment about it
router.post('/comment/:movie', moviesController.addComment); //This route is to add just a comment, not to rating
router.put('/rate/:movie', moviesController.rateAverage); // This route is to calculate the average and set the rate in a movie
router.put('/update/:movie', moviesController.updateMovie);
router.delete('/delete/:movie', moviesController.deleteMovie);

// route to test getting rate
router.get('/rate/calif', moviesController.rateAverage);

module.exports = router;