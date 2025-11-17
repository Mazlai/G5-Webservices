/**
 * Route Configuration
 * Define all API routes using the route generator
 */

const routeGenerator = require("./routeGenerator");

// ==================== AUTHENTICATION ROUTES (V1) ====================

// Authentication
routeGenerator.register("auth.login", "v1", "POST", "/auth/login", {
  description: "User login - returns JWT token",
  limit: "1_sec",
  requiresAuth: false,
  deprecated: true,
});

routeGenerator.register("auth.me", "v1", "GET", "/auth/me", {
  description: "Get current user profile",
  limit: "5_sec",
  requiresAuth: true,
  deprecated: true,
});

routeGenerator.register("auth.logout", "v1", "POST", "/auth/logout", {
  description: "User logout",
  limit: "1_sec",
  deprecated: true,
});

// ==================== V1 ROUTES ====================

// Books Resource - v1
routeGenerator.register("books.list", "v1", "GET", "/books", {
  description: "Get all books",
  limit: "1_sec",
  deprecated: true,
});

routeGenerator.register("books.read", "v1", "GET", "/books/:id", {
  description: "Get a book by ID",
  limit: "5_sec",
  deprecated: true,
});

routeGenerator.register("books.create", "v1", "POST", "/books", {
  description: "Create a new book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
  deprecated: true,
});

routeGenerator.register("books.update", "v1", "PUT", "/books/:id", {
  description: "Update a book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
  deprecated: true,
});

routeGenerator.register("books.delete", "v1", "DELETE", "/books/:id", {
  description: "Delete a book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
  deprecated: true,
});

// ==================== V2 ROUTES ====================

// Books Resource - v2
routeGenerator.register("books.v2.list", "v2", "GET", "/books", {
  description: "Get all books (v2 - enhanced)",
  limit: "1_sec",
});

routeGenerator.register("books.v2.read", "v2", "GET", "/books/:id", {
  description: "Get a book by ID",
  limit: "5_sec",
});

routeGenerator.register("books.v2.create", "v2", "POST", "/books", {
  description: "Create a new book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
});

routeGenerator.register("books.v2.update", "v2", "PUT", "/books/:id", {
  description: "Update a book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
});

routeGenerator.register("books.v2.delete", "v2", "DELETE", "/books/:id", {
  description: "Delete a book",
  limit: "1_sec",
  requiresAuth: true,
  requiresAdmin: true,
});

module.exports = routeGenerator;
