const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", err => err? console.error(err) : console.log("Successfully opened and connected to database!"));

const BookModel = `
    create table if not exists Books (
        id int primary key autoincrement,
        title text not null,
        summary text,
        filename text unique,
        cover text unique,
        publish_year
    )
`;

const AuthorModel = `
    create table if not exists Authors (
        id int primary key autoincrement,
        first_name text not null,
        last_name text not null
    )
`;

const CategoryModel = `
    create table if not exists Categories (
        id int primary key autoincrement,
        model text not null,
        fieldname text not null
    )
`;

const BookToAuthorMapModel = `
    create table if not exists BookToAuthorMap (
        id int primary key autoincrement,
        author_fk int,
        book_fk int,
        foreign key (author_fk) references Authors(id),
        foreign key (book_fk) references Books(id)
    )`;

const BookToCategoryMapModel = `    
    create table if not exists BookToCategoryMap (
        id int primary key autoincrement,
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

    });
}

module.exports = {
    loadModels,
};