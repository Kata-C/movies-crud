const express = require('express');
const moviesController = require('../controllers/movies.controller');
const jwt = require('jsonwebtoken');
const { path } = require('../app');
// const multer = require("multer");





//   destination: `${process.cwd()}/src/uploads/images`, 
// const imageStorage = multer.diskStorage({
//   // Destination to store image     
//   destination: `../src/uploads/images`, 
//   filename: (req, file, cb) => {
//         cb(null, file.fieldname)
//           // file.fieldname is name of the field (image)
//           // path.extname get the uploaded file extension
//   }
// });

// const imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 10000000 // 1000000 Bytes = 1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
//        // upload only png and jpg format
//        return cb(new Error('Please upload a Image'))
//      }
//    cb(undefined, true)
// }
// }) 
const router = express.Router();


const authAdmin = (req, res, next) => {
    if (req.get('Authorization') !== null)
      jwt.verify(req.get('Authorization'), 'secret', (err, decoded) => {
        if(err) 
          res.send({
            success: false,
            message: err
          })
        if(decoded.admin == 1) next();
        else res.send({success: false, message: 'No eres administrador'})
      })
    else
      res.send({success: false, message: 'Inicie sesión para realizar esta acción'});
};

const authUser = (req, res, next) => {
    if (req.get('Authorization') !== null)
      jwt.verify(req.get('Authorization'), 'secret', (err, decoded) => {
        if(err) 
          res.send({
            success: false,
            message: err
          })
        else next();
      })
    else
      res.send({success: false, message: 'Inicie sesión para realizar esta acción'});
}

const uploadImage = (req, res, next) => {
    if(req.files) {
      let path = `${process.cwd()}\\src\\uploads\\images\\${req.files.imagen.name}`;
      let file = req.files.imagen;
      file.mv(path, (err) => {
        if(err) res.send({success: false, message: err})
        next();
      })
    } else next();
}

router.get('/', moviesController.getMovies);
router.get('/:movie', moviesController.getMovieById);
router.get('/comments/user/:user', moviesController.getCommentsByUser);
router.get('/comments/:movie', moviesController.getCommentsByMovie);
router.get('/:movie/user/:user', moviesController.getRateByUser);
router.post('/title/', moviesController.validateMovie);
router.post('/', authAdmin, uploadImage ,moviesController.addMovies);
router.post('/rate/', authUser, moviesController.addRateAndComment); //This route is to rate a movie and to add a comment about it
router.post('/comment/:movie', authUser, moviesController.addComment); //This route is to add just a comment, not to rating
router.put('/rate/:movie', moviesController.rateAverage); // This route is to calculate the average and set the rate in a movie
router.put('/update/:movie', authAdmin, uploadImage, moviesController.updateMovie);
router.delete('/delete/:movie', authAdmin, moviesController.deleteMovie);

// route to test getting rate
router.get('/rate/calif', moviesController.rateAverage);

module.exports = router;