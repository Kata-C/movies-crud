const express = require('express');

const moviesController = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/:movie', moviesController.getMovieById);
router.get('/comments/:user', moviesController.getCommentsByUser);
router.post('/title/', moviesController.validateMovie);
router.post('/', moviesController.addMovies);
router.post('/comment/:movie', moviesController.addComment);
router.post('/rate/:movie', moviesController.rate);
router.put('/update/:movie', moviesController.updateMovie);
router.delete('/delete/:movie', moviesController.deleteMovie);

// route to test getting rate
router.get('/rate/calif', moviesController.rateAverage);

module.exports = router;