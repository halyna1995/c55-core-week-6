const fs = require('fs');
const chalk = require('chalk');

const FILE = 'books.json';

function loadBooks() {
  // TODO: Implement this function
  // Read from books.json
  // Handle missing file (create empty array)
  // Handle invalid JSON (notify user, use empty array)
  // Use try-catch for error handling
  try {
    const text = fs.readFileSync(FILE, 'utf8');
    const books = JSON.parse(text);
    if (!Array.isArray(books)) {
      console.log(chalk.yellow('⚠ books.json is not an array. Using empty list.'));
      return [];
    }
    return books;
  } catch (error) {
    if (error.code === 'ENOENT') {
      // missing file -> create empty array
      fs.writeFileSync(FILE, '[]\n', 'utf8');
      return [];
    }
    if (error.name === 'SyntaxError') {
      console.log(chalk.yellow('⚠ Invalid JSON in books.json. Using empty list.'));
      return [];
    }
    throw error;
  }
}

function saveBooks(books) {
  // TODO: Implement this function
  // Write books array to books.json
  // Use try-catch for error handling
  try {
    fs.writeFileSync(FILE, JSON.stringify(books, null, 2) + '\n', 'utf8');
  } catch (error) {
    console.log(chalk.red('❌ Could not save books.json'));
    throw error;
  }
}

function addBook(book) {
  // TODO: Implement this function
  const books = loadBooks();
  // find max id
  let maxId = 0;
  books.forEach((book) => {
    if (typeof book.id === 'number' && book.id > maxId) maxId = book.id;
  });
  const newBook = {
    id: maxId + 1,
    title: book.title,
    author: book.author,
    genre: book.genre,
    read: false,
  };
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

function getUnreadBooks() {
  // TODO: Implement this function using filter()
  const books = loadBooks();
  return books.filter((book) => book.read === false); 
}

function getBooksByGenre(genre) {
  // TODO: Implement this function using filter()
  const books = loadBooks();
  const genreLowCase = String(genre).toLowerCase();
  return books.filter((book) => String(book.genre).toLowerCase() === genreLowCase);
}

function markAsRead(id) {
  // TODO: Implement this function using map()
  const books = loadBooks();
  const targetId = Number(id);
  let found = false;
  const updated = books.map((book) => {
    if (Number(book.id) === targetId) {
      found = true;
      return { ...book, read: true };
    }
    return book;
  }); 
  if (found) saveBooks(updated);
  return found;
}

function getTotalBooks() {
  // TODO: Implement this function using length
  return loadBooks().length;
}

function hasUnreadBooks() {
  // TODO: Implement this function using some()
  return loadBooks().some((book) => book.read === false);
}

function printAllBooks() {
  // TODO: Implement this function
  // Loop through and display with chalk
  // Use green for read books, yellow for unread
  // Use cyan for titles
  const books = loadBooks();
  console.log('\nAll Books:');
  books.forEach((book) => {
    const color = book.read ? chalk.green : chalk.yellow;
    const status = book.read ? '✓ Read' : '⚠ Unread';
    console.log(
      color(`${book.id}. `) +
        chalk.cyan(book.title) +
        color(` by ${book.author} (${book.genre}) ${status}`)
    );
  });
}

function printSummary() {
  // TODO: Implement this function
  // Show statistics with chalk
  // Display total books, read count, unread count
  // Use bold for stats
   const books = loadBooks();
  const total = books.length;
  const readCount = books.filter((book) => book.read === true).length;
  const unreadCount = total - readCount;
  console.log(chalk.bold('\n📊 SUMMARY 📊'));
  console.log(chalk.bold(`Total Books: ${total}`));
  console.log(chalk.bold(`Read: ${readCount}`));
  console.log(chalk.bold(`Unread: ${unreadCount}`));
}
module.exports = {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};












function printAllBooks() {
  const books = loadBooks();

  console.log('\nAll Books:');
  books.forEach((b) => {
    const color = b.read ? chalk.green : chalk.yellow;
    const status = b.read ? '✓ Read' : '⚠ Unread';

    console.log(
      color(`${b.id}. `) +
        chalk.cyan(b.title) +
        color(` by ${b.author} (${b.genre}) ${status}`)
    );
  });
}

function printSummary() {
  const books = loadBooks();
  const total = books.length;
  const readCount = books.filter((b) => b.read === true).length;
  const unreadCount = total - readCount;

  console.log(chalk.bold('\n📊 SUMMARY 📊'));
  console.log(chalk.bold(`Total Books: ${total}`));
  console.log(chalk.bold(`Read: ${readCount}`));
  console.log(chalk.bold(`Unread: ${unreadCount}`));
}

module.exports = {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};
