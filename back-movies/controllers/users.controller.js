const usersModel = require('../models/users.model');

const addUser = (req, res) => {

    usersModel.addUser(req.body, (results, err) => {
        if(err)
            throw err;
        res.send({
            success: results.success,
            results: results.message
        });
    });
}

const getUserById = (req, res) => {
    usersModel.getUserById(req.params, (results, err) => {
        if(err){
            throw err;
        }
        res.send({
            results
        });
    });
}

const login = (req, res) => {

    usersModel.login(req, (results, err) => {
        if(err)
            res.send({
                admin: null,
                usuario: null,
                success: false,
                idusuario: null,
                token: null
            });

            res.send({
                admin: results.admin,
                usuario: results.usuario,
                success: results.success,
                idusuario: results.idusuario,
                token: results.token
            });
        
    });
}

const validateUser = (req, res) => {
    usersModel.validateUser(req.body, (results, err) => {
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
    addUser,
    getUserById,
    login,
    validateUser
}