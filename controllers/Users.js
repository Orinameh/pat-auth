const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

class UserController {

    static async createUser(req, res) {
        try {
            // checks if user with the email is present
            const isUserPresent = await db.User.findOne({ where: { email: req.body.email } });
            if(isUserPresent) {
                return res.send({ status: 400, message: 'User with this email exists'})
            }

            const user = await db.User.create(req.body);
            const data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt

            }
            return res.send({message: 'User created', data, status: 200})
        } catch (error) {
            console.log(error)
            return res.send({ status: 400, message: 'Failed to create a user'})
        }

    }

    static async login(req, res) {
        const { email, password } = req.body;

        // check if email and password are passed
        if(!email || !password) {
            return res.send({ status: 400, message: 'Both email and password must be passed'})
        }
        try {
            const user = await db.User.findOne({ where: { email } });
            if(!user) {
                return res.send({ status: 400, message: 'user does not exist'})
            }
            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword) {
                return res.send({ status: 400, message: 'email or password is not correct'})
            }
            const data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt

            }
            // creates the token with a unique id
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
            return res.send({message: 'User successfully logged in', data, token, status: 200})
        } catch (error) {
            console.log(error)
            return res.send({ status: 400, message: 'failed to get user'})
        }

    }

    static async findUser(req, res) {
        const { id } = req.params;
        try {
            const user = await db.User.findOne({ where: { id }, attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'], });
            if(user === null) {
              return res.send({message: 'user not available', data: user, status: 200})
            }
            
            return res.send({message: 'user succesfully fetched', data: user, status: 200})
        } catch (error) {
            return res.send({ status: 400, message: 'Not found'})
        }

    }
}

module.exports = UserController;