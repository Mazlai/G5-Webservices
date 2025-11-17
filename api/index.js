/**
 * API Routes Index
 * Manages all API versions (v1, v2, etc.)
 */

const v1Auth = require("./v1/auth/routes");
const v1Books = require("./v1/books/routes");
const v2Books = require("./v2/books/routes");

// Ensure routes are registered via the route config generator
const routeGenerator = require("../utils/routeConfig");

module.exports = function (app, limiters) {
  v1Auth(app, limiters);
  v1Books(app, limiters);
  v2Books(app, limiters);

  // API index endpoint - returns routes
  // By default, return only the most recent route for each method+path (dedup by path)
  // Query param `all=true` will return all registered routes
  app.get("/api", (req, res) => {
    try {
      const all = routeGenerator.exportAll();
      const routes = Object.values(all);

      if (String(req.query.all) === "true") {
        return res.json(routes);
      }

      // dedupe by method + path (path is the route.path without version)
      const byKey = new Map();

      routes.forEach((route) => {
        const key = `${route.method} ${route.path}`; // e.g. "GET /books/:id"
        const ver =
          parseInt((route.version || "v0").replace(/^v/, ""), 10) || 0;
        const existing = byKey.get(key);
        if (!existing || ver > existing.ver) {
          byKey.set(key, { ver, route });
        }
      });

      const current = Array.from(byKey.values()).map((v) => v.route);
      return res.json(current);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to collect routes", error: err.message });
    }
  });

  // Deprecated routes listing
  app.get("/api/deprecated", (req, res) => {
    try {
      const all = routeGenerator.exportAll();
      const routes = Object.values(all);
      const deprecated = routes.filter((r) => r.deprecated === true);
      return res.json(deprecated);
    } catch (err) {
      return res
        .status(500)
        .json({
          message: "Failed to collect deprecated routes",
          error: err.message,
        });
    }
  });
};
