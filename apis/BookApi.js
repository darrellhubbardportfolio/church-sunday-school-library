const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", err => {
    err ? console.error(err) : console.log("Successfully opened and connected to database");
});

/*
    create a simulated database of books
      const allBooks = [
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
*/

// return all items for modal
function FetchAllBooks () {
    return new Promise((resolve, reject) => db.all('select * from Books', (err, rows) => err ? reject(err) : resolve(rows)));
}

// fetch item by id
function FetchBookById (id) {
    return new Promise((resolve, reject) => db.all('select * from Books WHERE id = ?', [ id ], (err, rows) => err ? reject(err) : resolve(rows)));
}

// edit a book by id
function UpdateBookById (id) {

}

// delete book by id 
function DeleteBookById (id) {
    db.run('delete from Books WHERE id = ?', err => err ? console.error(err) : console.log('delete one book'));
}

// create a book
function InsertOneBook (book) {

}

// paginate fetch books
function PaginateAllBooks(display, page, search, sorts={ fieldname: 'title', order: 'asc' }, filters=[]) {
  try {
    let filteredBooks = [...allBooks];

    // Step 1: Apply filtering based on the 'filters' array.
    if (Array.isArray(filters) && filters.length > 0) {
      filteredBooks = filteredBooks.filter(book => {
        return filters.every(filter => {
          const field = book[filter.fieldname];
          const keyword = String(filter.keyword).toLowerCase();
          return String(field).toLowerCase().includes(keyword);
        });
      });
    }

    // Step 2: Apply a broad search if a search term is provided.
    // This looks for the term in the title, author, and genre.
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        String(book.title).toLowerCase().includes(searchTerm) ||
        String(book.author).toLowerCase().includes(searchTerm) ||
        String(book.genre).toLowerCase().includes(searchTerm)
      );
    }

    // Step 3: Sort the filtered and searched results.
    const { fieldname, order } = sorts;
    if (fieldname) {
      filteredBooks.sort((a, b) => {
        const valA = a[fieldname];
        const valB = b[fieldname];

        if (typeof valA === 'string') {
          return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return order === 'asc' ? valA - valB : valB - valA;
        }
      });
    }

    const totalCount = filteredBooks.length;
    const totalPages = Math.ceil(totalCount / display);
    const currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure page is valid

    // Step 4: Paginate the results.
    const startIndex = (currentPage - 1) * display;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + display);

    // Return the paginated results, total count, and total pages.
    return {
      results: paginatedBooks,
      totalCount,
      totalPages,
    };

  } catch (error) {
    console.error("Error in FetchAllBooks:", error);
    // In a real application, you might throw the error or return a specific error object.
    return {
      results: [],
      totalCount: 0,
      totalPages: 0,
      error: 'An error occurred while fetching books.'
    };
  }
}