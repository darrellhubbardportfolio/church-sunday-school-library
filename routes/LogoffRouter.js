const express = require("express");
const router = express.Router();

const { SignOut } = require("./../apis/AuthApi");

// default login page
router.get("/", SignOut);

module.exports = router;