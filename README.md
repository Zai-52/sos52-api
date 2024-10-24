# Sos52-API - Social Media Project Backend

This is the **backend API** for the **sos52** social media platform. Built using **Node.js** and **Express**, this API provides the necessary endpoints for user authentication, post management, and real-time interactions. It serves as the data management layer for the frontend application, enabling users to create accounts, post content, and engage with other users through likes and comments.

## Features

- **User Authentication:** Secure user login and registration with JWT tokens.
- **Post Management:** Create, read, and delete posts.
- **User Profiles:** Manage user profile information.
- **WebSocket Support:** Real-time notifications and updates using WebSocket.
- **Data Seeding:** Populate the database with sample data using Prisma and Faker.

## Tech Stack

- **Node.js** (JavaScript runtime)
- **Express** (Web framework)
- **Prisma** (ORM for database management)
- **JWT (JSON Web Tokens)** (Authentication)
- **Bcrypt** (Password hashing)
- **WebSockets** (Real-time communication)
- **Faker.js** (Generate fake data for testing)
- **Nodemon** (Automatic server restarts during development)

## Installation and Setup

To get started with the backend API project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install` or `npm i`.
3. Run the app using `npx nodemon index.js`.
