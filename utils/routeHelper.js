/**
 * Route Helper Utilities
 * Convenience functions for working with routes
 */

require("./routeConfig");
const routeGenerator = require("./routeGenerator");

module.exports = {
  register: (...args) => routeGenerator.register(...args),
  get: (...args) => routeGenerator.get(...args),
  link: (...args) => routeGenerator.link(...args),
  getByVersion: (...args) => routeGenerator.getByVersion(...args),
  getByMethod: (...args) => routeGenerator.getByMethod(...args),
  exportAll: (...args) => routeGenerator.exportAll(...args),
  exportList: (...args) => routeGenerator.exportList(...args),
};
