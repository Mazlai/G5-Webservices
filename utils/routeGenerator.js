/**
 * Route and Link Generator
 * Generates route definitions and URL builders for API endpoints
 */

class RouteGenerator {
  constructor() {
    this.routes = {};
  }

  /**
   * Register a route configuration
   * @param {string} name - Unique route name (e.g., 'books.list')
   * @param {string} version - API version (e.g., 'v1', 'v2')
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {string} path - Route path (e.g., '/books', '/books/:id')
   * @param {object} options - Additional options (requiresAuth, requiresAdmin, etc.)
   */
  register(name, version, method, path, options = {}) {
    const fullPath = `/api/${version}${path}`;
    this.routes[name] = {
      name,
      version,
      method: method.toUpperCase(),
      path,
      fullPath,
      ...options,
    };
    return this;
  }

  /**
   * Get a route by name
   * @param {string} name - Route name
   * @returns {object} Route configuration
   */
  get(name) {
    const route = this.routes[name];
    if (!route) {
      throw new Error(
        `Route "${name}" not found. Available routes: ${Object.keys(
          this.routes
        ).join(", ")}`
      );
    }
    return route;
  }

  /**
   * Build a URL for a route with parameters
   * @param {string} name - Route name
   * @param {object} params - URL parameters to replace
   * @returns {string} Complete URL
   */
  link(name, params = {}) {
    const route = this.get(name);
    let url = route.fullPath;

    // Replace path parameters
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });

    return url;
  }

  /**
   * Get all routes for a specific version
   * @param {string} version - API version
   * @returns {object} Routes for that version
   */
  getByVersion(version) {
    return Object.fromEntries(
      Object.entries(this.routes).filter(
        ([_, route]) => route.version === version
      )
    );
  }

  /**
   * Get all routes for a specific HTTP method
   * @param {string} method - HTTP method
   * @returns {object} Routes with that method
   */
  getByMethod(method) {
    const upperMethod = method.toUpperCase();
    return Object.fromEntries(
      Object.entries(this.routes).filter(
        ([_, route]) => route.method === upperMethod
      )
    );
  }

  /**
   * Get route configuration as middleware-ready format
   * @param {string} name - Route name
   * @returns {object} { method, path, fullPath }
   */
  getMiddlewareConfig(name) {
    const route = this.get(name);
    return {
      method: route.method,
      path: route.fullPath,
      middlewares: route.middlewares || [],
    };
  }

  /**
   * Export all routes as object
   * @returns {object} All registered routes
   */
  exportAll() {
    return { ...this.routes };
  }

  /**
   * Export routes as a formatted list (useful for documentation)
   * @returns {string} Formatted route list
   */
  exportList() {
    const sorted = Object.entries(this.routes).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    return sorted
      .map(
        ([name, route]) =>
          `${route.method.padEnd(6)} ${route.fullPath.padEnd(30)} [${name}]${
            route.requiresAdmin ? " (requires admin)" : ""
          }${route.requiresAuth ? " (requires auth)" : ""}`
      )
      .join("\n");
  }

  /**
   * Validate all routes are registered for a resource
   * @param {string} version - API version
   * @param {string} resource - Resource name (e.g., 'books')
   * @returns {object} Missing CRUD operations
   */
  validateResourceRoutes(version, resource) {
    const required = [
      `${resource}.list`,
      `${resource}.create`,
      `${resource}.read`,
      `${resource}.update`,
      `${resource}.delete`,
    ];
    const missing = required.filter(
      (name) => !this.routes[name] || this.routes[name].version !== version
    );
    return {
      version,
      resource,
      complete: missing.length === 0,
      missing,
    };
  }
}

// Create singleton instance
const generator = new RouteGenerator();

module.exports = generator;
