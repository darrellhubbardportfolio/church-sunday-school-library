const express = require("express");
const router = express.Router();

const { SignIn } = require("./../apis/AuthApi");

// default login page
router.get("/", (req, res) => {
    res.render("login", { title: "login view" });
});

// verify login
router.post("/verify", SignIn);

module.exports = router;