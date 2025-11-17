/**
 * Mock Users Database
 * Contains user data for authentication
 */

const bcrypt = require("bcrypt");

// Hash passwords
const hashedPassword = bcrypt.hashSync("password123", 10);
const hashedAdminPassword = bcrypt.hashSync("admin123", 10);

module.exports = [
  {
    id: 1,
    username: "user",
    email: "user@example.com",
    password: hashedPassword,
    role: "user",
    firstName: "John",
    lastName: "Doe",
    creditCard: "4111 1111 1111 1111",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    password: hashedAdminPassword,
    role: "admin",
    firstName: "Jane",
    lastName: "Admin",
    creditCard: "5500 0000 0000 0004",
  },
  {
    id: 3,
    username: "moderator",
    email: "mod@example.com",
    password: hashedPassword,
    role: "moderator",
    firstName: "Bob",
    lastName: "Moderator",
    creditCard: "3400 0000 0000 009",
  },
];
