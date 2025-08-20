const express = require("express");
const router = express.Router();

var allBooks = [
{ id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', publicationYear: 1925 },
{ id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', publicationYear: 1949 },
{ id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', publicationYear: 1960 },
{ id: 4, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', publicationYear: 1965 },
{ id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publicationYear: 1937 },
{ id: 6, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', publicationYear: 1932 },
{ id: 7, title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Dystopian', publicationYear: 1953 },
{ id: 8, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Classic', publicationYear: 1951 },
{ id: 9, title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction', publicationYear: 1951 },
{ id: 10, title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', genre: 'Science Fiction', publicationYear: 1969 },
{ id: 11, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', publicationYear: 1954 },
{ id: 12, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classic', publicationYear: 1813 },
];

// home route
router.get("/", (req, res) => {
    console.log("home page");
    res.render("index", { title: "home view" }, { books: allBooks });
});

// read pdf file; only authenticated readers can read this.
router.get("/now-reading/title/:title", (req, res) => {
    res.send("enjoy the title: ", req.params);
});

module.exports = router;