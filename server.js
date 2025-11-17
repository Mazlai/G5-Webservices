const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { default: rateLimit } = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const apiRoutes = require("./api");
const { PORT, CORS_OPTIONS, HELMET_OPTIONS } = require("./config/constants");

const app = express();

// Security Middleware - Helmet (protection contre clickjacking, XSS, etc.)
app.use(helmet(HELMET_OPTIONS));

// CORS Configuration
app.use(cors(CORS_OPTIONS));

// Body Parser Middleware
app.use(express.json());

// Additional Security Headers
app.use((req, res, next) => {
  // Prevent browsers from caching sensitive data
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Expose Swagger JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});

const limiters = {
  One_sec: rateLimit({
    limit: 1,
    windowMs: 1000,
    message: "Too many requests, please try again later!",
  }),
  Five_sec: rateLimit({
    limit: 5,
    windowMs: 5000,
    message: "Too many requests, please try again later!",
  }),
};

apiRoutes(app, limiters);

function errorHandler(err, req, res, next) {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
}
app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
