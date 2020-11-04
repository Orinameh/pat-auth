const express = require("express");
const router = express.Router();
const controller = require("../controllers/Users");
const auth = require("../middlewares/authenticate");

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/user/:id', auth.verifyToken, controller.findUser);


module.exports = router;
