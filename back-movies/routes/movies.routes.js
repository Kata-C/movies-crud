const express = require('express');

const moviesController = require('../controllers/movies.controller');
const jwt = require('jsonwebtoken');
const router = express.Router();


const authAdmin = (req, res, next) => {
    if (req.session.admin == true)
      return next();
    else
      return res.send({success: false, message: 'No eres administrador'});
};

const authUser = (req, res, next) => {
    if (req.get('authorization') != null)
      jwt.verify(req.get('authorization'), 'secret', (err, decoded) => {
        if(err) 
          res.send({
            success: false,
            message: err
          })
          next();
      })
    else
      res.send({success: false, message: 'Inicie sesión para realizar esta acción'});
}

router.get('/', moviesController.getMovies);
router.get('/:movie', moviesController.getMovieById);
router.get('/comments/user/:user', moviesController.getCommentsByUser);
router.get('/comments/:movie', moviesController.getCommentsByMovie);
router.post('/title/', moviesController.validateMovie);
router.post('/', authAdmin, moviesController.addMovies);
router.post('/rate/', authUser, moviesController.addRateAndComment); //This route is to rate a movie and to add a comment about it
router.post('/comment/:movie', authUser, moviesController.addComment); //This route is to add just a comment, not to rating
router.put('/rate/:movie', moviesController.rateAverage); // This route is to calculate the average and set the rate in a movie
router.put('/update/:movie', authAdmin, moviesController.updateMovie);
router.delete('/delete/:movie', authAdmin, moviesController.deleteMovie);

// route to test getting rate
router.get('/rate/calif', moviesController.rateAverage);

module.exports = router;