const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
      description:
        "A simple REST API for managing books with best practices including versioning, pagination, and HATEOAS",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token for authentication",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error message",
            },
            code: {
              type: "string",
              example: "ERROR_CODE",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The unique identifier of the user",
              example: 1,
            },
            username: {
              type: "string",
              description: "The username",
              example: "user",
            },
            email: {
              type: "string",
              description: "The user email",
              example: "user@example.com",
            },
            firstName: {
              type: "string",
              description: "The user first name",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "The user last name",
              example: "Doe",
            },
            role: {
              type: "string",
              description: "The user role",
              example: "admin",
            },
          },
        },
        Book: {
          type: "object",
          required: ["title", "author"],
          properties: {
            id: {
              type: "integer",
              description: "The unique identifier of the book",
              example: 1,
            },
            title: {
              type: "string",
              description: "The title of the book",
              example: "Le Seigneur des Anneaux",
            },
            author: {
              type: "string",
              description: "The author of the book",
              example: "J.R.R. Tolkien",
            },
          },
        },
        BookResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/Book",
            },
            links: {
              type: "object",
              properties: {
                self: {
                  type: "string",
                  example: "/api/v1/books/1",
                },
                all: {
                  type: "string",
                  example: "/api/v1/books",
                },
              },
            },
          },
        },
        BooksListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Book",
              },
            },
            pagination: {
              type: "object",
              properties: {
                limit: {
                  type: "integer",
                  example: 10,
                },
                offset: {
                  type: "integer",
                  example: 0,
                },
                total: {
                  type: "integer",
                  example: 25,
                },
              },
            },
            links: {
              type: "object",
              properties: {
                self: {
                  type: "string",
                  example: "/api/v1/books?limit=10&offset=0",
                },
                next: {
                  type: "string",
                  example: "/api/v1/books?limit=10&offset=10",
                },
                prev: {
                  type: "string",
                  example: "/api/v1/books?limit=10&offset=0",
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./api/v1/auth/*.js", "./api/v1/books/*.js", "./api/v2/books/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
