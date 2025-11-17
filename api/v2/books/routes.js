const getBooks = require("./getBooks");
const getBook = require("./getBook");
const postBook = require("./postBook");
const putBook = require("./putBook");
const deleteBooks = require("./deleteBooks");
const requireAdminAccess = require("../../../middlewares/requireAdminAccess");
const { link } = require("../../../utils/routeHelper");

module.exports = function (app, limiters) {
  // API v2 endpoints
  /**
   * @swagger
   * /api/v2/books:
   *   get:
   *     summary: Get all books
   *     description: Retrieve a paginated list of all books (v2 - enhanced)
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of items per page
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *           default: 0
   *         description: Number of items to skip
   *     tags:
   *       - Books (v2)
   *     responses:
   *       200:
   *         description: List of books with pagination
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BooksListResponse'
   */
  app.get(link("books.v2.list"), limiters.One_sec, getBooks);

  /**
   * @swagger
   * /api/v2/books/{id}:
   *   get:
   *     summary: Get a book by ID
   *     description: Retrieve a single book by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     tags:
   *       - Books (v2)
   *     responses:
   *       200:
   *         description: Book found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponse'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get(link("books.v2.read", { id: ":id" }), limiters.Five_sec, getBook);

  /**
   * @swagger
   * /api/v2/books:
   *   post:
   *     summary: Create a new book
   *     description: Create a new book (admin access required)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Books (v2)
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - author
   *             properties:
   *               title:
   *                 type: string
   *                 example: "New Book"
   *               author:
   *                 type: string
   *                 example: "Author Name"
   *     responses:
   *       201:
   *         description: Book created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponse'
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post(
    link("books.v2.create"),
    requireAdminAccess,
    postBook
  );

  /**
   * @swagger
   * /api/v2/books/{id}:
   *   put:
   *     summary: Update a book
   *     description: Update an existing book (admin access required)
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     tags:
   *       - Books (v2)
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - author
   *             properties:
   *               title:
   *                 type: string
   *                 example: "Updated Book Title"
   *               author:
   *                 type: string
   *                 example: "Updated Author"
   *     responses:
   *       200:
   *         description: Book updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponse'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.put(
    link("books.v2.update", { id: ":id" }),
    limiters.One_sec,
    requireAdminAccess,
    putBook
  );

  /**
   * @swagger
   * /api/v2/books/{id}:
   *   delete:
   *     summary: Delete a book
   *     description: Delete an existing book (admin access required)
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     tags:
   *       - Books (v2)
   *     responses:
   *       200:
   *         description: Book deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 deleted:
   *                   $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.delete(
    link("books.v2.delete", { id: ":id" }),
    limiters.One_sec,
    deleteBooks
  );
};
