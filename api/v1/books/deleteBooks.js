const dbBooks = require("../../../proxy/dbBooks");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedBook = await dbBooks.deleteById(id);
    return res.status(200).json({
      message: "Book deleted successfully",
      deleted: deletedBook[0],
      links: {
        all: "/api/v1/books",
      },
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
