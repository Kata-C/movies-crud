const pool = require('../database.config');
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');

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
                callback({
                    success: false,
                    results: err
                });
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    callback({
                        success: false,
                        results: error
                    });
 
                callback({
                    success: true,
                    message: results.message
                });
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
            let data = {
                success: true,
                results
            }

            callback(data);
        });
    });

}


queries.validateUser = (body, callback) => {
    const query = `SELECT * FROM usuarios
    WHERE nombre = "${body.nombre}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                if(results.length > 0) callback(true);
                else callback(false);
    
            });
        }
    });
} 

queries.login = (req, callbackResponse) => {
    getHashPassword(req, callbackResponse, (req, results, callbackResponse) => {
        comparePassword(req,
            results.length > 0 ? results[0].password : results[0], 
            callbackResponse, 
            (err, isPasswordMatch, callbackResponse, req) => {

            if(err) {
                callbackResponse({success: false, message: err})
            } else {
                if(isPasswordMatch) {
                    let token = jwt.sign({
                        admin: results[0].tipo,
                        usuario: req.body.nombre,
                        idusuario: results[0].idusuario
                    }, 'secret', {expiresIn: 60 * 60});  
                    callbackResponse({
                        admin: results[0].tipo,
                        usuario: req.body.nombre,
                        idusuario: results[0].idusuario,
                        success: true,
                        token
                    });
                } else callbackResponse({
                    admin: '',
                    usuario: '',
                    succes: false
                });
            }

            

        });
    });
};

const getHashPassword= (req, callbackResponse, callback) => {
    
    const query = `SELECT 
        id as idusuario,
        password,
        tipo
        FROM  usuarios 
        WHERE nombre = "${req.body.nombre}"`;

    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callback(req, results, callbackResponse);
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