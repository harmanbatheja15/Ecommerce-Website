const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middleware/user");
const { Product, User } = require("../db");

const app = express();
app.use(express.json());

const router = express.Router();

module.exports = router;
