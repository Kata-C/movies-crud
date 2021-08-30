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
            success: true,
            results
        });
    });
}

const login = (req, res) => {

    usersModel.login(req, (results, err) => {
        if(err)
            throw err;

            res.send({
                admin: results.admin,
                usuario: results.usuario,
                success: results.success,
                idusuario: results.idusuario,
                token: results.token
            });
        
    });
}

module.exports = {
    addUser,
    getUserById,
    login
}