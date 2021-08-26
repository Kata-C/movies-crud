const express = require('express');

const moviesController = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/:movie', moviesController.getMovieById);
router.post('/', moviesController.addMovies);
router.post('/comment/:movie', moviesController.addComment);
router.post('/rate/:movie', moviesController.rate);
router.get('/rate/calif', moviesController.rateAverage);
router.put('/update/:movie', moviesController.updateMovie);
router.delete('/delete/:movie', moviesController.deleteMovie);

module.exports = router;