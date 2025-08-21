const express = require("express");
const router = express.Router();

const { SignOut } = require("../apis/AuthApi");

// logout
router.get("/", SignOut);

module.exports = router;