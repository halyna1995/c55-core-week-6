// This is the entrypoint for your application.
// node app.js
const chalk = require('chalk');
const {
  printAllBooks,
  printSummary,
  getUnreadBooks,
  getBooksByGenre,
  addBook,
  markAsRead,
} = require('./readingList');
const command = process.argv[2];


// TODO: Implement the main application logic here
// 1. Load books on startup
// 2. Display all books
// 3. Show summary statistics
// 4. Add example of filtering by genre or read/unread status
// 5. Add example of marking a book as read

printAllBooks();
printSummary();

// Example: filter unread
const unread = getUnreadBooks();
console.log('\nUnread Books:');
unread.forEach((book) => console.log(`${book.id}. ${book.title}`));

// Example: filter by genre
const fiction = getBooksByGenre('Fiction');
console.log('\nFiction Books:');
fiction.forEach((book) => console.log(`${book.id}. ${book.title}`));

// Example: add new book
if (command === 'add') {
  const title = process.argv[3];
  const author = process.argv[4];
  const genre = process.argv[5];
addBook({ title: 'Brave New World', author: 'Aldous Huxley', genre: 'Fiction' });
}

// Example: mark a book as read
markAsRead(2);

console.log('\nAfter updates:');
printAllBooks();
printSummary();