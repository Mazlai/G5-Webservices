/**
 * Authentication Routes
 * Handles login, logout, and user profile endpoints
 */

const authController = require("./auth.controller");
const requireAuth = require("../../../middlewares/requireAdminAccess");

module.exports = function (app, limiters) {
  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: User login
   *     description: Authenticate user with username and password, return JWT token
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 example: "user"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Login successful, returns JWT token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Missing credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post("/api/v1/auth/login", limiters.One_sec, authController.login);

  /**
   * @swagger
   * /api/v1/auth/me:
   *   get:
   *     summary: Get current user profile
   *     description: Retrieve the profile of the currently authenticated user
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized - Missing or invalid token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get(
    "/api/v1/auth/me",
    limiters.Five_sec,
    requireAuth,
    authController.getMe
  );

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: User logout
   *     description: Logout the current user (optional endpoint, mainly for frontend use)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: Logout successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  app.post("/api/v1/auth/logout", limiters.One_sec, authController.logout);
};
