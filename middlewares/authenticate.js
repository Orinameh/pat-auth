const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


class Authenticate {
    static async verifyToken(req, res, next) {
        try {

            let token = req.headers['authorization'].split(' ')[1];

            if (!token) {
                return res.status(401).send({
                    auth: false, message: 'user not authenticated.'
                });
            }

            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        status: 401,
                        message: 'user not authenticated'
                    });
                }
                if (+req.params.id !== decoded.id) {
                    return res.status(400).send({
                        status: 401,
                        message: 'user not allowed to access this user account '
                    });
                }
                req.params.id = decoded.id;
                next();
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Fail to Authenticate user '
            });
        }



    }
}

module.exports = Authenticate;