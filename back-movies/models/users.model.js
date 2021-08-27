const pool = require('../database.config');
const bcrypt = require('bcrypt');
var session = require('express-session');

const queries = {};

queries.addUser = (data, callback) => {

    cryptPassword(data.password, (err, hash) => {
        if(err) throw err;

        // 1 admin, 2 normal user
        const query = `INSERT INTO usuarios 
        (nombre, password) 
        VALUES ("${data.nombre}", "${hash}")`;

        pool.getConnection((err, connection) => {
            if (err)
                throw err;
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    throw error;

                callback(results);
            });
        });
    })
    
}

queries.getUserById = (data, callback) => {

    const query = `SELECT
        id,
        nombre
        FROM  usuarios 
        WHERE id = ${data.user}`;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;

            callback(results);
        });
    });

}

queries.login = (req, callbackResponse) => {
    
    getHashPassword(req, callbackResponse, (req, result, callbackResponse) => {
        console.log(result);
        console.log(req.body.password);
        comparePassword(req, result, callbackResponse, (err, isPasswordMatch, callbackResponse, req) => {
            if(isPasswordMatch) {
                req.session.loggedin = true;
				req.session.username = req.body.name;
				// response.redirect('/home');
                callbackResponse({
                    loggedin: req.session.loggedin,
                    user: req.session.username
                });
            } else callbackResponse({
                loggedin: false,
                user: ''
            });
        });
    });

};

const getHashPassword= (req, callbackResponse, callback) => {
    
    const query = `SELECT 
        id,
        password
        FROM  usuarios 
        WHERE nombre = "${req.body.name}"`;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callback(req, results[0].password, callbackResponse);
        });
    });
}




const cryptPassword = (password, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
};

const comparePassword = (req, hashword, callbackResponse, callback) => {
    bcrypt.compare(req.body.password, hashword, function(err, isPasswordMatch) {  
        return err == null ?
            callback(null, isPasswordMatch, callbackResponse, req) :
            callback(err, null, callbackResponse);
    });
 };

module.exports = queries;