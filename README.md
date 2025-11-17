# API - Microservices

Eric PHILIPPE
Mickaël FERNANDEZ
Tilian HURE

This project is a RESTful API built using Node.js and Express.js, designed to use the good practices of microservices architecture. It includes features such as user authentication, rate limiting, and API documentation using Swagger.

## Features

- User authentication with JWT
- Rate limiting to prevent abuse
- API documentation with Swagger
- Modular architecture for easy maintenance and scalability
- Mock database for user data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mazlai/G5-Webservices.git
   ```

2. Navigate to the project directory:

   ```bash
   cd G5-Webservices/
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the server:
   ```bash
   npm start
   ```

> [!TIP]  
> All the data changes are in memory only. Restarting the server will reset the data.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` once the server is running. It provides detailed information about the available endpoints, request/response formats, and authentication methods.
You can also access the Swagger JSON specification at `http://localhost:3000/api-docs.json`.
