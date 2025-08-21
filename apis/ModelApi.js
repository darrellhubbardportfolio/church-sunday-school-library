const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", err => err? console.error(err) : console.log("Successfully opened and connected to database!"));

const BookModel = `
    create table if not exists Books (
        id integer primary key autoincrement,
        title text not null,
        genre text not null,
        summary text,
        filename text unique,
        cover text unique,
        publish_year
    )
`;

const AuthorModel = `
    create table if not exists Authors (
        id integer primary key autoincrement,
        author text not null
    )
`;

const CategoryModel = `
    create table if not exists Categories (
        id integer primary key autoincrement,
        model text not null,
        fieldname text not null
    )
`;

const BookToAuthorMapModel = `
    create table if not exists BookToAuthorMap (
        id integer primary key autoincrement,
        author_fk int,
        book_fk int,
        foreign key (author_fk) references Authors(id),
        foreign key (book_fk) references Books(id)
    )`;

const BookToCategoryMapModel = `    
    create table if not exists BookToCategoryMap (
        id integer primary key autoincrement,
        author_fk int,
        category_fk int,
        foreign key (author_fk) references Authors(id),
        foreign key (category_fk) references Categories(id)
    )`;

function loadModels () {

    db.serialize(() => {

        // create the book model
        db.run(BookModel, err => err? console.error(err):console.log('model created.'));
        
        // create the author model
        db.run(AuthorModel, err => err? console.error(err):console.log('model created.'));

        // create the category model
        db.run(CategoryModel, err => err? console.error(err):console.log('model created.'));

        // create the book_category_map model
        db.run(BookToAuthorMapModel, err => err? console.error(err):console.log('model created.'));

        // ceate the book_author_map model
        db.run(BookToCategoryMapModel, err => err? console.error(err):console.log('model created.'));

        // add books by mapping
        var books = [
        { id: 1, title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'], genre: 'Classic', publish_year: 1925, cover: 'https://covers.openlibrary.org/b/id/11494639-L.jpg' },
        { id: 2, title: '1984', authors: ['George Orwell'], genre: 'Dystopian', publish_year: 1949, cover: 'https://covers.openlibrary.org/b/id/1297127-L.jpg' },
        { id: 3, title: 'To Kill a Mockingbird', authors: ['Harper Lee'], genre: 'Classic', publish_year: 1960, cover: 'https://covers.openlibrary.org/b/id/11186835-L.jpg' },
        { id: 4, title: 'Dune', authors: ['Frank Herbert'], genre: 'Science Fiction', publish_year: 1965, cover: 'https://covers.openlibrary.org/b/id/11696229-L.jpg' },
        { id: 5, title: 'The Hobbit', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publish_year: 1937, cover: 'https://covers.openlibrary.org/b/id/12693822-L.jpg' },
        { id: 6, title: 'Brave New World', authors: ['Aldous Huxley'], genre: 'Dystopian', publish_year: 1932, cover: 'https://covers.openlibrary.org/b/id/11516709-L.jpg' },
        { id: 7, title: 'Fahrenheit 451', authors: ['Ray Bradbury'], genre: 'Dystopian', publish_year: 1953, cover: 'https://covers.openlibrary.org/b/id/12686895-L.jpg' },
        { id: 8, title: 'The Catcher in the Rye', authors: ['J.D. Salinger'], genre: 'Classic', publish_year: 1951, cover: 'https://covers.openlibrary.org/b/id/12574677-L.jpg' },
        { id: 9, title: 'Foundation', authors: ['Isaac Asimov'], genre: 'Science Fiction', publish_year: 1951, cover: 'https://covers.openlibrary.org/b/id/11417032-L.jpg' },
        { id: 10, title: 'Slaughterhouse-Five', authors: ['Kurt Vonnegut'], genre: 'Science Fiction', publish_year: 1969, cover: 'https://covers.openlibrary.org/b/id/12711666-L.jpg' },
        { id: 11, title: 'The Lord of the Rings', authors: ['J.R.R. Tolkien'], genre: 'Fantasy', publish_year: 1954, cover: 'https://covers.openlibrary.org/b/id/11520630-L.jpg' }
        ];
        // add by mapping books to database
        books.map( book => {
            const addBook = 'insert into Books (title, genre, publish_year, cover) values (?, ?, ?, ?)';
            const addAuthor = 'insert into Authors (author) values (?)';

            // we will first add new books
            db.run(addBook, [ book.title, book.genre, book.publish_year, book.cover ], err => {
                if(err){
                 console.error(err);
                }
                // console.log("insert one book");
            });

            // next let's add an author; no duplicat authors can be inside of database.
            book['authors'].map( (author, idx) => {

                if(!books[idx]['authors'].includes(author)) { 

                    db.run(addAuthor, [ author ], err => {
                        if(err){ 
                            console.error(err);
                        }
                        console.log('insert one author');
                    });
                }
                // console.log('author: ' + author + ', exists already');
            });
        });

        // create a map for authors 
        const addAuthorMap = 'insert into BookToAuthorMap (author_fk, book_fk) values (?, ?)';

        // let's now map authors to a book
        // first get all authors
        let getAuthors = db.all('SELECT * FROM Authors group by author order by id asc', (err, rows) => {
            if (err) {
                console.error(err);
            }
            // console.log(rows);
            return rows;
        });

        // second get all books
        let getBooks = db.all('select * from Books', (err, rows) => {
            if (err) {
                console.error(err);
            }
            // console.log(rows);
            return rows;
        });

        // lets create a BookToAuthorMap
        // first loop through books.
        // second find out where the books.title = a book in database.
        // third get the authors
        // fourth get the book.id
        // fifth map through each author in array, then find the id of each one
        // six, add the id to the author and book.
        // create a map for categories
        getBooks.map( (getBook, idx) => {
            console.log('idx: ', idx);
            let findBookTitle = getBooks.indexOf(books[idx]);
            // console.log('find index of book: ', findBookTitle);
        })
        const addCategoryMap = 'insert into BookToCategoryMap (category_fk, book_fk) values (?, ?)';
    });
}

module.exports = {
    db,
    loadModels,
};