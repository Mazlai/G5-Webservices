const books = require("../mockDB/books");

module.exports = {
  getAll: async () => {
    return books;
  },
  getById: async (id) => {
    return books.find((b) => b.id === id);
  },
  deleteById: async (id) => {
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      throw new Error("Book not found");
    }

    return books.splice(bookIndex, 1);
  },
  create: async (book) => {
    const newId =
      books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    const newBook = { id: newId, ...book };
    books.push(newBook);
    return newBook;
  },
  put: async (id, updatedBook) => {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new Error("Book not found");
    }
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    return books[bookIndex];
  },
};
