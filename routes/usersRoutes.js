const express = require("express");
const usersRoutes = express.Router();
const {
	createUser,
	authenticateUser,
	getCurrentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

usersRoutes.route("/register").post(createUser);

usersRoutes.route("/login").post(authenticateUser);

usersRoutes.route("/current").get(validateToken, getCurrentUser);

module.exports = usersRoutes;
