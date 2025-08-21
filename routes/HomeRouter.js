const express = require("express");
const router = express.Router();

const { FetchAllBooks } = require("./../apis/BookApi");

router.get("/", async (req, res) => {
    console.log("home page");
    const books = await FetchAllBooks();
    if (books) {

        res.render("index", { title: "home view", books: books });
    }
    res.render("index", { title: "home view", books: null });
});

// read pdf file; only authenticated readers can read this.
router.get("/now-reading/title/:title", (req, res) => {
    res.send("enjoy the title: ", req.params);
});

module.exports = router;