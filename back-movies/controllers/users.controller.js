const usersModel = require('../models/users.model');

const addUser = (req, res) => {

    usersModel.addUser(req.body, (results, err) => {
        if(err)
            throw err;
        res.send({
            success: true,
            results: results.message
        });
    });
}

const getUserById = (req, res) => {
    usersModel.getUserById(req.params, (results, err) => {
        if(err){
            console.log(err);
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
        if(results.loggedin) {
            res.send({
                loggedin: results.loggedin,
                user: results.user
            });
        }
        
    });
}

module.exports = {
    addUser,
    getUserById,
    login
}