const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.get('/find-by-token', userController.findByToken)

module.exports = router;
