// Setting the port and the first endpoint

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.routes');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileupload = require('express-fileupload');
// const multer = require('multer');
// const upload = multer({dest: __dirname + '/src/uploads/images'});

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

// app.post('/upload', upload.single('portada'), (req, res) => {
// 	console.log(req.file + 'a');
//     if(req.file) {
//         res.send({
// 			success: true,
// 			file: req.file});
//     }
//     else throw 'error';
// });
app.use('/', apiRoutes);


module.exports = app;
