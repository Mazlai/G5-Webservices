const dbBooks = require("../../../proxy/dbBooks");

module.exports = async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  try {
    const newBook = await dbBooks.create({ title, author });
    res.status(201).json({
      data: newBook,
      links: {
        self: `/api/v1/books/${newBook.id}`,
        all: "/api/v1/books",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
