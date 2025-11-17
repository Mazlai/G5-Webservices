const dbBooks = require("../../../proxy/dbBooks");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  try {
    const updatedBook = await dbBooks.put(id, { title, author });
    res.status(200).json({
      data: updatedBook,
      links: {
        self: `/api/v1/books/${id}`,
        all: "/api/v1/books",
      },
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
