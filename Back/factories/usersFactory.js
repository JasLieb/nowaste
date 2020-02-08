const db = require('./databaseMariaFactory');
const UserModel = require('../models/userModel');
const authentification = require('../middlewares/authentification');

const createNewUser = async (userData) => {
    try {
        var user = UserModel.newUser(userData);
        console.log("create");
        console.log(user);
        user.password = await authentification.hashPassword(user.password);
        console.log("----------");
        console.log(user);
        var query = `INSERT INTO users (name, email, password, creation_date) values ('${user.name}', '${user.email}', '${user.password}', CURRENT_TIMESTAMP())`;
        await db.query(query);
        
        // TODO DB function to return id generated
        query = `select id from users where email='${user.email}'`;
        var res = await db.queryOne(query);
        console.log(res);

        return authentification.getNewToken(res);
    } catch (e) {
        console.log(e);
        throw new Error("500 : Fails to create new user");
    }
}

const login = async (userData, authorization) => {
    try {
        var user = UserModel.newUser(userData, authorization);
        return await authentification.match(user);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};
