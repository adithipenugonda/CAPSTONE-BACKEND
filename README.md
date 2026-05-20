# Blog Application Backend Documentation

## Overview

The backend of the Blog Application is developed using Node.js, Express.js, and MongoDB to handle server-side operations, authentication, authorization, and database management efficiently. It provides secure RESTful APIs that enable users, authors, and admins to interact with the platform. The backend manages user authentication using JWT tokens, handles blog-related CRUD operations, processes requests through middleware, and ensures secure communication between the frontend and database. The application is designed with a modular architecture to improve scalability, maintainability, and performance.

---

# Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* CORS
* dotenv

---

# Features

* RESTful API Development
* User Authentication and Authorization
* JWT-based Secure Login System
* Role-Based Access Control
* CRUD Operations for Articles
* Middleware-Based Request Processing
* Secure Cookie Handling
* MongoDB Database Integration
* Error Handling Middleware
* CORS Configuration for Frontend Integration

---

# Backend Project Structure

```txt id="vzm8d8"
backend
│
├── APIs
│   ├── UserAPI.js
│   ├── AuthorAPI.js
│   ├── AdminAPI.js
│   └── CommonAPI.js
│
├── Middlewares
│   ├── verifyToken.js
│   └── checkAuthor.js
│
├── Models
│   ├── UserModel.js
│   └── ArticleModel.js
│
├── Services
│   └── authService.js
│
├── .env
├── package.json
├── package-lock.json
├── server.js
├── req.http
└── README.md
```

---

# Installation and Setup

## Clone Repository

```bash id="7r1n8w"
git clone https://github.com/your-username/your-repository-name.git
```

## Navigate to Backend Folder

```bash id="msi3u2"
cd backend
```

## Install Dependencies

```bash id="txr8p2"
npm install
```

---

# Configure Environment Variables

Create a `.env` file inside the backend directory:

```env id="e8j6kt"
PORT=5000
DB_URL=your_mongodb_connection_url
JWT_SECRET=your_secret_key
```

Example:

```env id="t3jjy1"
PORT=5000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/blogapp
JWT_SECRET=mysecretkey
```

---

# Running the Backend Server

Start the server:

```bash id="jlwmq7"
npm start
```

Server runs on:

```txt id="jlwmw4"
http://localhost:5000
```

---

# API Modules

## UserAPI

Handles user-related operations such as registration, login, profile management, and article interactions.

### Base Route

```txt id="9jlwmc"
/user-api
```

---

## AuthorAPI

Handles author-specific functionalities such as creating, editing, deleting, and managing blog articles.

### Base Route

```txt id="0jlwm6"
/author-api
```

---

## AdminAPI

Handles admin functionalities including monitoring users, authors, and platform management.

### Base Route

```txt id="5jlwm2"
/admin-api
```

---

## CommonAPI

Contains common authentication and shared routes used across the application.

### Base Route

```txt id="3jlwmk"
/common-api
```

---

# Middleware

## verifyToken.js

Used to verify JWT tokens and protect private routes from unauthorized access.

## checkAuthor.js

Ensures that only authorized authors can access specific article management routes.

---

# Models

## UserModel.js

Defines the schema and structure for user data stored in MongoDB.

## ArticleModel.js

Defines the schema and structure for blog articles stored in MongoDB.

---

# Services

## authService.js

Contains reusable authentication-related logic such as token generation and validation.

---

# Database Integration

The backend uses MongoDB Atlas for cloud database storage and Mongoose for schema modeling and database interaction.

---

# CORS Configuration

CORS is configured to allow secure communication between frontend and backend applications.

Example:

```js id="9jlwmf"
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend.vercel.app"
    ],
    credentials: true
}))
```

---

# Error Handling

The backend uses centralized error-handling middleware to catch and process server-side errors efficiently.

Example:

```js id="0jlwm1"
app.use((err, req, res, next) => {
    res.json({
        message: "error occurred",
        reason: err.message
    })
})
```

---

# Deployment

The backend is deployed using Render.

## Deployment Steps

1. Push backend code to GitHub
2. Create a Web Service in Render
3. Set Root Directory as:

```txt id="6jlwmn"
backend
```

4. Add environment variables in Render
5. Deploy the backend service

---

# Future Enhancements

* Image Upload Functionality
* Rich Text Editor Support
* Real-time Notifications
* Comment System
* Blog Categories and Tags
* Search and Filter Functionality
* Analytics Dashboard
* Rate Limiting and Security Enhancements

---

# Conclusion

The backend of the Blog Application is designed to provide secure, scalable, and efficient server-side functionality for managing users, authentication, and blog content. Its modular architecture and RESTful API structure ensure maintainability, smooth frontend integration, and support for future feature enhancements.
