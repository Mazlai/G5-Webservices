/**
 * Authentication Controller
 * Handles login and user profile endpoints
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../../../mockDB/users");
const { SECRET_KEY, JWT_EXPIRY } = require("../../../config/constants");

/**
 * Login endpoint
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        code: "MISSING_CREDENTIALS",
      });
    }

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRY }
    );

    // Return token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};

/**
 * Get current user profile
 * @param {object} req - Express request (requires authentication)
 * @param {object} res - Express response
 */
exports.getMe = (req, res) => {
  try {
    const userId = req.user.id;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};

/**
 * Logout endpoint (optional - mainly for frontend use)
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
exports.logout = (req, res) => {
  res.status(200).json({
    message: "Logout successful",
  });
};
