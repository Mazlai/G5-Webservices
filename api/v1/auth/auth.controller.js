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
        password: password,
        creditCard: user.creditCard,
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

/**
 * Register a new user
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
exports.register = (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
        code: "MISSING_CREDENTIALS",
      });
    }

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
        code: "USER_EXISTS",
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      username,
      email,
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
      role: "user",
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRY }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};

/**
 * Change user password
 * @param {object} req - Express request (requires authentication)
 * @param {object} res - Express response
 */
exports.changePassword = (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
        code: "MISSING_CREDENTIALS",
      });
    }

    // Find user
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    // Verify current password
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
        code: "INVALID_PASSWORD",
      });
    }

    // Validate new password is different
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
        code: "SAME_PASSWORD",
      });
    }

    // Hash new password and update
    user.password = bcrypt.hashSync(newPassword, 10);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};
