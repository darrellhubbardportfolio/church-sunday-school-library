const express = require("express");
const router = express.Router();

const { SignUp } = require("./../apis/AuthApi");

// default registration page
router.get("/", (req, res) => {
    res.render("register", { title: "register view" });
});

// verify check
router.post("/verify", SignUp);

module.exports = router;