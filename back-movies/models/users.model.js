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
                throw err;
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    throw error;

                let data = {
                    success: true,
                    message: 'Se ha registrado con éxito'
                }
                callback(data);
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

queries.login = (req, callbackResponse) => {
    getHashPassword(req, callbackResponse, (req, results, callbackResponse) => {
        comparePassword(req, results[0].password, callbackResponse, (err, isPasswordMatch, callbackResponse, req) => {
            if(err) callbackResponse({success: false})
            if(isPasswordMatch) {
                // if(results[0].tipo == 1) req.session.admin = true
                // else req.session.admin = false
				// req.session.usuario = req.body.nombre;
                // console.log(`Desde el modelo: ${req.session.usuario}`)
                // req.session.idusuario = results.idusuario;
                console.log(`id usuario desde bd: ${results[0].idusuario}`)
                let token = jwt.sign({
                    admin: results[0].tipo == 1 ? true : false,
                    usuario: req.body.nombre,
                    idusuario: results[0].idusuario
                }, 'secret', {expiresIn: 60 * 60});
				//response.redirect('/home');    
                callbackResponse({
                    admin: results[0].tipo == 1 ? true : false,
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