/**
 * Application Constants
 * Centralized configuration values
 */

require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "votre-secret-key-super-securisee",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_EXPIRY: "24h",
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,
  DEFAULT_OFFSET: 0,

  // CORS Configuration
  CORS_OPTIONS: {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400, // 24 hours
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },

  // Helmet Configuration for security headers
  HELMET_OPTIONS: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    frameguard: {
      action: "deny", // Protection contre le clickjacking
    },
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
  },
};
