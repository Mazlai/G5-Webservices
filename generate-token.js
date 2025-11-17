const jwt = require("jsonwebtoken");
const { SECRET_KEY, JWT_EXPIRY } = require("./config/constants");

const token = jwt.sign(
  {
    user: "admin",
    role: "admin",
  },
  SECRET_KEY,
  { expiresIn: JWT_EXPIRY }
);

console.log("Generated JWT token:");
console.log(token);
