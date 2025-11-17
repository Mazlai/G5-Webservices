const dbBooks = require("../../../proxy/dbBooks");

module.exports = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await dbBooks.getById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      data: book,
      links: {
        self: `/api/v1/books/${id}`,
        all: "/api/v1/books",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
