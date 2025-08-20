const express = require("express");
const router = express.Router();

// var allBooks = [
// { id: 1, title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'], genre: 'Classic', publicationYear: 1925 },
// { id: 2, title: '1984', authors: ['George Orwell'], genre: 'Dystopian', publicationYear: 1949 },
// { id: 3, title: 'To Kill a Mockingbird', authors: ['Harper Lee'], genre: 'Classic', publicationYear: 1960 },
// { id: 4, title: 'Dune', authors: ['Frank Herbert'], genre: 'Science Fiction', publicationYear: 1965 },
// { id: 5, title: 'The Hobbit', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publicationYear: 1937 },
// { id: 6, title: 'Brave New World', authors: ['Aldous Huxley'], genre: 'Dystopian', publicationYear: 1932 },
// { id: 7, title: 'Fahrenheit 451', authors: ['Ray Bradbury'], genre: 'Dystopian', publicationYear: 1953 },
// { id: 8, title: 'The Catcher in the Rye', authors: ['J.D. Salinger'], genre: 'Classic', publicationYear: 1951 },
// { id: 9, title: 'Foundation', authors: ['Isaac Asimov'], genre: 'Science Fiction', publicationYear: 1951 },
// { id: 10, title: 'Slaughterhouse-Five', authors: ['Kurt Vonnegut'], genre: 'Science Fiction', publicationYear: 1969 },
// { id: 11, title: 'The Lord of the Rings', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publicationYear: 1954 },
// { id: 12, title: 'Pride and Prejudice', authors: ['Jane Austen'], genre: 'Classic', publicationYear: 1813 },
// ];


// home route

// var allBooks = [
//   { id: 1, title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'], genre: 'Classic', publicationYear: 1925, cover: 'https://covers.openlibrary.org/b/id/11494639-L.jpg' },
//   { id: 2, title: '1984', authors: ['George Orwell'], genre: 'Dystopian', publicationYear: 1949, cover: 'https://covers.openlibrary.org/b/id/1297127-L.jpg' },
//   { id: 3, title: 'To Kill a Mockingbird', authors: ['Harper Lee'], genre: 'Classic', publicationYear: 1960, cover: 'https://covers.openlibrary.org/b/id/11186835-L.jpg' },
//   { id: 4, title: 'Dune', authors: ['Frank Herbert'], genre: 'Science Fiction', publicationYear: 1965, cover: 'https://covers.openlibrary.org/b/id/11696229-L.jpg' },
//   { id: 5, title: 'The Hobbit', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publicationYear: 1937, cover: 'https://covers.openlibrary.org/b/id/12693822-L.jpg' },
//   { id: 6, title: 'Brave New World', authors: ['Aldous Huxley'], genre: 'Dystopian', publicationYear: 1932, cover: 'https://covers.openlibrary.org/b/id/11516709-L.jpg' },
//   { id: 7, title: 'Fahrenheit 451', authors: ['Ray Bradbury'], genre: 'Dystopian', publicationYear: 1953, cover: 'https://covers.openlibrary.org/b/id/12686895-L.jpg' },
//   { id: 8, title: 'The Catcher in the Rye', authors: ['J.D. Salinger'], genre: 'Classic', publicationYear: 1951, cover: 'https://covers.openlibrary.org/b/id/12574677-L.jpg' },
//   { id: 9, title: 'Foundation', authors: ['Isaac Asimov'], genre: 'Science Fiction', publicationYear: 1951, cover: 'https://covers.openlibrary.org/b/id/11417032-L.jpg' },
//   { id: 10, title: 'Slaughterhouse-Five', authors: ['Kurt Vonnegut'], genre: 'Science Fiction', publicationYear: 1969, cover: 'https://covers.openlibrary.org/b/id/12711666-L.jpg' },
//   { id: 11, title: 'The Lord of the Rings', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publicationYear: 1954, cover: 'https://covers.openlibrary.org/b/id/11520630-L.jpg' },
//   { id: 12, title: 'Pride and Prejudice', authors: ['Jane Austen'], genre: 'Classic', publicationYear: 1813, cover: 'https://covers.openlibrary.org/b/id/11417032-L.jpg' }
// ];

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