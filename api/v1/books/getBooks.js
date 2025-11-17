const dbBooks = require("../../../proxy/dbBooks");
const {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  MAX_LIMIT,
} = require("../../../config/constants");

module.exports = async (req, res) => {
  try {
    const limit = Math.min(
      parseInt(req.query.limit) || DEFAULT_LIMIT,
      MAX_LIMIT
    );
    const offset = parseInt(req.query.offset) || DEFAULT_OFFSET;

    const allBooks = await dbBooks.getAll();
    const total = allBooks.length;

    const books = allBooks.slice(offset, offset + limit);

    const links = {
      self: `/api/v1/books?limit=${limit}&offset=${offset}`,
    };

    if (offset + limit < total) {
      links.next = `/api/v1/books?limit=${limit}&offset=${offset + limit}`;
    }

    if (offset > 0) {
      links.prev = `/api/v1/books?limit=${limit}&offset=${Math.max(
        0,
        offset - limit
      )}`;
    }

    res.status(200).json({
      data: books,
      pagination: {
        limit,
        offset,
        total,
      },
      links,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
